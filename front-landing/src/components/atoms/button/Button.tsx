import React from "react";
import MuiButton from "@mui/material/Button";
import classNames from "classnames";
import style from "./style/Button.module.scss";

interface ButtonProps {
    className?: string | undefined;
    variant?: 'text' | 'contained' | 'outlined';
    disabled?: boolean;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large',
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children?: React.ReactNode;
}

const Button = ({
                    className,
                    variant,
                    disabled,
                    fullWidth,
                    size,
                    children,
                    onClick,
                }: ButtonProps) => {
    return <MuiButton
        className={classNames(className, style.button)}
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
    >
        {children}
    </MuiButton>
}

Button.defaultProps = {
    className: style.button,
    variant: 'contained',
    disabled: false,
    fullWidth: false,
    size: 'medium',
    onClick: () => {/** * */},
}

export default Button;