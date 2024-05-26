import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './Login';
import ModalDangky from './Register';
import ModalActive from './Actives';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import API_BASE_URL from './apiConfig'; 

const Header = () => {
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const [isModalDangkyOpen, setIsModalDangkyOpen] = useState(false);
    const { isLoggedIn, username, logout, balance, kh} = useAuth();
    const [depositSuccess, setDepositSuccess] = useState(false);
    const navigate = useNavigate(); 
    const [isModalActiveOpen, setIsModalActiveOpen] = useState(false); 

    useEffect(() => {
        if (isLoggedIn) {
            const savedUsername = localStorage.getItem('username');
            const savedToken = localStorage.getItem('token');
    
            if (savedUsername && savedToken) {
                fetch(`${API_BASE_URL}/api/auth/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${savedToken}`
                    },
                    body: JSON.stringify({ username: savedUsername })
                })
                .then(response => response.json())
                .then(data => {
                    
                })
                .catch(error => console.error('Error fetching user data:', error));
            }
        }
    }, [isLoggedIn]);
    

    const handleExchangeSuccess = (isSuccess) => {
        if (isSuccess) {
        }
    }

    const openModalLogin = () => {
        setIsModalLoginOpen(true);
    };

    const openModalDangky = () => {
        setIsModalDangkyOpen(true);
    };

    const closeModalLogin = () => {
        setIsModalLoginOpen(false);
    };

    const closeModalDangky = () => {
        setIsModalDangkyOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/home");
    };
    
    const openModalActive = () => { 
        setIsModalActiveOpen(true);
    };

    const closeModalActive = () => {
        setIsModalActiveOpen(false);
    };
    return (
        <div className="text-center card">
            <div className="card-body">
                <div className="">
                    <Link to="/home">
                        <img className="logo" alt="Logo" src="/images/logo.gif" style={{ maxWidth: "40%" }} />
                    </Link>
                </div>
                <div className="mt-3">
                    {isLoggedIn ? (
                        <>  
                        <Link className='btn btn-menu btn-danger fw-semibold false' to="/user/profile">
                            {username} - {balance !== null ? balance.toLocaleString() : 'Loading'} P 
                        </Link>
                        <span className='btn btn-menu btn-danger fw-semibold false' style={{marginLeft: "10px"}} onClick={handleLogout}>Đăng Xuất</span>
                        </>
                    ) : (
                        <>
                        <div className='mb-2'>
                            <div className='row text-center justify-content-center row-cols-2 row-cols-lg-6 g-2 g-lg-2 mt-1'>
                                <div className='col'>
                                    <div className='px-2'>
                                        <div className='btn btn-menu btn-danger w-100 fw-semibold false' onClick={() => { setIsModalLoginOpen(true); setIsModalDangkyOpen(false); }}>Đăng Nhập</div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='px-2'>
                                        <div className='btn btn-menu btn-danger w-100 fw-semibold false' onClick={() => { setIsModalDangkyOpen(true); setIsModalLoginOpen(false); }}>Đăng Ký</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                </div>
                {isLoggedIn && kh === 0 && (
                    <div className="mt-2">
                        <small className="text-danger fw-semibold mt-3">
                            Tài khoản của bạn chưa được kích hoạt, click vào phía dưới để kích hoạt.
                        </small>
                        <div className="mt-2">
                            <span className="mb-3 px-2 py-1 fw-semibold text-secondary bg-danger bg-opacity-25 border border-danger border-opacity-75 rounded-2 link-success cursor-pointer" onClick={() => setIsModalActiveOpen(true)}>Kích hoạt tài khoản</span>
                        </div>
                    </div>
                )}
                <div className="mt-3">
                    <Link className='mb-3 px-2 py-1 fw-semibold text-danger bg-danger bg-opacity-25 border border-danger border-opacity-50 rounded-2 cursor-pointer' to="/download">
                        TẢI GAME 
                        <svg
                            fill="#000000"
                            height="800px"
                            width="800px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 29.978 29.978"
                            xmlSpace="preserve"
                            className="download-icon"
                        >
                            <g>
                            <path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012v-8.861H25.462z"></path>
                            <path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193C15.092,18.979,14.62,18.426,14.62,18.426z"></path>
                            </g>
                        </svg>
                    </Link>
                </div>
                {depositSuccess && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nạp tiền thành công</h5>
                                <button type="button" className="close" onClick={() => setDepositSuccess(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Cảm ơn bạn đã nạp tiền thành công.</p>
                                <p>Thông báo: {balance} coins đã được cập nhật vào tài khoản của bạn.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setDepositSuccess(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <ModalLogin isOpen={isModalLoginOpen} onClose={closeModalLogin} openModalDangky={openModalDangky} />
                <ModalDangky isOpen={isModalDangkyOpen} onClose={closeModalDangky} openModalLogin={openModalLogin} />
                <ModalActive isOpen={isModalActiveOpen} onClose={closeModalActive} /> 
            </div>
        </div>
    );
};

export default Header;
