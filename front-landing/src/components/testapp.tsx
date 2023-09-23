import React from 'react';
import SignupForm from '../components/SignUp';
import './styles/Signup.scss';

const App: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="App">
                <h1>회원가입 페이지</h1>

                <SignupForm />
            </div>
        </div>
    );
};

export default App;