import { OnboardingFormType } from '@/lib/validation/form-types';

export interface OnboardingType extends OnboardingFormType {
  registerToken: string;
  language: 'KOR' | 'ENG';
}
