import { useState } from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {

        if (username === 'user' && password === 'password') {

            router.push('/');
        } else {
            setError('Kullanıcı adı veya şifre hatalı');
        }
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
        </div>
    );
};

export default Login;
