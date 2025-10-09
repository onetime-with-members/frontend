type RetryApiQueueItem = (accessToken: string) => void;

class RetryApiQueue {
  private queue: RetryApiQueueItem[] = [];

  push(callback: RetryApiQueueItem) {
    this.queue.push(callback);
  }

  retry(callback: (value: RetryApiQueueItem) => void) {
    this.queue.forEach(callback);
    this.clear();
  }

  clear() {
    this.queue = [];
  }
}

export const retryApiQueue = new RetryApiQueue();
