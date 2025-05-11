import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";

// icons
import { BsChevronRight } from "react-icons/bs";
import { MENU_LIST_PROPS_TYPE, MENU_LIST_TYPE, SUB_MENU_TYPE } from "../_type";



// components

export const MenuItem = ({
    menu,
    currentPathName,
    isOpenSide,
    // colors,
}: {
    menu: MENU_LIST_TYPE | SUB_MENU_TYPE;
    currentPathName: string;
    isOpenSide?: boolean;
    // colors: string[];
}) => {
    return (
        <Link
            to={menu.path}
            key={menu.id}
            className={`${currentPathName === menu.path ? "bg-primary text-default" : "bg-default text-base_light hover:bg-default_light hover:text-base_light"} flex items-center space-x-2 rounded-md px-2.5 py-2`}
        >
            <div className={`w-[16px] min-w-[16px]  `}>{menu.icon}</div>
            <p
                className={` ${!isOpenSide && "hidden"
                    } secondary-font truncate font-medium`}
            >
                {menu.name}
            </p>
        </Link>
    );
};

const MenuList: React.FC<MENU_LIST_PROPS_TYPE> = ({
    list,
    isOpenSide,
    /**
     * action
     */

    handleClickOn,
    handleChangeOnLogoutBox
}) => {
    const location = useLocation();

    const { pathname } = location;

    const [menuList, setMenuList] = useState<MENU_LIST_TYPE[]>(list);


    const clickOnExpandMenu = (menuId: number, value?: boolean) => {
        const tmpList = _.cloneDeep(menuList);
        const newList = tmpList.map((menu) => {
            if (menu.id === menuId) {
                return { ...menu, expand: value || !menu.expand };
            }
            return menu;
        });
        setMenuList(newList);
    };

    return (
        <>
            {menuList.length > 0 &&
                menuList.map((menu) => (
                    <React.Fragment key={menu.id}>
                        {menu.is_sub_menu ? (
                            <div
                                key={menu.id}
                                className={`space-y-3 bg-default ${menu.expand ? "text-base_light" : "text-base_dark"
                                    }`}
                            >
                                <div
                                    className="flex items-center justify-between px-2.5 py-2 laptop:hover:cursor-pointer"
                                    /**
                                     * action
                                     */
                                    onClick={() => {
                                        clickOnExpandMenu(menu.id);
                                        if (!isOpenSide) {
                                            handleClickOn();
                                            clickOnExpandMenu(menu.id, true);
                                        }
                                    }}
                                >
                                    <div className={`flex space-x-2 text-base_light`}>
                                        {menu.icon}
                                        <p
                                            className={`secondary-font truncate  font-medium ${!isOpenSide && "hidden"
                                                }`}
                                        >
                                            {menu.name}
                                        </p>
                                    </div>
                                    <BsChevronRight
                                        className={`h-auto w-3.5 duration-200 text-base_light ${menu.expand ? "rotate-90" : "rotate-0"
                                            }`}
                                    />
                                </div>
                                {menu.sub_menu && menu.expand && isOpenSide && (
                                    <div className="space-y-3 ">
                                        {menu.sub_menu.map((sub) => (
                                            <div key={sub.id} className="">
                                                <MenuItem
                                                    menu={sub}
                                                    currentPathName={pathname}
                                                    isOpenSide={isOpenSide}
                                                // colors={colors}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <MenuItem
                                key={menu.id}
                                menu={menu}
                                currentPathName={pathname}
                                isOpenSide={isOpenSide}
                            // colors={colors}
                            />
                        )}
                    </React.Fragment>
                ))}
            <div className={`absolute bottom-0 left-0 h-auto w-full ${!isOpenSide && 'scale-0'} duration-150`}>
                <div className="mx-3 border-t border-default_dark "></div>
                <div className={`flex items-center justify-center pt-2 pb-4 `}>
                    <button className="inline-block mx-auto underline body-font text-base_light hover:text-primary" onClick={handleChangeOnLogoutBox}>Logout</button>
                </div>
            </div>
        </>
    );
};

export default MenuList;
