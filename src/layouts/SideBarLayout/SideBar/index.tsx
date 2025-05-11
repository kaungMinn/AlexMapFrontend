import { MENU_LIST } from "@/constants/menuList";
import MenuList from "./MenuList";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { FaConnectdevelop } from "react-icons/fa";

const SideBar = ({
    isOpenSide,
    /**
     * action
     */
    handleClickOn,
    handleChangeOnLogoutBox,
}: {
    isOpenSide: boolean;
    /**
     * action
     */
    handleClickOn: () => void;
    handleChangeOnLogoutBox: () => void;
}) => {

    return (
        <div
            className={`absolute left-0 top-0 z-[1100] h-screen  duration-100 bg-default_light   ${isOpenSide
                ? "w-2/3 translate-x-0 laptop:w-44"
                : "w-2/3 -translate-x-[95%] laptop:w-16 laptop:translate-x-0"
                }`}
        >
            <div
                className={`relative left-0 top-1/2 h-[98%] w-full -translate-y-1/2 rounded-lg border  shadow-md laptop:left-2 bg-default text-primary`}
            >
                <div className="h-full w-full pt-12 ">
                    <div className="">
                        <FaConnectdevelop size={40} className="mx-auto mb-1" />
                        <div
                            className={`${!isOpenSide && "scale-0"
                                } duration-300  flex items-center  justify-center gap-1`}
                        >
                            {/* <p className="heading-font">Map</p> */}
                            <p className="sub-heading-font">ALEX MAP</p>
                        </div>
                    </div>

                    <div className="space-y-3 px-3 pt-5">
                        <MenuList
                            list={MENU_LIST}
                            isOpenSide={isOpenSide}
                            /**
                             * action
                             */
                            handleChangeOnLogoutBox={handleChangeOnLogoutBox}
                            handleClickOn={handleClickOn}
                        // colors={navColor}
                        />
                    </div>
                </div>
                <div
                    className={`${!isOpenSide && "rotate-180"
                        } group absolute bottom-16 right-0  h-8 w-8 translate-x-3 items-center justify-center rounded-full  duration-300 flex laptop:hover:cursor-pointer border bg-primary text-default `}
                    onClick={handleClickOn}
                >
                    <HiOutlineChevronDoubleLeft className="h-auto w-4 duration-200 group-hover:-translate-x-1" />
                </div>
            </div>
        </div>
    );
};

export default SideBar;
