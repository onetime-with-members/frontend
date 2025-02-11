export interface UserType {
  nickname: string;
  email: string;
}

export interface GuestValueType {
  name: string;
  pin: string;
}

export interface PolicyType {
  service_policy_agreement: boolean;
  privacy_policy_agreement: boolean;
  marketing_policy_agreement: boolean;
}

export type PolicyKeyType = keyof PolicyType;

export interface OnboardingValueType extends PolicyType {
  register_token: string;
  nickname: string;
  sleep_start_time: string;
  sleep_end_time: string;
}
