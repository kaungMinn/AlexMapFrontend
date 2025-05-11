import { useState } from "react";

const SideBarProvider = (): {
  isOpenSideBar: boolean;
  handleChangeOnSideBar: () => void;
} => {
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);

  const handleChangeOnSideBar = () => {
    setIsOpenSideBar((prev) => !prev);
  };

  return { isOpenSideBar, handleChangeOnSideBar };
};

export default SideBarProvider;
