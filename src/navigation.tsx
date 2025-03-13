import nProgress from 'nprogress';

import {
  AppRouterInstance,
  NavigateOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { LinkProps as NextLinkProps, default as _Link } from 'next/link';
import { useRouter as _useRouter } from 'next/navigation';

export function useRouter() {
  const _router = _useRouter();
  const router: AppRouterInstance = {
    push: (href: string, options?: NavigateOptions) => {
      nProgress.start();
      return _router.push(href, options);
    },
    replace: (href: string, options?: NavigateOptions) => {
      nProgress.start();
      return _router.replace(href, options);
    },
    back: () => _router.back(),
    forward: () => _router.forward(),
    prefetch: (href: string) => _router.prefetch(href),
    refresh: () => _router.refresh(),
  };
  return router;
}

interface LinkProps
  extends NextLinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {}

export function Link({ children, onClick, ...props }: LinkProps) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e);
    } else {
      e.preventDefault();
      router.push(props.href as string);
    }
  }

  return (
    <_Link onClick={handleClick} {...props}>
      {children}
    </_Link>
  );
}
