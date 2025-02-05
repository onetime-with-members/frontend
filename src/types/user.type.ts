export interface User {
  nickname: string;
  email: string;
}

export interface GuestValue {
  name: string;
  pin: string;
}

export interface SleepTime {
  sleep_start_time: string;
  sleep_end_time: string;
}

export interface PolicyType {
  service_policy_agreement: boolean;
  privacy_policy_agreement: boolean;
  marketing_policy_agreement: boolean;
}

export type PolicyKeyType = keyof PolicyType;

export interface OnboardingValueType extends PolicyType, SleepTime {
  register_token: string;
  nickname: string;
}
