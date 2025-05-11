export const getCookie = (key: string): string | null => {
    const cookieData = document.cookie.split(";");
  
    for (let i = 0; i < cookieData.length; i++) {
      const cookiePair = cookieData[i].split("=");
  
      if (key === cookiePair[0].trim()) return cookiePair[1];
    }
  
    return null;
  };
  
  export const setCookie = (
    key: string,
    value: string,
    path: string = "/"
  ): void => {
    document.cookie = `${key}=${value};path=${path}`;
    return;
  };
  
  export const clearAllCookies = (path: string = "/") => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=Thu, 01 Jan 2000 00:00:00 UTC; path=${path}`);
    });
  };
  
  export const setLocalStorage = (key: string, value: string | boolean) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const clearAllLocalStorage = () => {
    window.localStorage.clear();
    return;
  };
  