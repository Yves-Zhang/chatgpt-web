export function debounce<F extends (...args: any[]) => void>(func: F, delay = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
