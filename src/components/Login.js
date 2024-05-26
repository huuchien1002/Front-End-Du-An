import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_BASE_URL from './apiConfig'; 

const Login = ({ isOpen, onClose, openModalDangky }) => {
    const { login, updateUserData,  } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    const handleUsernameBlur = () => {
        if (!username) {
            setUsernameError('Tên đăng nhập không được bỏ trống');
        } else if (username !== username.toLowerCase()) {
            setUsernameError('Tên đăng nhập chỉ được chứa ký tự thường');
        } else if (username.length < 5) {
            setUsernameError('Tối thiểu 5 ký tự');
        } else {
            setUsernameError('');
            setError(''); 
        }
    };

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError('Mật khẩu không được bỏ trống');
        } else if (password.length < 2) {
            setPasswordError('Tối thiểu 2 ký tự');
        } else if (password.length > 20) {
            setPasswordError('Tối đa 20 kí tự');
        } else {
            setPasswordError('');
            setError(''); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (usernameError || passwordError) {
            setError('Vui lòng điền đầy đủ thông tin và sửa các lỗi được hiển thị.');
            return;
        }
        if (!username || !password) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                login(data.username, data.token);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('username', data.username);
                updateUserData();
                onClose();
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.');
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
                                <div className="input-group">
                                    <input 
                                        className='form-control form-control-solid' 
                                        type="text" 
                                        placeholder="Tên Đăng Nhập" 
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
                                <div className="input-group">
                                    <input 
                                        className='form-control form-control-solid' 
                                        type="password" 
                                        placeholder="Mật Khẩu" 
                                        value={password} 
                                        onChange={handlePasswordChange} 
                                        onBlur={handlePasswordBlur} 
                                        autoComplete="current-password" 
                                    />
                                </div>
                                {passwordError && 
                                <div className="text-danger" style={{marginTop: "-3px", display:"flex"}}>
                                    <small className="text-danger">{passwordError}</small>
                                </div>}
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="me-3 btn btn-primary" disabled={usernameError || passwordError}>Đăng nhập</button>
                                <button type="button" className="btn btn-danger close" onClick={onClose}>Hủy bỏ</button>
                                <div className="pt-3">Bạn chưa có tài khoản? 
                                    <a onClick={() => { onClose(); openModalDangky(); }} className="link-primary cursor-pointer">Đăng ký ngay</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
