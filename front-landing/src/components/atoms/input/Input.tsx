import React from "react";
import {TextField} from "@mui/material";
import classNames from "classnames";
import style from './style/Input.module.scss';

interface InputProps {
    className?: string;
    label?: string;
    maxRows?: string | number;
    autoFocus?: boolean;
    multiline?: boolean;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    rows?: string | number;
    type?: React.HTMLInputTypeAttribute; // 스크롤 단위 줄수
    value?: unknown; // 정말 말그대로 최대 줄수
    variant?: 'filled' | 'outlined' | 'standard'; // 이게 참이면, input 대신 textArea 엘리먼트가 대신 렌더링 된다고 함.
    fullWidth?: boolean;
    placeholder?: string;
    error?: boolean;
}

const Input = ({
                   className,
                   label,
                   maxRows,
                   autoFocus,
                   multiline,
                   name,
                   onChange,
                   rows,
                   type,
                   value,
                   variant,
                   fullWidth,
                   placeholder,
                   error
               }: InputProps) => {
    return <TextField
        name={name}
        className={classNames(className, style.input)} // esLint에서는 dot 접근을 권유함.
        label={label}
        variant={variant}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        rows={rows}
        maxRows={maxRows}
        type={type}
        multiline={multiline}
        fullWidth={fullWidth}
        placeholder={placeholder}
        error={error}
    />;
}

Input.defaultProps = {
    name: undefined,
    className: `${style.input}`,
    autoFocus: false,
    label: undefined,
    variant: "outlined",
    type: 'text',
    value: '',
    onChange: undefined,
    rows: 1,
    maxRows: 1,
    multiline: false,
    fullWidth: false,
    placeholder: '',
    error: false
}

export default Input;