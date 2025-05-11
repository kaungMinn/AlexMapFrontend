import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth"
import { LOGIN_ROUTE, MAP_ROUTE } from "./constants/routePaths";
import { PROTECTED_ROUTE_LIST, PUBLIC_ROUTE, UNPROTECTED_ROUTE_LIST } from "./constants/routeLists";
import { Suspense } from "react";
import LoadingIcon from "./icons/animatedIcons/LoadingIcon";
import AuthLayout from "./layouts/AuthLayout";
import SideBarLayout from "./layouts/SideBarLayout";
import MainLayout from "./layouts/MainLayout";

const ProtectedOutlet = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />
}

const UnprotectedOutlet = () => {
    const isAuth = useAuth();
    return isAuth ? <Navigate to={MAP_ROUTE} /> : <Outlet />
}

export const Router = () => {

    return (
        <div>
            <Routes>
                {
                    PUBLIC_ROUTE.map(route => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))
                }

                <Route element={<UnprotectedOutlet />}>
                    <Route element={<AuthLayout />}>
                        {
                            UNPROTECTED_ROUTE_LIST.map((route) => (
                                <Route key={route.path} path={route.path} element={route.element} />
                            ))
                        }
                    </Route>
                </Route>

                <Route element={<ProtectedOutlet />}>
                    <Route element={<SideBarLayout />}>
                        {
                            PROTECTED_ROUTE_LIST.map(route => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Suspense
                                            fallback={
                                                <div className="flex h-full w-full items-center justify-center bg-default_light">
                                                    <div className="w-[20rem]">
                                                        <LoadingIcon />
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <MainLayout>{route.element}</MainLayout>
                                        </Suspense>
                                    }
                                />
                            ))
                        }
                    </Route>
                </Route>
            </Routes>


        </div>
    )
}