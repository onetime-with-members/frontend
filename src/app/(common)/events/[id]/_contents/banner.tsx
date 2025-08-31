'use client';

import { Banner as BannerType } from '@/lib/types';
import Image from 'next/image';

export default function Banner({
  banner,
  ishidden = false,
  currentIndex,
  totalCount,
}: {
  banner: BannerType;
  ishidden?: boolean;
  currentIndex: number;
  totalCount: number;
}) {
  return (
    <div
      data-banner
      key={banner.id}
      className={`border-gray-5 relative z-20 flex w-[360px] flex-shrink-0 justify-between rounded-xl border bg-gray-10 md:w-[328px] ${ishidden ? 'md:hidden' : 'flex'}`}
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
        <Image
          src={banner.image_url}
          alt="img"
          width={112}
          height={88}
          className="relative z-10 h-[88px] w-[112px] rounded-r-xl object-cover"
        />
      )}
      <div className="absolute bottom-[10px] right-4 z-10 rounded-2xl bg-black bg-opacity-40 px-[6px] py-[2px] text-[10px] font-semibold text-white md:hidden">
        {currentIndex + 1}/{totalCount}
      </div>
    </div>
  );
}
