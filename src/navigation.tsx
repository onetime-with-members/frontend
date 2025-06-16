'use client';

import nProgress from 'nprogress';

import {
  AppRouterInstance,
  NavigateOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function useProgressRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const progressRouter: AppRouterInstance = {
    push: (href: string, options?: NavigateOptions) => {
      if (pathname !== href) {
        nProgress.start();
      }
      router.push(href, options);
    },
    replace: (href: string, options?: NavigateOptions) => {
      if (pathname !== href) {
        nProgress.start();
      }
      router.replace(href, options);
    },
    back: () => {
      nProgress.start();
      router.back();
    },
    forward: () => {
      nProgress.start();
      router.forward();
    },
    prefetch: (href: string) => {
      if (pathname !== href) {
        nProgress.start();
      }
      router.prefetch(href);
    },
    refresh: () => {
      nProgress.start();
      router.refresh();
    },
  };

  return progressRouter;
}

export function ProgressLink({
  children,
  onClick,
  progressBar = true,
  ...props
}: {
  progressBar?: boolean;
} & LinkProps &
  React.HTMLAttributes<HTMLAnchorElement>) {
  const progressRouter = useProgressRouter();
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e);
    } else {
      e.preventDefault();
      if (progressBar) {
        progressRouter.push(props.href as string);
      } else {
        router.push(props.href as string);
      }
    }
  }

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
