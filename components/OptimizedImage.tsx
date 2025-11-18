import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  unoptimized?: boolean;
}

/**
 * OptimizedImage component that uses WebP/AVIF with PNG fallback
 * Uses the picture element for progressive enhancement
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  unoptimized = true,
}) => {
  // Only optimize PNG images
  const isPng = src.endsWith('.png');
  const avifSrc = isPng ? src.replace('.png', '.avif') : null;
  const webpSrc = isPng ? src.replace('.png', '.webp') : null;

  if (!isPng) {
    // For non-PNG images (like GIF), use regular Image component
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        unoptimized={unoptimized}
      />
    );
  }

  // Use picture element for PNG images with WebP/AVIF fallbacks
  return (
    <picture style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* AVIF source - best compression, modern browsers */}
      {avifSrc && (
        <source
          srcSet={avifSrc}
          type="image/avif"
        />
      )}
      {/* WebP source - good compression, wide support */}
      {webpSrc && (
        <source
          srcSet={webpSrc}
          type="image/webp"
        />
      )}
      {/* Fallback to PNG */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        unoptimized={unoptimized}
      />
    </picture>
  );
};

export default OptimizedImage;

