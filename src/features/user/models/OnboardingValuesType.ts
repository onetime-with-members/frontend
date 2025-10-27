import { OnboardingFormType } from '@/lib/validation/form-types';

export interface OnboardingValuesType extends OnboardingFormType {
  registerToken: string;
  language: 'KOR' | 'ENG';
}
