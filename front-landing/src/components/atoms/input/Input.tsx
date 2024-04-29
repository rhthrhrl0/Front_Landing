import React from "react";
import {TextField} from "@mui/material";
import classNames from "classnames";
import style from './style/Input.module.scss';

interface InputProps {
    className?: string | undefined;
    label?: string;
    maxRows?: string | number | undefined;
    autoFocus?: boolean | undefined;
    multiline?: boolean | undefined;
    name?: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    rows?: string | number | undefined;
    type?: React.HTMLInputTypeAttribute | undefined; // 스크롤 단위 줄수
    value?: unknown; // 정말 말그대로 최대 줄수
    variant?: 'filled' | 'outlined' | 'standard'; // 이게 참이면, input 대신 textArea 엘리먼트가 대신 렌더링 된다고 함.
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
                   variant
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
    />;
}

Input.defaultProps = {
    name: undefined,
    className: `${style.input}`,
    autoFocus: false,
    label: undefined,
    variant: 'outlined',
    type: 'text',
    value: '',
    onChange: undefined,
    rows: 1,
    maxRows: 1,
    multiline: false
}

export default Input;