'use client';

import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';

import GrayBackground from '@/components/GrayBackground';
import NavBar from '@/components/NavBar';
import { PolicySchema } from '@/features/user/types';
import privacyMarkdownEN from '@/markdowns/privacy-en';
import privacyMarkdownKO from '@/markdowns/privacy-ko';
import serviceMarkdownEN from '@/markdowns/service-en';
import serviceMarkdownKO from '@/markdowns/service-ko';
import { IconChevronLeft } from '@tabler/icons-react';

export default function PolicyDetailScreen({
  page,
  pageTitle,
  onClose,
}: {
  page: keyof PolicySchema;
  pageTitle: string;
  onClose: () => void;
}) {
  const locale = useLocale();

  return (
    <>
      <GrayBackground />

      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center bg-gray-00 md:bg-gray-05">
        {/* Top App Bar for Mobile */}
        <nav className="block h-[4rem] md:hidden">
          <div className="fixed left-0 top-0 flex h-[4rem] w-full items-center bg-gray-00 p-4">
            <button className="w-6" onClick={onClose}>
              <IconChevronLeft />
            </button>
            <div className="flex flex-1 items-center justify-center">
              <span className="text-gray-90 text-md-300">{pageTitle}</span>
            </div>
            <div className="w-6" />
          </div>
        </nav>

        {/* Top Navigation Bar for Desktop */}
        <div className="hidden md:block">
          <NavBar />
        </div>

        <div className="mx-auto flex h-[calc(100%-4rem)] w-full max-w-screen-md flex-1 flex-col md:pb-6">
          {/* Header */}
          <div className="hidden items-center py-6 md:flex">
            <button onClick={onClose}>
              <IconChevronLeft size={32} />
            </button>
            <h1 className="text-gray-90 title-lg-300">{pageTitle}</h1>
          </div>

          {/* Markdown Content */}
          <div className="markdown-body scrollbar-hidden flex-1 overflow-scroll bg-gray-00 px-4 md:rounded-2xl md:p-8">
            {page === 'servicePolicy' && (
              <ReactMarkdown>
                {locale === 'ko' ? serviceMarkdownKO : serviceMarkdownEN}
              </ReactMarkdown>
            )}
            {page === 'privacyPolicy' && (
              <ReactMarkdown>
                {locale === 'ko' ? privacyMarkdownKO : privacyMarkdownEN}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
