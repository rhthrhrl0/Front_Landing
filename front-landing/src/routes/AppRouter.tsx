import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {ApolloProvider} from "@apollo/react-hooks";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import MainPage from "../pages/main/MainPage";
import {AddressRepository} from "../util/AddressRepository";

export const AppRouter = () => {
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup')
    }
    const navigateToMain = () => {
        navigate('/main')
    }

    return <ApolloProvider client={AddressRepository.client}>
        <Routes>
            <Route path="/" element={<LoginPage navigateToSignup={navigateToSignup} navigateToMain={navigateToMain}/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/main/*" element={<MainPage/>}/>
        </Routes>
    </ApolloProvider>;
}
