import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../slice/authSlice";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useErrorVisibility } from "../../utils/hooks";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const showError = useErrorVisibility(error);

    useEffect(() => {
        if (isAuthenticated) navigate("/main");
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password }).unwrap();
        } catch (err) {
            console.error("Failed to login:", err);
        }
    };

    return (
        <div className="flex align-items-center justify-content-center min-h-screen" style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
            <div className="card p-4 shadow-4" style={{ width: '380px', borderRadius: '15px', background: '#fff' }}>
                <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: '800' }}>Вход</h2>
                <form onSubmit={handleSubmit} className="p-fluid">
                    {/* Логин */}
                    <div className="field mb-4">
                        <label htmlFor="username" className="block mb-2 font-bold" style={{ color: '#4a5568', fontSize: '14px', textTransform: 'uppercase' }}>
                            Логин
                        </label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите ваш логин"
                            required
                        />
                    </div>

                    {/* Пароль */}
                    <div className="field mb-4">
                        <label htmlFor="password" className="block mb-2 font-bold" style={{ color: '#4a5568', fontSize: '14px', textTransform: 'uppercase' }}>
                            Пароль
                        </label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                            placeholder="Введите пароль"
                            required
                            inputStyle={{ width: '100%' }}
                        />
                    </div>

                    {showError && <Message severity="error" text="Ошибка входа. Проверьте данные." className="mb-3" />}

                    <Button type="submit" label="Войти" loading={isLoading} className="p-button-raised w-full" style={{ background: '#667eea', border: 'none', padding: '12px' }} />
                </form>

                <div className="mt-4 text-center">
                    <span style={{ color: '#718096' }}>Нет аккаунта? </span>
                    <Link to="/register" style={{ color: '#667eea', fontWeight: 'bold', textDecoration: 'none' }}>Регистрация</Link>
                </div>
            </div>
        </div>
    );
};