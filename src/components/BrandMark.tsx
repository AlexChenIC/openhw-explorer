import Image from "next/image";

type BrandSize = "sm" | "md" | "lg";

const lockupSizeClass: Record<BrandSize, string> = {
  sm: "h-10 w-[130px]",
  md: "h-12 w-[156px]",
  lg: "h-[68px] w-[228px]",
};

const markSizeClass: Record<BrandSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

type BrandAssetProps = {
  size?: BrandSize;
  className?: string;
};

export function BrandMark({ size = "md", className = "" }: BrandAssetProps) {
  return (
    <Image
      src="/brand/openhw-explorer-mark.svg"
      alt=""
      aria-hidden="true"
      width={96}
      height={96}
      unoptimized
      className={`${markSizeClass[size]} block flex-none ${className}`}
    />
  );
}

export function BrandLockup({ size = "md", className = "" }: BrandAssetProps) {
  const imageClass = `${lockupSizeClass[size]} flex-none object-contain ${className}`;

  return (
    <span className="inline-flex items-center">
      <span className="sr-only">OpenHW Explorer</span>
      <Image
        src="/brand/openhw-explorer-wordmark.svg"
        alt=""
        aria-hidden="true"
        width={470}
        height={150}
        priority
        unoptimized
        className={`brand-lockup-light block ${imageClass}`}
      />
      <Image
        src="/brand/openhw-explorer-wordmark-dark.svg"
        alt=""
        aria-hidden="true"
        width={470}
        height={150}
        priority
        unoptimized
        className={`brand-lockup-dark hidden ${imageClass}`}
      />
    </span>
  );
}
