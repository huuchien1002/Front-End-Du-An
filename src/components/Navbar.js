import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ModalLogin from './Login';
import { useAuth } from './AuthContext';

const Navbar = ({ updateLoginStatus }) => {
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLinkClick = (path, event) => {
        if (!isLoggedIn && (path === "/recharge/bank" || path === "/exchange")) {
            event.preventDefault();
            localStorage.setItem('redirectTo', path);
            setIsModalLoginOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalLoginOpen(false);
        localStorage.removeItem('redirectTo');
    };

    return (
        <div>
            <div className="mb-2">
                <div className="row text-center justify-content-center row-cols-2 row-cols-lg-6 g-2 g-lg-2 mt-1">
                    <div className="col">
                        <div className="px-2">
                            <NavLink to="/home" className='btn btn-menu btn-danger w-100 fw-semibold false'>
                                Trang Chủ
                            </NavLink>
                        </div>
                    </div>
                    <div className="col">
                        <div className="px-2">
                            <NavLink to="/recharge/bank" className='btn btn-menu btn-danger w-100 fw-semibold false' onClick={(e) => handleLinkClick("/recharge/bank", e)}>
                                Nạp Tiền
                            </NavLink>
                        </div>
                    </div>
                    <div className="col">
                        <div className="px-2">
                            <NavLink to="/exchange" className='btn btn-menu btn-danger w-100 fw-semibold false' onClick={(e) => handleLinkClick("/exchange", e)}>
                                Đổi Lượng
                            </NavLink>
                        </div>
                    </div>
                    <div className="col">
                        <div className="px-2">
                            {/* <a href="https://zalo.me/g/mvcyqg007" className='btn btn-menu btn-danger w-100 fw-semibold false'>
                                Box Zalo
                            </a> */}
                            <NavLink to="/community" className='btn btn-menu btn-danger w-100 fw-semibold false'>
                                Box Zalo
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <ModalLogin isOpen={isModalLoginOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default Navbar;
