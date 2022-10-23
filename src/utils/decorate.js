/**
 * 判断当前最后数据是否为descriptor
 */
 function isDescriptor(descriptor) {
  if (descriptor) {
    return (
      Object.prototype.hasOwnProperty.call(descriptor,"configurable") &&
      Object.prototype.hasOwnProperty.call(descriptor,"enumerable") &&
      Object.prototype.hasOwnProperty.call(descriptor,"writable") &&
      Object.prototype.hasOwnProperty.call(descriptor,"value")
    );
  }
  return false;
}

/**
 * 制定修饰器
 * @param {*} handleDescription
 * @param {*} entryArgs
 * @returns
 */
function decorate(handleDescription, entryArgs) {
  // 若装饰器未传参，则最后一个参数是 descriptor
  // 未传参的装饰器，例如 @log
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescription(...entryArgs, []);
  } else {
    // 传参的装饰器 例如 @add(1)
    return function () {
      return handleDescription(
        ...Array.prototype.slice.call(arguments),
        entryArgs
      );
    };
  }
}

export default decorate;
