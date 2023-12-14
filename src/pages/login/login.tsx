'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username === 'user' && password === 'password') {
            onLoginSuccess();

            router.push('/main');
        } else {
            setError('Kullanıcı adı veya şifre hatalı');
        }
    };

    const redirectToMain = () => {

        router.push('/main');
    };

    return (
        <div>
            <h1>Login Page</h1>
            <div>
                <label>
                    Kullanıcı Adı:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Şifre:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <button onClick={handleLogin}>Giriş Yap</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={redirectToMain}>Ana Sayfaya Git</button>
        </div>
    );
};

export default Login;
