import { AuthService } from "@/services/authService";
import { handleLogout } from "@/utils/logoutHelper";
import { useState } from "react";

export const LogoutProvider = () => {
  const [isOpenLogoutBox, setIsOpenLogoutBox] = useState<boolean>(false);

  const handleChangeOnBox = (): void => {
    setIsOpenLogoutBox((prev) => !prev);
  };

  const handleChangeOnLogout = (): void => {
    AuthService.logout();
    handleLogout();
  };

  return {
    isOpenLogoutBox,
    handleChangeOnBox,
    handleChangeOnLogout,
  };
};
