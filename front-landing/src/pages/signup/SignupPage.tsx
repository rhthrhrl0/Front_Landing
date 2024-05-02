import React, {useEffect, useState} from "react";
import classNames from "classnames";
import IdPassword from "../../components/molcules/idPassword/IdPassword";
import EmailCertification from "../../components/molcules/emailCertification/EmailCertification";
import EmailConfirm from "../../components/molcules/emailConfirm/EmailConfirm";
import {httpClient} from "../../util/network";
import style from "./style/SignupPage.module.scss";

interface SignupPageProps {
    className?: string;
}

const SignupPage = ({className}: SignupPageProps) => {
    // EmailConfirm
    const [remainTime, setRemainTime] = useState<undefined | number>(undefined);
    const [confirmValue, setConfirmValue] = useState('');
    const onConfirmValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setConfirmValue(e.target.value)
    }
    const [disabled, setDisabled] = useState(false);
    const [emailAuthError, setEmailAuthError] = useState(false);
    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        httpClient.post("auth/code", {
                "email": `${emailValue}`,
                "authCode": `${confirmValue}`,
            },
        ).then(response => {
            alert('됐어요~')
            setDisabled(true)
            setRemainTime(undefined);
            setEmailAuthError(false);
        }).catch(error => {
            console.log(`이메일 인증 실패~ ${error}`);
            alert(`이메일 인증 실패~ ${error}`);
            setEmailAuthError(true);
        });
    }

    // 타이머 기능
    useEffect(() => {
        const Counter = setInterval(() => {
            console.log(`남은 시간: ${remainTime}`)
            if (remainTime === undefined) {
                /** * */
            } else if (remainTime === 0) {
                alert('시간초과');
                setEmailDisabled(false);
                setRemainTime(undefined);
            } else {
                setRemainTime(remainTime - 1);
            }
        }, 1000)
        return () => clearInterval(Counter); // 등록했던 타이머를 지움.
    }, [remainTime])

    // IdPassword
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [idError, setIdError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [idErrorHelperText, setIdErrorHelperText] = useState('');
    const [pwdErrorHelperText, setPwdErrorHelperText] = useState('');
    const [focusOnId, setFocusOnId] = useState(true);
    const [focusOnPwd, setFocusOnPwd] = useState(false);

    const onIdChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setId(e.target.value)
    }
    const onPwdChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setPwd(e.target.value)
    }

    // EmailCertification
    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorHelperText, setEmailErrorHelperText] = useState('');
    const [emailDisabled, setEmailDisabled] = useState(false);
    const onEmailChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setEmailValue(e.target.value);
    }
    const emailSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        httpClient.post("auth/mail", {
                "email": `${emailValue}`
            },
        ).then(response => {
            alert('됐어요~');
            setEmailDisabled(true);
            setEmailError(false);
            setRemainTime(180);
        }).catch(error => {
            if (error.response !== undefined && error.response.data.code === "ALREADY_SEND_CODE") {
                alert('최근에 이미 보낸 적이 있네요. 어서 하세요~');
                setEmailDisabled(true);
                setEmailError(false);
                setRemainTime(180);
            } else {
                alert(`이메일 요청 실패~ ${error}`);
                setEmailError(true);
                setRemainTime(undefined);
            }
        });
    }

    return <div className={classNames(className, style['sign-up-page'])}>
        <IdPassword idValue={id} pwdValue={pwd} onIdChange={onIdChange} onPwdChange={onPwdChange}
                    idErrorHelperText={idErrorHelperText} pwdErrorHelperText={pwdErrorHelperText} idError={idError}
                    pwdError={pwdError} focusOnId={focusOnId} focusOnPwd={focusOnPwd}/>
        <EmailCertification emailValue={emailValue} error={emailError} emailErrorHelperText={emailErrorHelperText}
                            onEmailChange={onEmailChange} onSubmit={emailSubmit} disabled={emailDisabled}/>
        <EmailConfirm onSubmit={onSubmit} confirmValue={confirmValue} disabled={disabled}
                      onConfirmValueChange={onConfirmValueChange} remainTime={remainTime} error={emailAuthError}/>
    </div>
};

SignupPage.defaultProps = {
    className: style['sign-up-page']
}

export default SignupPage;