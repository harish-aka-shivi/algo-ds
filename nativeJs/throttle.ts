type F = (...args: any[]) => void;

function throttle(fn: F, t: number): F {
  let timerId: number | null | NodeJS.Timer = null;
  let lastArgs: any[] = [];
  let enqueueCall = false;

  return function a(...args) {
    if (!timerId) {
      fn(...args);
      timerId = setInterval(() => {
        if (enqueueCall) {
          fn(...lastArgs);
          enqueueCall = false;
        } else {
          if (timerId !== null) {
            clearInterval(timerId);
          }
          timerId = null;
        }
      }, t);
    } else {
      enqueueCall = true;
      lastArgs = args;
    }
  };
}

/**
 * const throttled = throttle(console.log, 100);
 * throttled("log"); // logged immediately.
 * throttled("log"); // logged at t=100ms.
 */
