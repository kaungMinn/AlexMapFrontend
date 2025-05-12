import React from "react";

interface TooltipType {
    children: React.ReactNode;
    position: string;
    tooltipLabel: string;
}

const Tooltip: React.FC<TooltipType> = ({
    children,
    position,
    tooltipLabel,
}) => {
    if (position === "bottom")
        return (
            <div
                className="text-[10px] relative before:invisible before:absolute before:left-1/2 before:-bottom-3 before:z-10 before:w-max before:max-w-xs before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:bg-gray-800 before:px-2 before:py-1.5 before:text-white before:content-[attr(data-tip)] after:invisible after:absolute after:left-1/2 after:-bottom-3 after:z-10 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-b-gray-800 after:border-l-transparent after:border-t-transparent after:border-r-transparent hover:before:visible hover:after:visible"
                data-tip={tooltipLabel}
            >
                {children}
            </div>
        );

    if (position === "top")
        return (
            <div
                className="text-[10px] relative before:invisible before:absolute before:left-1/2 before:-top-3 before:z-10 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-800 before:px-2 before:py-1.5 before:text-white before:content-[attr(data-tip)] after:invisible after:absolute after:left-1/2 after:-top-3 after:z-10 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-800 after:border-l-transparent after:border-b-transparent after:border-r-transparent hover:before:visible hover:after:visible"
                data-tip={tooltipLabel}
            >
                {children}
            </div>
        );

    if (position === "right")
        return (
            <div
                className="text-[10px] relative before:invisible before:absolute before:-right-3 before:top-1/2 before:z-10 before:w-max before:max-w-xs before:translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-800 before:px-3 before:py-3 before:text-white before:content-[attr(data-tip)] after:invisible after:absolute after:-right-[0.8rem] after:top-1/2 after:z-10 after:h-0 after:w-0 after:translate-x-0 after:-translate-y-1/2 after:border-8 after:border-r-gray-800 after:border-l-transparent after:border-b-transparent after:border-t-transparent hover:before:visible hover:after:visible"
                data-tip={tooltipLabel}
            >
                {children}
            </div>
        );

    if (position === "left")
        return (
            <div
                className=" text-[10px] relative before:invisible before:absolute before:-left-3 before:top-1/2 before:z-10 before:w-max before:max-w-xs before:-translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-800 before:px-3 before:py-3 before:text-white before:content-[attr(data-tip)] after:invisible after:absolute after:-left-[0.8rem] after:top-1/2 after:z-10 after:h-0 after:w-0 after:translate-x-0 after:-translate-y-1/2 after:border-8 after:border-l-gray-800 after:border-r-transparent after:border-b-transparent after:border-t-transparent hover:before:visible hover:after:visible"
                data-tip={tooltipLabel}
            >
                {children}
            </div>
        );

    return null;
};

export default Tooltip;
