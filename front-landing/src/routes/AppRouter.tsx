import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import MainPage from "../pages/main/MainPage";

export const AppRouter = () => {
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup')
    }
    const navigateToMain = () => {
        navigate('/main')
    }

    return <Routes>
        <Route path="/" element={<LoginPage navigateToSignup={navigateToSignup} navigateToMain={navigateToMain} />}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/main/*" element={<MainPage/>}/>
    </Routes>;
}
