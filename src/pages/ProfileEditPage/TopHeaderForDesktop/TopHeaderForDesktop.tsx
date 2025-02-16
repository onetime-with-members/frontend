import { IconChevronLeft } from '@tabler/icons-react';

export default function TopHeaderForDesktop() {
  return (
    <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
      <IconChevronLeft size={32} />
      <h1 className="title-lg-300">프로필 수정</h1>
    </div>
  );
}
