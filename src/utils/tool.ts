import Cookies from 'cookiejs';

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

export function setCrossSubdomainCookie(name: string, value: string, expires?: number) {
  var domainParts = window.location.hostname.split('.').reverse();
  var topLevelDomain = domainParts[1] + '.' + domainParts[0]; // 获取顶级域名 
  Cookies.set(name, value, { expires: expires, domain: topLevelDomain, path: '/' });
}
