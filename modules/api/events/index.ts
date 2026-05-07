import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export class EventBus {
  private static queues: Record<string, Queue> = {};

  /**
   * Get or create a queue
   */
  static getQueue(name: string): Queue {
    if (!this.queues[name]) {
      this.queues[name] = new Queue(name, { connection: redisConnection });
    }
    return this.queues[name];
  }

  /**
   * Emit an event to a specific queue
   */
  static async emit(queueName: string, eventName: string, payload: any) {
    const queue = this.getQueue(queueName);
    await queue.add(eventName, payload, {
      removeOnComplete: true,
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
    });
  }
}

/**
 * Foundation for creating background workers
 */
export class BaseWorker {
  static createWorker(queueName: string, handler: (job: any) => Promise<void>) {
    return new Worker(queueName, handler, { connection: redisConnection });
  }
}
