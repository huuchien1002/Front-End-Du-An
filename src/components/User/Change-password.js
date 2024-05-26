import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalErr from '../ModalErr';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig'; 

const Changepassword = () => {
    const navigate = useNavigate(); 
    const { username } = useAuth();
    const [showModalErr, setShowModalErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin.');
            setShowModalErr(true);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Mật khẩu mới và mật khẩu xác nhận không khớp.');
            setShowModalErr(true);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/password/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    current_Password: currentPassword,
                    new_Password: newPassword,
                    confirm_NewPassword: confirmNewPassword
                })
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.success);
                setShowModalErr(true);
                setErrorMessage('');
                setTimeout(() => {
                    navigate("/home");
                  }, 3000);
            } else {
                setErrorMessage(data.error);
                setShowModalErr(true);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Change password error:', error);
            setErrorMessage('Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.');
            setShowModalErr(true);
            setSuccessMessage('');
        }
    };

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className="mb-3">
                        <div className="row text-center justify-content-center row-cols-3 row-cols-lg-6 g-1 g-lg-1">
                            <div className="col">
                                <Link className='btn btn-sm btn-warning w-100 fw-semibold false active' to="/user/profile" style={{backgroundColor: "rgb(255, 180, 115)"}}>Tài Khoản
                                </Link>
                            </div>
                            <div className="col">
                                <Link className='btn btn-sm btn-warning w-100 fw-semibold false' to="/user/transactions" style={{backgroundColor: "rgb(255, 180, 115)"}}>Lịch Sử GD
                                </Link>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='w-100 d-flex justify-content-center'>
                        <form onSubmit={handleSubmit} className="pb-3" style={{ width: '26rem' }}>
                            <div className="fs-5 fw-bold text-center mb-3">Đổi mật khẩu</div>
                            <div className="mb-2">
                                <div className="input-group">
                                    <input
                                        name="current_password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        className="form-control form-control-solid"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="input-group">
                                    <input
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Mật khẩu mới"
                                        className="form-control form-control-solid"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="input-group">
                                    <input
                                        name="confirm_password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Nhập lại mật khẩu mới"
                                        className="form-control form-control-solid"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="me-3 btn btn-primary">Đổi mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showModalErr && successMessage && <ModalErr message={successMessage} closeModal={() => setShowModalErr(false)} messageType="success" />}
            {showModalErr && errorMessage && <ModalErr message={errorMessage} closeModal={() => setShowModalErr(false)} messageType="error" />}

        </>
    );
};

export default Changepassword;
