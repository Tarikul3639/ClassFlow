import { apiClient } from './axios';

interface QueuedRequest {
  id: string;
  url: string;
  method: string;
  data: any;
  timestamp: number;
}

const QUEUE_KEY = 'offline_request_queue';

export const offlineQueue = {
  // Add request to queue
  add: (url: string, method: string, data: any): void => {
    if (typeof window === 'undefined') return;

    const queue = offlineQueue.getAll();
    const request: QueuedRequest = {
      id: `${Date.now()}_${Math.random()}`,
      url,
      method,
      data,
      timestamp: Date.now(),
    };

    queue.push(request);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  },

  // Get all queued requests
  getAll: (): QueuedRequest[] => {
    if (typeof window === 'undefined') return [];

    const queueStr = localStorage.getItem(QUEUE_KEY);
    return queueStr ? JSON.parse(queueStr) : [];
  },

  // Remove request from queue
  remove: (id: string): void => {
    if (typeof window === 'undefined') return;

    const queue = offlineQueue.getAll().filter((req) => req.id !== id);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  },

  // Clear all
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(QUEUE_KEY);
  },

  // Process queue when online
  process: async (): Promise<void> => {
    const queue = offlineQueue.getAll();

    for (const request of queue) {
      try {
        await apiClient.request({
          url: request.url,
          method: request.method,
          data: request.data,
        });

        offlineQueue.remove(request.id);
      } catch (error) {
        console.error('Failed to process queued request:', error);
      }
    }
  },
};