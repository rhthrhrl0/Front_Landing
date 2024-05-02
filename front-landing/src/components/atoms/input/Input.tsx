import React, {useMemo} from "react";
import {InputAdornment, TextField} from "@mui/material";
import classNames from "classnames";
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
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
    helperText?: string;
    disabled?: boolean;
    endItem?: React.ReactNode;
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
                   error,
                   helperText,
                   disabled,
                   endItem
               }: InputProps) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const end: undefined | React.ReactNode = useMemo(() => {
        if (endItem !== undefined) {
            return <InputAdornment
                position="end"
                sx={{padding: "27.5px 14px"}}
            >
                {endItem}
            </InputAdornment>
        }
        if (type === 'password') {
            return <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
            </InputAdornment>
        }
        return undefined;
    }, [endItem, showPassword])

    const inputType: undefined | string = useMemo(() => {
        if (type === 'password') {
            if (showPassword) return 'text';
            return 'password';
        }
        return type;
    }, [type, showPassword])


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
        type={inputType}
        multiline={multiline}
        fullWidth={fullWidth}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        disabled={disabled}
        InputProps={{
            endAdornment: end,
        }}
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
    error: false,
    helperText: '',
    disabled: false,
    endItem: undefined
}

export default Input;