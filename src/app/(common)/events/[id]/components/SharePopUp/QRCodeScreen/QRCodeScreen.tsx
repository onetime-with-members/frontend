import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import ClockPattern from '@/components/ClockPattern/ClockPattern';
import { useEventQuery } from '@/queries/event.queries';
import axios from '@/utils/axios';
import { IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface QRCodeScreenProps {
  onClose?: () => void;
}

export default function QRCodeScreen({ onClose }: QRCodeScreenProps) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('sharePopUp');

  const { data: event } = useEventQuery(params.id);
  const { data: qrData, isLoading: isQrLoading } = useQuery({
    queryKey: ['events', 'qr', params.id],
    queryFn: async () => {
      const res = await axios.get(`/events/qr/${params.id}`);
      return res.data;
    },
  });

  const qr = qrData?.payload;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (isQrLoading) {
    return <></>;
  }

  return (
    <motion.div
      initial={{ transform: 'translateY(100%)' }}
      animate={{ transform: 'translateY(0)' }}
      exit={{ transform: 'translateY(100%)' }}
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col overflow-hidden bg-gray-00"
      style={{
        background: 'linear-gradient(180deg, #8898F2 0%, #4C65E5 100%)',
      }}
    >
      <div className="absolute z-50 flex h-full w-full flex-col">
        <header className="absolute flex w-full items-center justify-end px-5 py-4">
          <button className="text-gray-00" onClick={onClose}>
            <IconX size={24} />
          </button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="w-[12rem] sm:w-[15rem]">
              <Image
                src="/images/logo-white.svg"
                alt="OneTime 로고"
                className="h-full w-full object-cover"
                width={192}
                height={41}
              />
            </div>
            <div className="h-[230px] w-[230px] overflow-hidden rounded-3xl bg-gray-00 sm:h-[280px] sm:w-[280px]">
              <Image
                src={qr.qr_code_img_url}
                alt="QR 코드 이미지"
                className="h-full w-full object-cover"
                width={230}
                height={230}
              />
            </div>
            <p className="text-center text-primary-10 title-sm-300">
              {t.rich('qrCodeScreen', {
                eventName: event?.title,
                br: () => <br />,
                Name: (children) => (
                  <span className="text-primary-00">{children}</span>
                ),
              })}
            </p>
          </div>
        </div>
      </div>
      <ClockPattern className="opacity-50" />
    </motion.div>
  );
}
