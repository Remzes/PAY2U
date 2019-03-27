import NodeCache from 'node-cache'

class CacheService {
  constructor(stdTTl) {
    this.cache = new NodeCache(
      {
        stdTTL: stdTTl,
        checkperiod: stdTTl * 0.5,
        useClones: false,
        deleteOnExpire: true
      }
    )
  }

  get(key, store) {
    const value = this.cache.get(key);
    if (value) return Promise.resolve(value);

    return store().then(result => {
      this.cache.set(key, result)
      return result;
    })
  }

  del(keys) {this.cache.del(keys);}
}


export default CacheService;
