import React from "react";
import {Button} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const accessToken = `${window.localStorage.getItem("accessToken")}`;
    const refreshToken = `${window.localStorage.getItem("refreshToken")}`;

    const navigate = useNavigate();

    const requestBody = {
        accessToken,
        refreshToken,
    }

    const onLogoutClick = () => {
        axios.post("https://moviethree.synology.me/back/user/logout", {
            requestBody
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(function (response) {
            if (response.status === 200) {
                console.log("로그아웃 되었습니다.");
                navigate("/");
            } else {
                console.log("로그아웃 실패했습니다.");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Button type="button" onClick={onLogoutClick} variant="text">로그아웃</Button>
    );
}

export default Logout;