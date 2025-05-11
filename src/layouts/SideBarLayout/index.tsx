import { LogoutProvider } from "@/hooks/logoutProvider";
import SidebarProvider from "@/hooks/sideBarProvider";
import SideBar from "./SideBar";
import AskBox from "@/components/modalBox/askBox";
import { Outlet } from "react-router-dom";

const SideBarLayout = () => {
    const { isOpenSideBar, handleChangeOnSideBar } = SidebarProvider();
    const { isOpenLogoutBox, handleChangeOnLogout, handleChangeOnBox } =
        LogoutProvider();
    return (
        <>
            <div className="relative">
                <SideBar
                    isOpenSide={isOpenSideBar}
                    /**
                     * action
                     */
                    handleClickOn={handleChangeOnSideBar}
                    handleChangeOnLogoutBox={handleChangeOnBox}
                />

                <div
                    className={`h-screen w-full duration-100 ${isOpenSideBar ? "laptop:pl-44" : "laptop:pl-16"
                        } `}
                >
                    <div
                        className={`fixed inset-0 z-[401] duration-200 laptop:hidden ${isOpenSideBar
                            ? "bg-black/30 backdrop-blur-sm"
                            : "pointer-events-none"
                            }`}
                    />
                    <Outlet />
                </div>
            </div>
            <AskBox
                isOpen={isOpenLogoutBox}
                titleLabel="Logout"
                bodyText="Are you sure to logout?"
                btnCancelLabel="Cancel"
                btnOkLabel="Confirm"
                /**
                 * action
                 */
                clickOnCancel={handleChangeOnBox}
                clickOnOk={handleChangeOnLogout}
            />
        </>
    );
};

export default SideBarLayout;
