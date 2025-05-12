import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen ps-3  w-full bg-default_light light overflow-auto ">
            {children}
        </div>
    );
};

export default MainLayout;
