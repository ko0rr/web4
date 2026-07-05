import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../api/authApi";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useErrorVisibility } from "../../utils/hooks";

export const RegistrationPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
    const navigate = useNavigate();
    const showError = useErrorVisibility(error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ username, password }).unwrap();
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="flex align-items-center justify-content-center min-h-screen" style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
            <div className="card p-4 shadow-4" style={{ width: '380px', borderRadius: '15px', background: '#fff' }}>
                <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: '800' }}>Регистрация</h2>
                <form onSubmit={handleSubmit} className="p-fluid">

                    <div className="field mb-4">
                        <label htmlFor="username" className="block mb-2 font-bold" style={{ color: '#4a5568', fontSize: '14px', textTransform: 'uppercase' }}>
                            Придумайте логин
                        </label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Логин (мин. 3 символа)"
                            required
                        />
                    </div>

                    <div className="field mb-4">
                        <label htmlFor="password" className="block mb-2 font-bold" style={{ color: '#4a5568', fontSize: '14px', textTransform: 'uppercase' }}>
                            Пароль
                        </label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            placeholder="Придумайте пароль"
                            required
                            inputStyle={{ width: '100%' }}
                        />
                    </div>

                    {isSuccess && <Message severity="success" text="Успешно! Перенаправление..." className="mb-3" />}
                    {showError && <Message severity="error" text="Логин уже занят или данные неверны" className="mb-3" />}

                    <Button type="submit" label="Создать аккаунт" loading={isLoading} className="p-button-success w-full" style={{ padding: '12px' }} />
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" style={{ color: '#718096', textDecoration: 'none', fontSize: '14px' }}>Вернуться ко входу</Link>
                </div>
            </div>
        </div>
    );
};