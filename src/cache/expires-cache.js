import ItemCache from './item-cache';

class ExpiresCache {
  // 定义静态数据map来作为缓存池
  static cacheMap = new Map();

  // 数据是否超时
  static isOverTime(name) {
    const data = ExpiresCache.cacheMap.get(name);

    // 没有数据 一定超时
    if (!data) {
      return true;
    }

    // 获取系统当前时间戳
    const currentTime = new Date().getTime();

    // 获取当前时间与存储时间的过去的秒数
    const overTime = (currentTime - data.cacheTime) / 1000;

    // 如果过去的秒数大于当前的超时时间，也返回超时，让其去服务端取数据
    if (overTime > data.timeout) {
      ExpiresCache.cacheMap.delete(name);
      return true;
    }

    // 不超时
    return false;
  }

  // 删除 cache 中的 data
  static delete(name) {
    return ExpiresCache.cacheMap.delete(name);
  }

  // 获取
  static get(name) {
    const isDataOverTime = ExpiresCache.isOverTime(name);
    // 如果 数据超时，返回null，但是没有超时，返回数据，而不是 ItemCache 对象
    return isDataOverTime ? null : ExpiresCache.cacheMap.get(name).data;
  }

  // 默认存储60分钟
  static set(name, data, timeout = 3600) {
    // 设置 itemCache
    const itemCache = new ItemCache(data, timeout);
    // 缓存
    ExpiresCache.cacheMap.set(name, itemCache);
  }
}

export default ExpiresCache;
