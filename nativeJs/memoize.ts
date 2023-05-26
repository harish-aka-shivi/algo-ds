type MemoizeFn = (...params: any) => any;

const getKey = (args: any[]) => args.join('-');

function memoize(fn: MemoizeFn): MemoizeFn {
  const map: Record<string, any> = {};
  return function (...args) {
    const key = getKey(args);
    if (map[key] !== undefined) {
      return map[key];
    } else {
      const out = fn(...args);
      map[key] = out;
      return out;
    }
  };
}
