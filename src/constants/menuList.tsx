import { MENU_LIST_TYPE } from "@/layouts/SideBarLayout/_type";
import { BsList } from "react-icons/bs";
import { CiMap } from "react-icons/ci";

export const MENU_LIST: MENU_LIST_TYPE[] = [
  {
    id: 1,
    name: "Map",
    path: "/map",
    icon: <CiMap />,
    expand: false,
    is_sub_menu: false,
    sub_menu: [],
  },
  {
    id: 2,
    name: "List",
    path: "/",
    icon: <BsList size={15} />,
    expand: false,
    is_sub_menu: true,
    sub_menu: [
      {
        id: 1,
        name: "Locations",
        path: "/list",
        icon: <></>,
      },
    ],
  },
];
