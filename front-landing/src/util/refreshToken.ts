import AuthRepository from "./AuthRepository";
import {getCookie} from "./cookieUtil";

const onSilentRefresh = () => {
    console.log('refresh 실행됨');
    const accessToken = getCookie('AccessToken');
    const refreshToken = localStorage.getItem('RefreshToken');
    AuthRepository.requestReissue(accessToken, refreshToken).then((res) => {
        // 근데 지금 토큰 재발급해주고 있는건 맞는건가...?
        console.log(res);
    }).catch((error) => {
        clearTimeout(periodRefresh());
        alert('다시 로그인해주세요.');
    });

    // 이건 비동기로 토큰 갱신하다가 사용자가 아직 응답 안왔는데 페이지 갱신 시도한 경우를 대비한것이 맞나?
    if (performance.navigation.type === 1) {
        onSilentRefresh();
    }
}

export const periodRefresh = () => setTimeout(onSilentRefresh, 2 * 60 * 60 * 1000);