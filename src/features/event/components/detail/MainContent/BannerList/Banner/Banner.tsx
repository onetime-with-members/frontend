'use client';

import BannerImageAndBlur from './BannerImageAndBlur';
import { Banner as BannerType } from '@/features/banner/types';
import { bannerClickAction } from '@/lib/api/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Banner({ banner }: { banner: BannerType }) {
  const queryClient = useQueryClient();

  const { mutateAsync: bannerClick } = useMutation({
    mutationFn: (id: number) => bannerClickAction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['banner'] });
    },
  });

  const handleClick = async () => {
    try {
      await bannerClick(banner.id);
    } catch (err) {
      console.error('배너를 클릭하는데에 에러가 발생했습니다.', err);
    } finally {
      if (banner.link_url) {
        window.open(banner.link_url, '_blank');
      }
    }
  };

  return (
    <div
      data-banner
      key={banner.id}
      className="relative z-20 flex h-[88px] w-full flex-shrink-0 cursor-pointer justify-between overflow-hidden rounded-xl border border-gray-10 bg-gray-05"
      onClick={handleClick}
    >
      {banner.image_url && (
        <BannerImageAndBlur
          imageUrl={banner.image_url}
          alt={`${banner.organization} image`}
        />
      )}
      <div className="z-10 flex flex-col justify-between py-3 pl-3">
        <span className="text-sm font-bold text-gray-60">{banner.title}</span>
        <p className="text-xs text-gray-40">{banner.sub_title}</p>
        <span
          className="text-xs font-bold"
          style={{ color: banner.color_code }}
        >
          {banner.button_text}
        </span>
      </div>
    </div>
  );
}
