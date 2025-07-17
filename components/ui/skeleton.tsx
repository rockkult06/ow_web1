import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Hero skeleton
export function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Logo skeleton */}
        <div className="flex justify-center">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-4 text-center">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-12 w-32 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        {/* CTA button skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-12 w-48 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// Menu skeleton
export function MenuSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-20" />
      ))}
    </div>
  )
}

// Product card skeleton
export function ProductCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  )
}

// Dropdown skeleton
export function DropdownSkeleton() {
  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modal skeleton
export function ModalSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 w-full max-w-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton }
