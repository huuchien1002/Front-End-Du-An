import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_BASE_URL from './apiConfig'; 

const Register = ({ isOpen, onClose, openModalLogin }) => {
    const { login, updateUserData } = useAuth();
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value.toLowerCase());
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUsernameBlur = () => {
        if (!username) {
            setUsernameError('Tên đăng nhập không được bỏ trống');
        } else if (!/^[a-z0-9]+$/.test(username)) {
            setUsernameError('Tên đăng nhập chỉ được chứa ký tự thường và số');
        } else {
            setUsernameError('');
        }
    };
    const handlePhoneBlur = () => {
        if (!phone || !/^\d{10,11}$/.test(phone)) {
            setPhoneError('Số điện thoại không hợp lệ');
        } else {
            setPhoneError('');
        }
    };
    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError('Mật khẩu không được bỏ trống');
        } else if (!/^[a-z0-9]+$/.test(password)) {
            setPasswordError('Mật khẩu chỉ được chứa ký tự thường và số');
        } else if (password.length < 2) {
            setPasswordError('Mật khẩu phải có ít nhất 2 ký tự');
        } else if (password.length > 20) {
            setPasswordError('Tối đa 20 kí tự');
        } else {
            setPasswordError('');
        }
    };
    const handleConfirmPasswordBlur = () => {
        if (!confirmPassword) {
            setConfirmPasswordError('Nhập lại mật khẩu không được bỏ trống');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu xác nhận không khớp');
        } else if (!/^[a-z0-9]+$/.test(password)) {
            setPasswordError('Mật khẩu chỉ được chứa ký tự thường và số');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleLoginAfterRegister = async () => {
        try {
            const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const loginData = await loginResponse.json();
            if (loginResponse.ok) {
                login(loginData.username, loginData.token);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('username', loginData.username);
                updateUserData();
                onClose();
            } else {
                setError(loginData.error);
            }
        } catch (error) {
            console.error('Login after register error:', error);
            setError('Đã xảy ra lỗi trong quá trình đăng nhập sau khi đăng ký. Vui lòng thử lại sau.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !phone || !password || !confirmPassword || usernameError || phoneError || passwordError || confirmPasswordError) {
            setError('Vui lòng điền đầy đủ thông tin và sửa các lỗi được hiển thị.');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, phone, password })
            });

            const data = await response.json();
            if (response.ok) {
                await handleLoginAfterRegister();
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Register error:', error);
            setError('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.');
        }
    };


    const handleClickOutside = (event) => {
        if (!event.target.closest('.modal-dialog')) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.removeEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {isOpen && <div className="modal-backdrop fade show"></div>}
            <div className={`modal ${isOpen ? 'show' : ''}`}>
                <div className="modal-dialog" onClick={handleClickOutside}>
                    <div className="modal-content">
                        <div className="my-2">
                            <div className="text-center">
                                <Link to="/home">
                                    <img className="logo" alt="Logo" src="/images/logo.gif" style={{ maxWidth: "50%" }} />
                                </Link>
                            </div>
                        </div>
                        <form className='py-3 mx-3' onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            <div className="mb-2">
                                <label className="fw-semibold name-input align-self-start">Tên đăng nhập</label>
                                <div className="input-group">
                                    <input 
                                        className='form-control form-control-solid' 
                                        type="text" 
                                        placeholder="Nhập Tên Đăng Nhập" 
                                        value={username} 
                                        onChange={handleUsernameChange} 
                                        onBlur={handleUsernameBlur} 
                                        autoComplete="username" 
                                    />
                                </div>
                                {usernameError && 
                                <div className="text-danger" style={{marginTop: "-3px", display:"flex"}}>
                                    <small className="text-danger">{usernameError}</small>
                                </div>}
                            </div>
                            <div className="mb-2">
                                <label className="fw-semibold name-input align-self-start">Số điện thoại</label>
                                <div className="input-group">
                                    <input 
                                        className='form-control form-control-solid' 
                                        type="text" 
                                        placeholder="Nhập Số Điện Thoại" 
                                        value={phone} 
                                        onChange={handlePhoneChange} 
                                        onBlur={handlePhoneBlur} 
                                        autoComplete="tel" 
                                    />
                                </div>
                                {phoneError && 
                                <div className="text-danger" style={{marginTop: "-3px", display:"flex"}}>
                                    <small className="text-danger">{phoneError}</small>
                                </div>}
                            </div>
                            <div className="mb-2">
                                <label className="fw-semibold name-input align-self-start">Mật khẩu</label>
                                <div className="input-group">
                                    <input 
                                        className='form-control form-control-solid' 
                                        type="password" 
                                        placeholder="Nhập Mật Khẩu" 
                                        value={password} 
                                        onChange={handlePasswordChange} 
                                        onBlur={handlePasswordBlur} 
                                        autoComplete="new-password" 
                                    />
                                </div>
                                {passwordError && 
                                <div className="text-danger" style={{marginTop: "-3px", display:"flex"}}>
                                    <small className="text-danger"  style={{marginBottom: "3px", display: "block"}}>{passwordError}</small>
                                </div>}
                            </div>
                            <div className="mb-2">
                                <label className="fw-semibold name-input align-self-start">Nhập Lại Mật khẩu</label>
                                <div className="input-group">
                                    <input 
                                        className='form-control form-control-solid' 
                                        type="password" 
                                        placeholder="Nhập Lại Mật khẩu" 
                                        value={confirmPassword} 
                                        onChange={handleConfirmPasswordChange} 
                                        onBlur={handleConfirmPasswordBlur} 
                                        autoComplete="current-password" 
                                    />
                                </div>
                                {confirmPasswordError && 
                                <div className="text-danger" style={{marginTop: "-3px", display:"flex"}}>
                                    <small className="text-danger"  style={{marginBottom: "3px", display: "block"}}>{confirmPasswordError}</small>
                                </div>}
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="me-3 btn btn-primary" disabled={usernameError || passwordError || confirmPasswordError || phoneError}>Đăng Ký</button>
                                <button type="button" className="btn btn-danger close" onClick={onClose}>Hủy bỏ</button>
                                <div className="pt-3">Bạn đã có tài khoản? 
                                    <a onClick={() => { onClose(); openModalLogin(username, password); }} className="link-primary cursor-pointer">Đăng nhập ngay</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
