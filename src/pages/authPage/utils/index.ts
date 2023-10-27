export function getUrlParameters(url = window.location.href) {
  const params: any = {};
  const urlParts = url.split('?');
  if (urlParts.length > 1) {
    const paramString = urlParts[1];
    const paramPairs = paramString.split('&');
    paramPairs.forEach((pair: any) => {
      const pairParts = pair.split('=');
      const key = decodeURIComponent(pairParts[0]);
      const value = decodeURIComponent(pairParts[1] || '');
      params[key] = value;
    });
  }
  return params;
}