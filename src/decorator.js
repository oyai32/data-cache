import ExpiresCache from './cache/expires-cache';
import decorate from './utils/decorate';

function handleDataCache(target, name, descriptor, [cacheKey, cacheTime]) {
  // 拿到函数体并保存
  const fn = descriptor.value;
  // 修改函数体
  descriptor.value = function () {
    if (!cacheKey) {
      throw new Error(`请设置 ${name} 的缓存名称`);
    }

    let promise = ExpiresCache.get(cacheKey);

    if (!promise) {
      // 设定promise
      promise = fn.apply(this, arguments).catch((error) => {
        // 在请求回来后，如果出现问题，把promise从cache中删除
        ExpiresCache.delete(cacheKey);
        // 返回错误
        return Promise.reject(error);
      });

      // 使用缓存，缓存过期之后再次get就会获取null，而从服务端继续请求
      ExpiresCache.set(cacheKey, promise, cacheTime);
      // console.log('ExpiresCache.cacheMap', ExpiresCache.cacheMap);
    }

    return promise;
  };
  return descriptor;
}

/**
 * 数据缓存装饰器
 * 在类方法上加 @dataCache(key,time)
 * key: 缓存名称，必填
 * time: 缓存时间，选填，默认 360s
 */
export default function dataCache(...args) {
  return decorate(handleDataCache, args);
}
export { ExpiresCache, dataCache };
