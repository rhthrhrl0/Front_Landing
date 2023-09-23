import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
    id: string;
    pwd: string;
    pwdConfirm: string;
    userName: string;
    email: string;
}

const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        id: '',
        pwd: '',
        pwdConfirm: '',
        userName: '',
        email: ''
    });

    const [verificationCode, setVerificationCode] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
    };

    const handleSendVerificationCode = async () => {
        try {
            const emailResponse = await axios.post('https://moviethree.synology.me/back/auth/mail', {
                email: formData.email
            });
            // eslint-disable-next-line no-console
            console.log('인증 코드 이메일 발송 성공:', emailResponse.data);
            setVerificationSent(true);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('인증 코드 이메일 발송 오류:', error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            const verifyResponse = await axios.post('https://moviethree.synology.me/back/auth/code', {
                authCode: verificationCode,
                email: formData.email
            });
            console.log('인증 코드 확인 성공:', verifyResponse.data);
        } catch (error) {
            console.error('인증 코드 확인 오류:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (verificationSent && verificationCode) {
            try {
                const response = await axios.post('https://moviethree.synology.me/back/user/signup', formData);
                // eslint-disable-next-line no-console
                console.log('회원가입 성공:', response.data);
                navigate('/login');
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('회원가입 오류:', error);
            }
        } else {
            // eslint-disable-next-line no-alert
            alert('이메일로 인증 코드를 먼저 받아주세요.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleSubmit}>
                <div className="id">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>
                        아이디:
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', marginLeft:'5px'}}
                            required
                        />
                    </label>
                </div>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>
                        비밀번호:
                        <input
                            type="password"
                            name="pwd"
                            value={formData.pwd}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', marginLeft:'5px'}}
                            required
                        />
                    </label>
                </div>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>
                        비밀번호 확인:
                        <input
                            type="password"
                            name="pwdConfirm"
                            value={formData.pwdConfirm}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', marginLeft:'5px'}}
                            required
                        />
                    </label>
                </div>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>
                        사용자 이름:
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', marginLeft:'5px'}}
                            required
                        />
                    </label>
                </div>
                <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label>
                        이메일:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ marginBottom: '10px', marginLeft:'5px'}}
                            required
                        />
                    </label>
                </div>
                {!verificationSent && (
                    <button type="button" onClick={handleSendVerificationCode}>인증 코드 받기</button>
                )}
                {verificationSent && (
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>
                            인증 코드:
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={handleVerificationCodeChange}
                                style={{ marginBottom: '10px', marginLeft:'5px'}}
                                required
                            />
                        </label>
                        <button type="button" onClick={handleVerifyCode}>인증 코드 확인</button>
                    </div>
                )}
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupForm;