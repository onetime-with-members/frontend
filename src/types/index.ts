import { AxiosError } from 'axios';

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export type ExtendedAxiosError = AxiosError & {
  response: {
    status: number;
    data: { code: string };
  };
  config: AxiosError & { _retry: boolean };
};
