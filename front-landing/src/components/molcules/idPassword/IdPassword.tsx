import React from "react";
import classNames from "classnames";
import Input from "../../atoms/input/Input";
import style from "./style/IdPassword.module.scss";

interface IdPasswordProps {
    className?: string;
    idValue?: string;
    pwdValue?: string;
    onIdChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onPwdChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    idError?: boolean,
    pwdError?: boolean,
    focusOnId?: boolean,
    focusOnPwd?: boolean,
    variant?: 'filled' | 'outlined' | 'standard';
}

const IdPassword = ({
                        className,
                        idValue,
                        pwdValue,
                        onIdChange,
                        onPwdChange,
                        idError,
                        pwdError,
                        focusOnId,
                        focusOnPwd,
                        variant
                    }: IdPasswordProps) => {
    return <div className={classNames(className, style['id-password'])}>
        <Input className={style['id-password__id']} label="아이디" placeholder="아이디를 입력해주세요" value={idValue}
               onChange={onIdChange} error={idError} autoFocus={focusOnId} variant={variant}/>
        <Input className={style['id-password__password']} label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password"
               value={pwdValue}
               onChange={onPwdChange} error={pwdError} autoFocus={focusOnPwd} variant={variant}/>
    </div>
}

IdPassword.defaultProps = {
    className: style.idPassword,
    idValue: '',
    pwdValue: '',
    idError: false,
    pwdError: false,
    focusOnId: false,
    focusOnPwd: false,
    variant: 'outlined'
}

export default IdPassword;