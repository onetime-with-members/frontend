import { LanguageType } from './LanguageType';
import { RemoteUserType } from './RemoteUserType';
import { SocialPlatformType } from './SocialPlatformType';

export class UserType {
  private readonly _nickname: string;
  private readonly _email: string;
  private readonly _language: LanguageType;
  private readonly _socialPlatform: SocialPlatformType;

  constructor(user?: RemoteUserType) {
    this._nickname = user?.nickname ?? '';
    this._email = user?.email ?? '';
    this._language = user?.language ?? 'ENG';
    this._socialPlatform = user?.social_platform ?? 'google';
  }

  get nickname(): string {
    return this._nickname;
  }

  get email(): string {
    return this._email;
  }

  get language(): LanguageType {
    return this._language;
  }

  get socialPlatform(): SocialPlatformType {
    return this._socialPlatform;
  }
}
