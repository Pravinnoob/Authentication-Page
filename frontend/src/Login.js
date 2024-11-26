import React, { useState } from 'react';
import './App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Login successful!');
                // Redirect to dashboard or perform other actions
            } else {
                setMessage(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} style={{"width":"100%","display":"flex","flexDirection":"column","alignItems":"center","gap":"10px"}}>
                <div style={{"display":"flex","gap":"15px","flexDirection":"column","alignItems":"center", "mb": "20%"}}>
                    <h1>Welcome Back!</h1>
                    <p>Please Login Here</p>
                </div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" style={{"boxShadow":"2px 2px 15px rgb(50, 173, 250) "}}>Login</button>
            {message && <p>{message}</p>}
        </form >
        <div style={{"position":"relative","width":"100%","height":"1px"}}></div>
        </>
    );
};

export default Login;
