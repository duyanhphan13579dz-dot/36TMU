import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

export function ShimmerImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
  showSkeleton = true,
  loading = "lazy",
  ...props
}: ShimmerImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentSrc = hasError ? fallbackSrc : src;

  return (
    <div className={cn("relative overflow-hidden bg-cobalt-950/10", containerClassName)}>
      {/* Shimmer skeleton layer */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-cobalt-100 via-white to-cobalt-100 opacity-80" />
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt || ""}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
          setIsLoaded(true);
        }}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export default ShimmerImage;
