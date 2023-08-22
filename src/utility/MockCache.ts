
import { Cache } from '../interfaces/Cache.js'

export class MockCache implements Cache {
    private cache: Record<string, any> = {};

    get(key: string): any | null {
        return this.cache[key] || null;
    }

    set(key: string, value: any): void {
        this.cache[key] = value;
    }
}
