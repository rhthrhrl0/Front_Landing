import axios from "axios";
import {ACCESS_TOKEN, REFRESH_TOKEN, setCookie} from "./cookieUtil";

export default class AuthRepository {
    private static httpClient = axios.create({
        baseURL: 'https://deamhome.synology.me/land/',
        timeout: 5000,
    });

    static requestAuthCode = async (email: string) => {
        return this.httpClient.post("auth/mail", {
                "email": `${email}`
            },
        )
    }

    static validateAuthCode = async (email: string, authCode: string) => {
        return this.httpClient.post("auth/code", {
                "email": `${email}`,
                "authCode": `${authCode}`,
            },
        )
    }

    static requestSignup = async (id: string, pwd: string, pwdConfirm: string, userName: string, email: string,) => {
        return this.httpClient.post("user/signup", {
                "id": `${id}`,
                "pwd": `${pwd}`,
                "pwdConfirm": `${pwdConfirm}`,
                "userName": `${userName}`,
                "email": `${email}`
            },
        )
    }

    static requestLogin = async (id: string, pwd: string) => {
        return this.httpClient.post("user/login", {
                "id": `${id}`,
                "pwd": `${pwd}`,
            },
        ).then((response) => {
            setCookie(ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
            return response;
        })
    }

    static requestReissue = async (accessToken: string, refreshToken: string | null) => {
        return this.httpClient.post("user/login", {
                "accessToken": `${accessToken}`,
                "refreshToken": `${refreshToken}`
            },
        ).then((response) => {
            setCookie(ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
            return response;
        })
    }

}