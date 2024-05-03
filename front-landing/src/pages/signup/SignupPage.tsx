import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
import IdPassword from "../../components/molcules/idPassword/IdPassword";
import EmailCertification from "../../components/molcules/emailCertification/EmailCertification";
import EmailConfirm from "../../components/molcules/emailConfirm/EmailConfirm";
import AuthRepository from "../../util/AuthRepository";
import Card from "../../components/atoms/card/Card";
import Input from "../../components/atoms/input/Input";
import Divider from "../../components/atoms/divider/Divider";
import Button from "../../components/atoms/button/Button";
import style from "./style/SignupPage.module.scss";

interface SignupPageProps {
    className?: string;
}

const SignupPage = ({className}: SignupPageProps) => {
    // navigate
    const navigate = useNavigate();

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

    // pwdConfirm
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [pwdConfirmError, setPwdConfirmError] = useState(false);
    const [pwdConfirmHelperText, setPwdConfirmHelperText] = useState('');
    const onPwdConfirmChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setPwdConfirm(e.target.value)
    }

    // EmailCertification
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorHelperText, setEmailErrorHelperText] = useState('');
    const [emailDisabled, setEmailDisabled] = useState(false);
    const onEmailChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setEmail(e.target.value);
    }
    const emailSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        AuthRepository.requestAuthCode(email).then(response => {
            alert('됐어요~');
            setEmailDisabled(true);
            setEmailError(false);
            setEmailErrorHelperText('');
            setRemainTime(180);
        }).catch(error => {
            if (error.response !== undefined && error.response.data.code === "ALREADY_SEND_CODE") {
                alert('최근에 이미 보낸 적이 있네요. 어서 하세요~');
                setEmailDisabled(true);
                setEmailError(false);
                setEmailErrorHelperText('');
                setRemainTime(180);
            } else {
                alert(`이메일 요청 실패~ ${error}`);
                setEmailError(true);
                setEmailErrorHelperText('요청에 실패했습니다.');
                setRemainTime(undefined);
            }
        });
    }

    // EmailConfirm
    const [remainTime, setRemainTime] = useState<undefined | number>(undefined);
    const [authCode, setAuthCode] = useState('');
    const onAuthCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setAuthCode(e.target.value)
    }
    const [AuthCodeDisabled, setAuthCodeDisabled] = useState(false);
    const [authCodeError, setAuthCodeError] = useState(false);
    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        AuthRepository.validateAuthCode(email, authCode).then(response => {
            alert('됐어요~')
            setAuthCodeDisabled(true)
            setRemainTime(undefined);
            setAuthCodeError(false);
        }).catch(error => {
            console.log(`이메일 인증 실패~ ${error}`);
            alert(`이메일 인증 실패~ ${error}`);
            setAuthCodeError(true);
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

    // 이름
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [userNameHelperText, setUserNameHelperText] = useState('');
    const onUserNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setUserName(e.target.value)
    }

    // 회원가입 버튼
    const onSignUpClick = () => {
        const isSamePwd: boolean = (pwd === pwdConfirm);
        if (!isSamePwd) {
            setPwdConfirmError(true);
            setPwdConfirmHelperText('비밀번호를 재확인해주세요');
            return;
        }
        setPwdConfirmError(false);
        setPwdConfirmHelperText('');
        AuthRepository.requestSignup(id, pwd, pwdConfirm, userName, email).then(response => {
            setIdError(false)
            if (window.confirm("회원가입 성공! 로그인 창으로 이동하시겠습니까?")) {
                navigate(-1)
            }
        }).catch(error => {
            console.log(`회원가입 실패~ ${error}`);
            alert(`회원가입 실패~ ${error}`);
            setIdError(false)
        });
    }

    return <Card className={classNames(className, style['sign-up-page'])}>
        <IdPassword className={style['sign-up-page__id-pwd']} idValue={id} pwdValue={pwd} onIdChange={onIdChange}
                    onPwdChange={onPwdChange}
                    idErrorHelperText={idErrorHelperText} pwdErrorHelperText={pwdErrorHelperText} idError={idError}
                    pwdError={pwdError} focusOnId={focusOnId} focusOnPwd={focusOnPwd}/>
        <Input label="비밀번호 확인" value={pwdConfirm} error={pwdConfirmError} helperText={pwdConfirmHelperText}
               onChange={onPwdConfirmChange} type="password"/>
        <Divider/>
        <EmailCertification className={style['sign-up-page__email-certification']} emailValue={email} error={emailError}
                            emailErrorHelperText={emailErrorHelperText}
                            onEmailChange={onEmailChange} onSubmit={emailSubmit} disabled={emailDisabled}/>
        <EmailConfirm className={style['sign-up-page__email-confirm']} onSubmit={onSubmit} confirmValue={authCode}
                      disabled={AuthCodeDisabled}
                      onConfirmValueChange={onAuthCodeChange} remainTime={remainTime} error={authCodeError}/>
        <Divider/>
        <Input label="이름" value={userName} onChange={onUserNameChange} error={userNameError}
               helperText={userNameHelperText}/>
        <Divider/>
        <Button size='large' variant='outlined' onClick={onSignUpClick}>회원가입</Button>
    </Card>
};

SignupPage.defaultProps = {
    className: style['sign-up-page']
}

export default SignupPage;