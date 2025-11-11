import { AxiosError } from 'axios';

export type ExtendedAxiosError = AxiosError & {
  response: {
    status: number;
    data: { code: string };
  };
  config: AxiosError & { _retry: boolean };
};

export type RetryApiQueueItem = (accessToken: string) => void;
