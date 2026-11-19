/**
 * Pure TypeScript In-Browser ZIP Archive Builder (Standard PKZip format)
 * Generates valid standard .zip files without heavy external dependencies.
 */

// CRC32 Table for standard ZIP validation
const makeCRCTable = (): Uint32Array => {
  let c: number
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c
  }
  return table
}

const crcTable = makeCRCTable()

function crc32(str: string): number {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let crc = 0 ^ -1
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff]
  }
  return (crc ^ -1) >>> 0
}

export interface ZipFileEntry {
  name: string
  content: string
}

export function createZipBlob(files: ZipFileEntry[]): Blob {
  const encoder = new TextEncoder()
  const fileRecords: {
    header: Uint8Array
    data: Uint8Array
    centralHeader: Uint8Array
  }[] = []

  let offset = 0

  for (const file of files) {
    const data = encoder.encode(file.content)
    const nameBytes = encoder.encode(file.name)
    const fileCRC = crc32(file.content)
    const size = data.length

    // Local file header (30 bytes + name length)
    const header = new Uint8Array(30 + nameBytes.length)
    const hv = new DataView(header.buffer)
    hv.setUint32(0, 0x04034b50, true) // Signature
    hv.setUint16(4, 20, true) // Version needed
    hv.setUint16(6, 0, true) // General purpose bit
    hv.setUint16(8, 0, true) // Compression: Store (0)
    hv.setUint16(10, 0, true) // Mod time
    hv.setUint16(12, 0, true) // Mod date
    hv.setUint32(14, fileCRC, true) // CRC32
    hv.setUint32(18, size, true) // Compressed size
    hv.setUint32(22, size, true) // Uncompressed size
    hv.setUint16(26, nameBytes.length, true) // File name length
    hv.setUint16(28, 0, true) // Extra field length
    header.set(nameBytes, 30)

    // Central directory header (46 bytes + name length)
    const centralHeader = new Uint8Array(46 + nameBytes.length)
    const cv = new DataView(centralHeader.buffer)
    cv.setUint32(0, 0x02014b50, true) // Signature
    cv.setUint16(4, 20, true) // Version made by
    cv.setUint16(6, 20, true) // Version needed
    cv.setUint16(8, 0, true) // General purpose bit
    cv.setUint16(10, 0, true) // Compression
    cv.setUint16(12, 0, true) // Mod time
    cv.setUint16(14, 0, true) // Mod date
    cv.setUint32(16, fileCRC, true) // CRC32
    cv.setUint32(20, size, true) // Compressed size
    cv.setUint32(24, size, true) // Uncompressed size
    cv.setUint16(28, nameBytes.length, true) // File name length
    cv.setUint16(30, 0, true) // Extra field length
    cv.setUint16(32, 0, true) // File comment length
    cv.setUint16(34, 0, true) // Disk number start
    cv.setUint16(36, 0, true) // Internal file attributes
    cv.setUint32(38, 0, true) // External file attributes
    cv.setUint32(42, offset, true) // Relative offset of local header
    centralHeader.set(nameBytes, 46)

    offset += header.length + data.length
    fileRecords.push({ header, data, centralHeader })
  }

  // Calculate central directory size
  let centralDirSize = 0
  for (const r of fileRecords) {
    centralDirSize += r.centralHeader.length
  }

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22)
  const ev = new DataView(eocd.buffer)
  ev.setUint32(0, 0x06054b50, true) // Signature
  ev.setUint16(4, 0, true) // Disk number
  ev.setUint16(6, 0, true) // Disk with central directory
  ev.setUint16(8, files.length, true) // Total entries on this disk
  ev.setUint16(10, files.length, true) // Total entries
  ev.setUint32(12, centralDirSize, true) // Size of central directory
  ev.setUint32(16, offset, true) // Offset of start of central directory
  ev.setUint16(20, 0, true) // Comment length

  // Combine into single Blob
  const blobParts: any[] = []
  for (const r of fileRecords) {
    blobParts.push(r.header)
    blobParts.push(r.data)
  }
  for (const r of fileRecords) {
    blobParts.push(r.centralHeader)
  }
  blobParts.push(eocd)

  return new Blob(blobParts, { type: "application/zip" })
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
