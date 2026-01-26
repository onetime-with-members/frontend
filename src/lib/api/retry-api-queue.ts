import { RetryApiQueueItem } from '@/types';

let queue: RetryApiQueueItem[] = [];

export const retryApiQueue = {
  push: (callback: RetryApiQueueItem) => {
    queue.push(callback);
  },
  retry: (accessToken: string) => {
    queue.forEach((callback) => callback(accessToken));
    retryApiQueue.clear();
  },
  clear: () => {
    queue = [];
  },
};
