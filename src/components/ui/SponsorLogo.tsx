'use client';

import React, { useState } from 'react';
import { pickSponsorLogo } from '../../utils';

interface SponsorLogoProps {
  sponsor: {
    name: string;
    slug: string;
    logo_url?: string;
  };
  width?: number;
  height?: number;
  className?: string;
  textClassName?: string;
  showFallbackText?: boolean;
}

export const SponsorLogo: React.FC<SponsorLogoProps> = ({
  sponsor,
  width = 200,
  height = 100,
  className = "max-w-full object-contain",
  textClassName = "text-sm md:text-base font-medium text-gray-900 leading-relaxed px-2",
  showFallbackText = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 画像URLがない場合、または読み込みエラーの場合はテキスト表示
  const shouldShowText = !sponsor.logo_url || imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  if (shouldShowText && showFallbackText) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className={textClassName}>
          {sponsor.name}
        </div>
      </div>
    );
  }

  return (
    <>
      <img
        src={pickSponsorLogo(sponsor, width, height)}
        alt={`${sponsor.name} ロゴ`}
        className={className}
        loading="lazy"
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{
          display: imageError ? 'none' : 'block'
        }}
      />
      {imageError && showFallbackText && (
        <div className="w-full h-full flex items-center justify-center">
          <div className={textClassName}>
            {sponsor.name}
          </div>
        </div>
      )}
    </>
  );
};