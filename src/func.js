import ExpiresCache from './cache/expires-cache';

export default function dataCache(key,fn,time){
  let promise = ExpiresCache.get(key);
  if (!promise) {
    promise = fn.apply(this, arguments).catch((error) => {
      ExpiresCache.delete(cacheKey);
      return Promise.reject(error);
    });
    ExpiresCache.set(key, promise,time);
  }
  return promise;
}
