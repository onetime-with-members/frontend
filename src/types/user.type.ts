export interface UserType {
  nickname: string;
  email: string;
  language: 'KOR' | 'ENG';
  social_platform: 'google' | 'naver' | 'kakao';
}

export type SocialLoginType = 'naver' | 'kakao' | 'google';

export interface GuestValueType {
  name: string;
  pin: string;
}

export interface SleepTimeType {
  sleep_start_time: string;
  sleep_end_time: string;
}

export interface PolicyType {
  service_policy_agreement: boolean;
  privacy_policy_agreement: boolean;
  marketing_policy_agreement: boolean;
}

export type PolicyKeyType = keyof PolicyType;

export interface OnboardingValueType extends PolicyType, SleepTimeType {
  register_token: string;
  nickname: string;
}
