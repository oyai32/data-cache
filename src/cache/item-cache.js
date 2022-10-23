class ItemCache {
  constructor(data, timeout) {
    this.data = data;
    // 设定超时时间，设定为多少秒
    this.timeout = timeout;
    // 创建对象时候的时间，大约设定为数据获得的时间
    this.cacheTime = new Date().getTime();
  }
}

export default ItemCache;
