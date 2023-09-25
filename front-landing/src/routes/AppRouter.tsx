import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import LoginUserPage from "../pages/LoginUserPage";

export const AppRouter = () => {
	return(
		<Routes>
			<Route path='/' element={<Login/>}/>
			<Route path='/signup' element={<SignUp/>}/>
			<Route path='/user' element={<LoginUserPage/>}/>
		</Routes>
	);
}
