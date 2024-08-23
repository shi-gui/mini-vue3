import { track, trigger } from './effect';

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
        // Reflect 是一个内置的对象，它提供拦截JavaScript操作的方法，它的所有属性和方法都是静态的
      const res = Reflect.get(target, key);

      // 依赖收集
      track(target, key);
      return res;
    },

    set(target, key, value) {
      const res = Reflect.set(target, key, value);

      // 触发依赖
      trigger(target, key);
      return res;
    },
  });
}
