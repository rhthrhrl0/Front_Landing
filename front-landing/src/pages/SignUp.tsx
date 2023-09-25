import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import {Box, InputAdornment, TextField, Button} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email'
import axios from "axios";
import FontTemplate from "../components/templates/FontTemplate";
import "../styles/_signup.scss"
import Buttons from "../components/atoms/Buttons";
import Popup from "../util/Popup";

const SignUp = () => {
    const [ID, setID] = useState<string>('');
    const [PW, setPW] = useState<string>('');
    const [pwCheck, setPWCheck] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [authCode, setAuthCode] = useState<string>('')
    const [authContent, setAuthContent] = useState<string>('인증확인')
    const [authCheck, setAuthCheck] = useState<boolean>(false)
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    const navigate = useNavigate();

    const onIDHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setID(event.target.value);
    };

    const onPWHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPW(event.target.value);
    };

    const onPWCheckHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPWCheck(event.target.value)
    };

    const onUserNameHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const onEmailHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(event.target.value)
    };

    const onAuthCodeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAuthCode(event.target.value);
    };

    const onSignUpClick = () => {
        navigate("/signup");
    };

    // rest api axios를 이용해서 메일전송 api 호출
    const onEmail = () => {
        axios.post("https://moviethree.synology.me/back/auth/mail",{
            email
        }).then(function (response){
            if(response.status === 200){
                console.log("메일을 전송했습니다.")
                setPopup({...popup, open: true, title: "Success", message: "주소 전송이 완료되었습니다."});
            }
            else{
                console.log("메일 전송이 실패했습니다.")
                setPopup({...popup, open: true, title: "Failed", message: "주소 전송이 실패했습니다."});
            }
        }).catch(function (error){
           console.log(error);
        });
    };

    // 메일전송 받은 인증코드를 api에 전송하여 인증확인
    const onAuthCode = () => {
        axios.post("https://moviethree.synology.me/back/auth/code", {
            authCode,
            email
        }).then(function (response){
            if(response.status === 200) {
                console.log("메일 인증이 성공했습니다.");
                setAuthContent("인증 완료");
                setAuthCheck(true);
            }else{
                console.log("인증에 실패했습니다.");
            }
        }).catch(function (error){
            console.log(error)
        });
    }
    
    const signupClick = () => {
        if(authCheck) {
            axios.post("https://moviethree.synology.me/back/user/signup", {
                id:ID,
                pwd:PW,
                pwdConfirm:pwCheck,
                userName,
                email
            }).then(function (response) {
                if (response.status === 200) {
                    console.log("회원가입 되었습니다.");
                    navigate("/");
                } else {
                    console.log("회원가입 실패");
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else{
            console.log("메일 인증을 해주세요.");
        }
    }

    const handleClosePopup = () => {
        setPopup({...popup, open: false})
    }

    return (
        <Box className="signUpTemplate">
            <FontTemplate
                content="회원가입"
                size={25}
                color="#000000"
                justify="center"
                direction="column"
                marginTop={15}
            />
            <Box className="signUpBox">
                <TextField className="signUpInput"
                           label="ID"
                           value={ID}
                           onChange={onIDHandler}
                           placeholder="아이디"
                           size = "small"
                           margin = "dense"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <PersonIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
            </Box>
            <Box className="signUpBox">
                <TextField className="signUpInput"
                           label="password"
                           value={PW}
                           onChange={onPWHandler}
                           placeholder="비밀번호"
                           size = "small"
                           margin = "dense"
                           type="password"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <KeyIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
            </Box>
            <Box className="signUpBox">
                <TextField className="signUpInput"
                           label="check"
                           value={pwCheck}
                           onChange={onPWCheckHandler}
                           placeholder="비밀번호 확인"
                           size = "small"
                           margin = "dense"
                           type="password"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <KeyIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
            </Box>
            <Box className="signUpBox">
                <TextField className="signUpInput"
                           label="name"
                           value={userName}
                           onChange={onUserNameHandler}
                           placeholder="유저이름을 입력해주세요."
                           size = "small"
                           margin = "dense"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <PersonIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
            </Box>
            <Box className="signUpBox">
                <TextField className="signUpInput"
                           label="email"
                           value={email}
                           onChange={onEmailHandler}
                           placeholder="이메일"
                           size = "small"
                           margin = "dense"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <EmailIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
                <Button className="signupBtn" type="button" variant="outlined" onClick={onEmail}>이메일 전송</Button>
            </Box>
            <Box className="signUpBox">
                <TextField className="signUpInput"
                           label="인증"
                           value={authCode}
                           onChange={onAuthCodeHandler}
                           placeholder="인증번호를 입력해주세요."
                           size = "small"
                           margin = "dense"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <EmailIcon/>
                                   </InputAdornment>
                               )
                           }}
                />
                <Button className="signupBtn" type="button" variant="outlined" onClick={onAuthCode}>{authContent}</Button>
            </Box>
            <Box className="signUpBox">
                <Buttons content="회원가입" onClick={signupClick}/>
            </Box>

            <Popup open={popup.open} setPopup={handleClosePopup} message={popup.message} title={popup.title}/>
        </Box>
    );
};
export default SignUp;