import { RetryApiQueueItem } from '@/types';

let queue: RetryApiQueueItem[] = [];

export const retryApiQueue = {
  push: (callback: RetryApiQueueItem) => {
    queue.push(callback);
  },
  retry: (callback: (value: RetryApiQueueItem) => void) => {
    queue.forEach(callback);
    retryApiQueue.clear();
  },
  clear: () => {
    queue = [];
  },
};
