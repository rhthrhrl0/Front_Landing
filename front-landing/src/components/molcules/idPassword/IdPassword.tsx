import React, {useMemo} from "react";
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
    idErrorHelperText?: string,
    pwdErrorHelperText?: string
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
                        idErrorHelperText,
                        pwdErrorHelperText,
                        focusOnId,
                        focusOnPwd,
                        variant
                    }: IdPasswordProps) => {
    const idErrorMessage = useMemo(() => {
        if (idError) return idErrorHelperText
        return ''
    }, [idError])
    const pwdErrorMessage = useMemo(() => {
        if (pwdError) return pwdErrorHelperText
        return ''
    }, [pwdError])
    return <div className={classNames(className, style['id-password'])}>
        <Input className={style['id-password__id']} label="아이디" placeholder="아이디를 입력해주세요" value={idValue}
               onChange={onIdChange} error={idError} helperText={idErrorMessage} autoFocus={focusOnId}
               variant={variant}/>
        <Input className={style['id-password__password']} label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password"
               value={pwdValue}
               onChange={onPwdChange} error={pwdError} helperText={pwdErrorMessage} autoFocus={focusOnPwd}
               variant={variant}/>
    </div>
}

IdPassword.defaultProps = {
    className: style.idPassword,
    idValue: '',
    pwdValue: '',
    idError: false,
    pwdError: false,
    idErrorHelperText: '등록되지 않은 아이디입니다.',
    pwdErrorHelperText: '비밀번호를 다시 확인해주세요.',
    focusOnId: false,
    focusOnPwd: false,
    variant: 'outlined',
    onIdChange: () => {/** * */
    },
    onPwdChange: () => {/** * */
    },
}

export default IdPassword;