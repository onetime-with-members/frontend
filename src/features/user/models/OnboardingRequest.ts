import { OnboardingValuesType } from './OnboardingValuesType';
import Serializable from '@/models/Serializable';

export class OnboardingRequest extends Serializable {
  private readonly _register_token: string;
  private readonly _nickname: string;
  private readonly _service_policy_agreement: boolean;
  private readonly _privacy_policy_agreement: boolean;
  private readonly _marketing_policy_agreement: boolean;
  private readonly _sleep_start_time: string;
  private readonly _sleep_end_time: string;
  private readonly _language: string;

  constructor(value: OnboardingValuesType) {
    super();
    this._register_token = value.registerToken;
    this._nickname = value.nickname;
    this._service_policy_agreement = value.servicePolicy;
    this._privacy_policy_agreement = value.privacyPolicy;
    this._marketing_policy_agreement = value.marketingPolicy;
    this._sleep_start_time = value.startSleepTime;
    this._sleep_end_time = value.endSleepTime;
    this._language = value.language;
  }

  get register_token(): string {
    return this._register_token;
  }

  get nickname(): string {
    return this._nickname;
  }

  get service_policy_agreement(): boolean {
    return this._service_policy_agreement;
  }

  get privacy_policy_agreement(): boolean {
    return this._privacy_policy_agreement;
  }

  get marketing_policy_agreement(): boolean {
    return this._marketing_policy_agreement;
  }

  get sleep_start_time(): string {
    return this._sleep_start_time;
  }

  get sleep_end_time(): string {
    return this._sleep_end_time;
  }

  get language(): string {
    return this._language;
  }
}
