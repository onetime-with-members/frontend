import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'title-lg-300',
        'title-lg-200',
        'title-lg-100',
        'title-md-300',
        'title-md-200',
        'title-md-100',
        'title-sm-300',
        'title-sm-200',
        'title-sm-100',
        'text-lg-300',
        'text-lg-200',
        'text-lg-100',
        'text-md-300',
        'text-md-200',
        'text-md-100',
        'text-sm-300',
        'text-sm-200',
        'text-sm-100',
      ],
    },
  },
});

export default function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(...classNames));
}
