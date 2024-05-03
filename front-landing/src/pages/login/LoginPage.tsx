import React, {useState} from "react";
import classNames from "classnames";
import IdPassword from "../../components/molcules/idPassword/IdPassword";
import Card from "../../components/atoms/card/Card";
import Button from "../../components/atoms/button/Button";
import AuthRepository from "../../util/AuthRepository";
import {ACCESS_TOKEN, delCookie, REFRESH_TOKEN} from "../../util/cookieUtil";
import style from "./style/LoginPage.module.scss";


interface LoginPageProps {
    className?: string;
    navigateToSignup?: () => void;
    navigateToMain?: () => void;
}

const LoginPage = ({className, navigateToSignup, navigateToMain}: LoginPageProps) => {
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

    const onLoginClick = () => {
        if (id === '') {
            setIdError(true);
            setIdErrorHelperText('id를 입력해주세요.');
            return;
        }
        if (pwd === '') {
            setPwdError(true);
            setPwdErrorHelperText('pwd를 입력해주세요.');
            return;
        }

        setIdError(false);
        setIdErrorHelperText('');
        setPwdError(false);
        setPwdErrorHelperText('');

        AuthRepository.requestLogin(id, pwd).then(response => {
            setIdError(false)
            setPwdError(false);
            setIdErrorHelperText('');
            console.log('----------');
            console.log(response.data.accessToken)
            console.log(response.data.refreshToken)
            if (window.confirm("로그인 성공! 메인 창으로 이동하겠습니까?")) {
                navigateToMain?.();
            }
        }).catch(error => {
            console.log(`로그인 실패~ ${error}`);
            alert(`로그인 실패~ ${error}`);
            delCookie(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            setIdError(true)
            setPwdError(true);
            setIdErrorHelperText('id나 비밀번호를 다시 확인해주세요.');
        });
    }

    return (
        <Card className={classNames(className, style.login)}>
            <IdPassword className={style['login__id-pwd']} idValue={id} pwdValue={pwd} onIdChange={onIdChange}
                        onPwdChange={onPwdChange}
                        idErrorHelperText={idErrorHelperText} pwdErrorHelperText={pwdErrorHelperText} idError={idError}
                        pwdError={pwdError} focusOnId={focusOnId} focusOnPwd={focusOnPwd}/>
            <Button onClick={onLoginClick}>로그인</Button>
            <Button onClick={navigateToSignup}>회원가입</Button>
        </Card>
    );
};

LoginPage.defaultProps = {
    className: style.login,
    navigateToSignup: () => {
        /** * */
    },
    navigateToMain: () => {
        /** * */
    },
}


export default LoginPage;