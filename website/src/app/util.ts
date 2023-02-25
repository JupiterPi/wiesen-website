export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

export class CacheMap<K, V> {
  private map = new Map<K, V>();

  constructor(private value: (key: K) => V) {}

  get(key: K): V {
    const cached = this.map.get(key);
    if (cached != undefined) {
      return cached;
    } else {
      const value = this.value(key);
      this.map.set(key, value);
      return value;
    }
  }
}
