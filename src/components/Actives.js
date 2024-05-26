import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ModalErr from './ModalErr';
import API_BASE_URL from './apiConfig'; 

const Actives = ({ isOpen, onClose }) => {
  const [activeFee, setActiveFee] = useState(null);
  const [showModalErr, setShowModalErr] = useState(false);
  const { username, updateUserData } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings`)
      .then(response => response.json())
      .then(data => {
        setActiveFee(data.active_fee);
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu settings:', error));
  }, []);

  const handleActivate = () => {
    fetch(`${API_BASE_URL}/api/user/actives`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            activeFee: activeFee
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateUserData();
            setSuccessMessage(data.success);
            setShowModalErr(true);
            setTimeout(() => {
                onClose(); 
                setShowModalErr(false);
              }, 2000);
        } else {
            setErrorMessage(data.error);
            setShowModalErr(true); 
        }
    })
    .catch(error => console.error('Lỗi khi kích hoạt tài khoản:', error));
};

  const formatMoney = (activeFee) => {
    if (activeFee !== null) {
      return activeFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return '';
    }
  }
  
  const handleClickOutside = (event) => {
    if (!event.target.closest('.modal-dialog')) {
      onClose();
    }
  };

  return (
    <>
    {isOpen && <div className="modal-backdrop fade show" onClick={handleClickOutside}></div>}
        <div className={`modal ${isOpen ? 'show' : '' }`} onContextMenu={(e) => e.preventDefault()}>
            <div className="modal-dialog">
                <div className='modal-content'>
                    <div className='modal-body'>
                        <div className="my-2">
                            <div className="text-center">
                                <Link to="/home">
                                <img className="logo" alt="Logo" src="/images/logo.gif" style={{ maxWidth: "50%" }} />
                                </Link>
                            </div>
                        </div>

            <div className="text-center fw-semibold">
                <div className="fs-6 mb-2">Xác nhận kích hoạt tài khoản</div>
                    <div id="noti-active"></div>
                        <span>Vui lòng thoát game trước khi xác nhận kích hoạt</span>
                            <span>Sau khi kích hoạt, bạn sẽ mở khóa các tính năng giao dịch</span>
                        <div className="text-success fw-bold">
                        Phí kích hoạt: {formatMoney(activeFee)} Coin
                        </div>
                            <div className="mt-2">
                                <button type="button" id="active" className="btn-rounded btn btn-primary btn-sm" onClick={handleActivate}>
                                Kích hoạt ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showModalErr && successMessage && <ModalErr message={successMessage} closeModal={() => setShowModalErr(false)} messageType="success" />}
        {showModalErr && errorMessage && <ModalErr message={errorMessage} closeModal={() => setShowModalErr(false)} messageType="error" />}
    </>
  );
};

export default Actives;
