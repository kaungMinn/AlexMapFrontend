import { lazy } from "react";
import { INSTALLATION, LIST_ROUTE, LOGIN_ROUTE, MAP_ROUTE, NOT_MATCH_ROUTE, REGISTER_ROUTE, ROOT_ROUTE } from "./routePaths";
import { Navigate } from "react-router-dom";
import NotMatch from "@/pages/NotMatch";

export const PUBLIC_ROUTE = [
    {
        path: NOT_MATCH_ROUTE,
        element: <NotMatch />
    }
]

//UNPROTECTED
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));

export const UNPROTECTED_ROUTE_LIST = [
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
    {
        path: REGISTER_ROUTE,
        element: <Register />
    },
    {
        path: ROOT_ROUTE,
        element: <Navigate to={LOGIN_ROUTE} />
    }
];

//PROTECTED
const Map = lazy(() => import("@/pages/Map"));
const Installation = lazy(() => import('@/pages/Installation'));
const List = lazy(() => import("@/pages/List/NodeList"));

export const PROTECTED_ROUTE_LIST = [
    {
        path: MAP_ROUTE,
        element: <Map />
    },
    {
        path: LIST_ROUTE,
        element: <List />
    },
    {
        path: INSTALLATION,
        element: <Installation />
    }
]