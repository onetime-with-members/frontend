import { useTranslations } from 'next-intl';

import backgroundDecoration from '@/assets/banner-background-decoration.svg';
import coffeeGrahic from '@/assets/banner-coffee-graphic.svg';
import ArrowUpRightIcon from '@/components/icon/ArrowUpRightIcon';
import Image from 'next/image';

export default function EverytimeTopBanner() {
  const t = useTranslations('EverytimeTopBanner');

  return (
    <a
      href="https://www.instagram.com/p/DHBOlTSPmwl/?img_index=1"
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-[104px] overflow-hidden rounded-2xl bg-primary-30 px-4 pt-4 text-gray-00 min-[700px]:items-center min-[700px]:px-6 min-[700px]:pt-0 md:px-6"
      style={{
        background: 'linear-gradient(180deg, #677CEE 0%, #8898F2 100%)',
      }}
    >
      <div className="absolute bottom-0 left-0">
        <Image src={backgroundDecoration} alt="" width={752} height={57} />
      </div>
      <div className="relative z-10">
        <h2 className="text-lg-300 min-[700px]:font-bold">
          {t.rich('title', {
            br: () => <br className="block min-[700px]:hidden" />,
          })}
        </h2>
        <p className="hidden items-center gap-1 leading-[130%] text-md-100 min-[700px]:flex">
          <span>{t('description')}</span>
          <span>
            <ArrowUpRightIcon fill="#FFFFFF" size={16} />
          </span>
        </p>
      </div>
      <div className="absolute -bottom-4 right-2 md:right-6">
        <Image
          src={coffeeGrahic}
          alt="hot coffee on the left and ice coffee on the right"
          width={145}
          height={126}
          className="h-[97px] w-[102px] min-[450px]:h-[126px] min-[450px]:w-[145px]"
        />
      </div>
    </a>
  );
}
