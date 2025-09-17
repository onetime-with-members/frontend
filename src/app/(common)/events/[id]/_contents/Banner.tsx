'use client';

import BannerImageAndBlur from './BannerImageAndBlur';
import { Banner as BannerType } from '@/lib/types';

export default function Banner({ banner }: { banner: BannerType }) {
  return (
    <div
      data-banner
      key={banner.id}
      className="relative z-20 flex h-[88px] w-[360px] flex-shrink-0 justify-between overflow-hidden rounded-xl border border-gray-10 bg-gray-05 md:w-[328px]"
      onClick={() => {
        window.open(banner.link_url, '_blank');
      }}
    >
      <div className="flex flex-col justify-between py-3 pl-3">
        <span className="text-sm font-bold text-gray-60">{banner.title}</span>
        <p className="text-xs text-gray-40">{banner.organization}</p>
        <span
          className="text-xs font-bold"
          style={{ color: banner.color_code }}
        >
          {banner.sub_title}
        </span>
      </div>

      {banner.image_url && (
        <BannerImageAndBlur
          imageUrl={banner.image_url}
          alt={`${banner.organization} image`}
        />
      )}
    </div>
  );
}
