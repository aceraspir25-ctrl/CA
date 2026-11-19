import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  showLabel?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, showLabel = false, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    return (
      <div className={cn("relative w-full", className)} ref={ref} {...props}>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
          <div
            className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500 ease-in-out"
            style={{ width: `${clampedValue}%` }}
          />
        </div>
        {showLabel && (
          <span className="mt-1 block text-right text-xs text-[hsl(var(--muted-foreground))]">
            {clampedValue}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
