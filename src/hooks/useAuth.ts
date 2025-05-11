import { ACCESS_TOKEN } from "@/constants/storage";
import { getCookie } from "@/utils/storage";

function useAuth() {
  const access_token = getCookie(ACCESS_TOKEN);
  // const refresh_token = getCookie(REFRESH_TOKEN);

  if (access_token) {
    return true;
  }
  return false;
}

export default useAuth;
