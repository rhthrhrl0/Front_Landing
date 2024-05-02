import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const ACCESS_TOKEN = 'AccessToken';
export const REFRESH_TOKEN = 'RefreshToken';

// options에서 path를 / 로 하면 모든 페이지에서 접근 가능한 쿠키가 되도록 만든다.
export const setCookie = (name: string, value: string, options?: any) => {
    if (options !== undefined) return cookies.set(name, value, {...options})
    return cookies.set(name, value, {
        path: '/',
        secure: true,
        // httpOnly: true // 자바스크립트 코드로 접근 못하도록,  CSRF 공격 대비 가능하다고 함. 그런데, 이렇게하면 저장도 안되네..
    })
}

export const getCookie = (name: string) => {
    return cookies.get(name);
}

export const delCookie = (name: string) => {
    cookies.remove(name, {path: '/'});
};
