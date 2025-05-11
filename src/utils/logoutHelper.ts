import { clearAllCookies, clearAllLocalStorage } from "./storage";

export const handleLogout = (): void => {
  clearAllCookies();
  clearAllLocalStorage();

  window.location.reload();
};
