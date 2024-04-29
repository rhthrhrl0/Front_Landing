import React, {useMemo} from "react";
import classNames from "classnames";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Divider from "../../atoms/divider/Divider";
import style from "./style/EmailCertification.module.scss";

interface EmailCertificationProps {
    className?: string;
    inputVariant?: 'filled' | 'outlined' | 'standard';
    submitButtonVariant?: 'text' | 'contained' | 'outlined';
    emailValue?: string;
    onEmailChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onSubmit?: React.MouseEventHandler<HTMLButtonElement>,
    error?: boolean,
    emailErrorHelperText?: string
}

// 이메일 입력하고 인증 메일 요청 전송을 하는 몰큘
const EmailCertification = ({
                                className,
                                inputVariant,
                                submitButtonVariant,
                                emailValue,
                                onEmailChange,
                                onSubmit,
                                error,
                                emailErrorHelperText
                            }: EmailCertificationProps) => {
    const errorMessage = useMemo(() => {
        if (error) return emailErrorHelperText
        return ''
    }, [error])
    return <div className={classNames(className, style['email-certification'])}>
        <Input className={style['email-certification__email']} variant={inputVariant} label="이메일" value={emailValue}
               onChange={onEmailChange} error={error} helperText={errorMessage}/>
        <Button className={style['email-certification__submit-button']} variant={submitButtonVariant}
                onClick={onSubmit}>이메일 인증</Button>
        <Divider/>
    </div>
}

EmailCertification.defaultProps = {
    className: style['email-certification'],
    inputVariant: 'outlined',
    submitButtonVariant: 'contained',
    emailValue: '',
    onEmailChange: () => { /** * */
    },
    onSubmit: () => { /** * */
    },
    error: false,
    emailErrorHelperText: '이미 등록된 이메일이거나 메일형식을 다시 확인해주세요.'
}

export default EmailCertification;