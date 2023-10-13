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

export function getUrlParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params: any = {};
  for (const [key, value] of urlSearchParams.entries()) {
    params[key] = value;
  }
  return params;
}


export function loginAfter(res: any) {
  setCrossSubdomainCookie('token', res.data.token, 7)
  setCrossSubdomainCookie('userInfo', JSON.stringify(res.data), 7)

  setTimeout(() => {
    window.location.href = 'https://ai.koudingtu.com/openai'
  }, 500)
}

export function removeUrlParameter(paramName:string) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(paramName);
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  history.replaceState(null, '', newUrl);
}