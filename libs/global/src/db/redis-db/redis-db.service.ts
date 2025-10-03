import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisDbService {

  constructor(@InjectRedis() private readonly redis: Redis) {
    // this.clearAllData();
    this.attachRedisEventListeners();
  }

  private attachRedisEventListeners(): void {
    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redis.on('ready', () => {
      console.log('Redis is ready to accept commands');
    });

    this.redis.on('error', (error) => {
      console.log(`Redis error: ${error}`);
    });

    this.redis.on('reconnecting', () => {
      console.log('Reconnecting to Redis');
    });

    this.redis.on('end', () => {
      console.log('Redis connection has ended');
    });

    this.redis.on('command', (command) => {
      console.log(`Command executed: ${command.name} ${command.args.join(' ')}`);
    });
  }
  async setValue(key: string, value: any, expirationInSeconds?: any): Promise<void> {
    await this.redis.set(key, value);
    if (expirationInSeconds)
      await this.redis.set(key, value, 'EX', expirationInSeconds);
  }

  async getValue(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  async deleteValue(...key: any): Promise<void> {
    let rs = await this.redis.del(key);
  }

  async deleteList(key: string): Promise<any> {
    await this.redis.del(key);
  }
  async pushAndTrimList(key: string, value: number, expiration?: number): Promise<void> {
    await this.redis.lpush(key, value);
    await this.redis.ltrim(key, 0, 9); // Keep only the last 10 items
    if (expiration)
      await this.redis.expire(key, expiration); // Set the expiration
  }

  async getMaxFromList(key: string): Promise<number> {
    const list = await this.redis.lrange(key, 0, -1);
    const numbers = list.map(Number);
    return Math.max(...numbers);
  }

  async getMinFromList(key: string): Promise<number> {
    const list = await this.redis.lrange(key, 0, -1);
    const numbers = list.map(Number);
    return Math.min(...numbers);
  }

  async clearAllData(): Promise<void> {
    console.log('\n\r\n\rclear all data ')
    await this.redis.flushall();
  }
  // `session:${sessionId}:*`
  async hasKey(key: string): Promise<boolean> {
    const keys = await this.redis.keys(key);
    return keys.length > 0;
  }

  // `session:${sessionId}:*`
  // async getAllValues(key: string) {
  //   const keys = await this.redis.keys(key);
  //   const pages = await Promise.all(keys.map((key) => this.redis.get(key)));
  //   return pages.map((page) => (page));
  // }


  async getAllValues(keyPattern: string): Promise<any> {
    try {
      // const keys = await this.redis.keys(keyPattern); // Get all keys matching the pattern
      const keys = await this.scanKeys(keyPattern);

      const pages = await Promise.all(
        keys.map(async (key) => {
          const value = await this.redis.get(key); // Get the data for each key
          const pageNumber = key.split(':').pop(); // Extract the page number from the key
          return { pageNumber, value }; // Return both page number and data
        }),
      );

      // Convert the array into an object with page numbers as keys
      const result = pages.reduce((acc, { pageNumber, value }) => {
        acc[pageNumber] = JSON.parse(value); // Parse the value and add it to the result
        return acc;
      }, {});

      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async deleteSessionPages(sessionId: any, pageLimit: number): Promise<boolean> {
    // Get all keys for the session
    try {
      // const keys = await this.redis.keys(`session:${sessionId}:*`);
      const keys = await this.scanKeys(`session:${sessionId}:*`);
      // Filter keys where the page number is greater than the limit
      const keysToDelete = keys.filter((key) => {
        const pageNumber = parseInt(key.split(':').pop(), 10); // Extract page number
        return pageNumber > pageLimit;
      });
      // Delete the filtered keys
      if (keysToDelete.length > 0) {
        await this.redis.del(...keysToDelete);
        console.log(`Deleted keys: ${keysToDelete.join(', ')}`);
      } else {
        // console.log(`No keys found with page number > ${pageLimit}`);
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  async scanKeys(pattern: string): Promise<string[]> {
    let cursor = '0';
    const keys: string[] = [];
    try {
      do {
        // Pass MATCH and COUNT as arguments
        const [newCursor, matches] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', '100');
        cursor = newCursor;
        keys.push(...matches);
      } while (cursor !== '0');

    } catch (error) {
      console.log(error);

    }

    return keys;
  }
/*
  async deleteSessionData(sessionId: number): Promise<boolean> {
    try {
      // Fetch all keys for the specific session
      const sessionKeys = await this.scanKeys(`session:${sessionId}:*`);

      if (sessionKeys.length === 0) {
        console.log(`No data found for session ${sessionId} in Redis.`);
        return true; // Nothing to delete
      }

      // Delete all keys related to the session
      await this.redis.del(...sessionKeys);
      console.log(`Deleted all pages for session ${sessionId}: ${sessionKeys.join(', ')}`);
      return true;
    } catch (error) {
      console.error(`Error deleting data for session ${sessionId}:`, error);
      return false;
    }
  }*/

}
