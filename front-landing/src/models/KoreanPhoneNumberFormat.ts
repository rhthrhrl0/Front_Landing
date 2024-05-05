export const detectKoreanPhoneNumber = (input: string): boolean => {
    // 한국형 전화번호 패턴
    const koreanPhoneNumberPattern = /^(01[0-9]{1}-[0-9]{3,4}-[0-9]{4}|02-[0-9]{3,4}-[0-9]{4})$/;

    // 입력된 문자열이 패턴과 일치하는지 여부를 반환
    return koreanPhoneNumberPattern.test(input);
};