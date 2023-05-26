type Func = (...p: any[]) => any;

function debounce(fn: Func, t: number): F {
  let prevTimeout: any = null;

  if (prevTimeout) {
    clearTimeout(prevTimeout);
  }

  return function (...args) {
    // clear previous timeout
    if (prevTimeout) {
      clearTimeout(prevTimeout);
    }
    prevTimeout = setTimeout(() => {
      fn(...args);
    }, t);
  };
}

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */
