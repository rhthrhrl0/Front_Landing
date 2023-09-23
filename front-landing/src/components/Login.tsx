import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.scss';
import { useNavigate } from 'react-router-dom';
import PhoneBookApp from './Phone';


interface LoginForm {
    id: string;
    pwd: string;
}

const App: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginForm>({
        id: '',
        pwd: '',
    });

    const [accessToken, setAccessToken] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://moviethree.synology.me/back/user/login', formData);
            console.log('로그인성공', response.data);
            const token = response.data.accessToken;
            setAccessToken(token);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('/phonebook');
        } catch (error) {
            console.error('로그인오류:', error);
        }
    };

    return (
        <div>
            {accessToken ? (
                <PhoneBookApp  />
            ) : (
                <>
                    <header className="logintop"><h2>DeamHome</h2></header>
                    <div className="Login">

                        <h1>로그인</h1>

                        <form onSubmit={handleSubmit}>
                            <div>
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="id">ID:</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    style={{marginBottom: '10px', marginLeft: '5px'}}/>
                            </div>
                            <div className="password">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="pwd">Password:</label>
                                <input
                                    type="password"
                                    id="pwd"
                                    name="pwd"
                                    value={formData.pwd}
                                    onChange={handleChange}
                                    style={{marginBottom: '10px', marginLeft: '5px'}}/>
                            </div>
                            <button type="submit">Login</button>
                        </form>

                    </div>
                </>
            )}
        </div>
    );

};

export default App;
