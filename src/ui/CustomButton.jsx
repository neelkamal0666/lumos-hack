import React from "react";
import { useSelector } from "react-redux";

function CustomButton({ onClick, child, type, className, primary, ...props }) {
    const appCtx = useSelector((state) => state.app);
    const dark = appCtx.isDarkMode;
    const iconColorStyle = localStorage.getItem('iconColor');
    return (
        <button
            {...props}
            onClick={onClick}
            type={type}
            style={{border:`2px solid ${iconColorStyle}`}}
            className={`rounded-full py-2 px-4 ease-in-out duration-300 ${className} ${
                primary
                    ? " text-lime-500 border-none  hover:bg-lime-500 hover:text-black"
                    : "   border border-yellow-400 hover:bg-black hover:text-white"
            } ${dark?'':'bg-black text-white hover:text-lime-300'}`}
        >
            {child}
            {props.children}
        </button>
    );
}

export default CustomButton;
