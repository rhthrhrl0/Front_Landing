import React from 'react';
import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import MainPage from "../pages/main/MainPage";

export const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/main/*" element={<MainPage/>}/>
    </Routes>;
}
