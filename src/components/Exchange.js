import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ModalErr from './ModalErr';
import API_BASE_URL from './apiConfig'; 
import successSound from '../assets/music/success.mp3';

const Exchange = () => {
    const { username, balance, updateUserData } = useAuth();
    const [exchangeAmounts, setExchangeAmounts] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [userData, setUserData] = useState({});
    const [noCharacterMessage, setNoCharacterMessage] = useState('');
    const [isCharacterSelected, setIsCharacterSelected] = useState(false); 
    const [isInsufficientBalance, setIsInsufficientBalance] = useState(false);
    const [isConfirmationDisabled, setIsConfirmationDisabled] = useState(true);
    const [showModalErr, setShowModalErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessSoundPlayed, setIsSuccessSoundPlayed] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/settings`)
            .then(response => response.json())
            .then(data => {
                const parsedExchangeAmounts = JSON.parse(data.exchange_amounts);
                setExchangeAmounts(parsedExchangeAmounts);
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));

        if (username) {
            fetch(`${API_BASE_URL}/api/exchange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    if (data.characters && data.characters.length > 0) {
                        setUserData(data.characters[0]);
                    } else {
                        setNoCharacterMessage('Tài khoản chưa có nhân vật nào');
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setNoCharacterMessage('Tài khoản chưa có nhân vật nào');
                } else {
                    console.error('Lỗi khi lấy dữ liệu:');
                }
            });
        }
    }, [username]);

    useEffect(() => {
        if (selectedAmount !== null && isCharacterSelected) {
            setIsInsufficientBalance(selectedAmount > balance);
        } else {
            setIsInsufficientBalance(false);
        }
    }, [selectedAmount, isCharacterSelected, balance]);

    useEffect(() => {
        if (selectedAmount !== null && isCharacterSelected) {
            setIsConfirmationDisabled(false);
        } else {
            setIsConfirmationDisabled(true);
        }
    }, [selectedAmount, isCharacterSelected]);

    useEffect(() => {
        if (successMessage && isSuccessSoundPlayed) {
            const audio = new Audio(successSound);
            audio.play();
            audio.onended = () => setIsSuccessSoundPlayed(false);
        }
    }, [successMessage, isSuccessSoundPlayed]);

    const handleSelectAmount = (amount) => {
        setSelectedAmount(prevAmount => prevAmount !== amount ? amount : null);
    }

    const getClassLabel = (classId) => {
        switch(classId) {
            case 0:
                return 'Chưa vào lớp';
            case 1:
                return 'Ninja kiếm';
            case 2:
                return 'Ninja tiêu';
            case 3:
                return 'Ninja kunai';
            case 4:
                return 'Ninja cung';
            case 5:
                return 'Ninja đao';
            case 6:
                return 'Ninja quạt';
            default:
                return 'Không xác định';
        }
    }

    const handleConfirm = () => {
        if (selectedAmount !== null && isCharacterSelected) {
            fetch(`${API_BASE_URL}/api/exchange/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    amount: selectedAmount,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateUserData();
                    setSuccessMessage(data.message);
                    setIsSuccessSoundPlayed(true);
                    setShowModalErr(true);
                } else {
                    setErrorMessage(data.message);
                    setShowModalErr(true); 
                }
            })
        }
        setSelectedAmount(null);
        setIsCharacterSelected(false);
    };
    
    const handleCharacterSelection = () => {
        setIsCharacterSelected(true);
    }
    const formatMoney = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
        <div className='card'>
            <div className='card-body'>
                <div className="text-center fw-semibold fs-5">Đổi PCoin ra Lượng 
                    <span className="text-danger">(KM 100%)</span>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='col-md-8'>
                        <div className='row text-center justify-content-center row-cols-2 row-cols-lg-3 g-2 g-lg-2 my-1 mb-2'>
                            {Object.entries(exchangeAmounts).map(([amount, points]) => (
                                <div key={amount} className="col">
                                    <div className="w-100 fw-semibold cursor-pointer">
                                        <div className={`recharge-method-item position-relative ${selectedAmount === amount ? 'active' : ''}`}
                                            style={{ height: "90px" }}
                                            onClick={() => handleSelectAmount(amount)}
                                            >
                                            <div className="text-primary">{formatMoney(amount)}P</div>
                                            <div className="center-text text-dark">
                                                <span>Nhận</span>
                                            </div>
                                            <div className="text-danger">{formatMoney(points)} lượng</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {userData && userData.info && (
                            <div>
                                <div className="text-center mt-4">
                                    <div className="fw-semibold fs-6">Chọn nhân vật</div>
                                </div>
                                <div className="row text-center justify-content-center row-cols-2 row-cols-lg-3 g-2 g-lg-2 my-1 mb-2">
                                    <div className="col">
                                        <div className="w-100 fw-semibold cursor-pointer">
                                            <div className={`recharge-method-item ${isCharacterSelected ? 'active' : ''}`} style={{ height: "95px" }} onClick={handleCharacterSelection}>
                                                <div className="text-dark">
                                                    <div>
                                                        <img src={userData.info.gender === 0 ? "/images/small/Smallnam.png" : "/images/small/Smallnu.png"} alt="avatar" style={{ maxHeight: "30px", borderRadius: "0px" }} />
                                                    </div>
                                                    <span>{userData.info.name}</span>
                                                </div>
                                                <div className="text-danger">
                                                    {userData.info.class !== null ? `Lớp ${getClassLabel(userData.info.class)}` : 'Chưa vào lớp'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {noCharacterMessage && (
                            <div className="text-danger text-center fw-semibold mt-3 mb-2">{noCharacterMessage}</div>
                        )}
                        {!isInsufficientBalance && (
                            <div className="text-center mt-4">
                                <button type="button" disabled={isConfirmationDisabled} onClick={handleConfirm} className={`w-50 rounded-3 btn btn-primary btn-sm ${isConfirmationDisabled ? 'disabled' : ''}`}>Xác nhận</button>
                            </div>
                        )}
                        {isInsufficientBalance && (
                            <div className="text-danger mb-1 text-center fw-semibold">Bạn còn thiếu: {`${(selectedAmount - balance).toLocaleString()} Pcoin`.replace(/\./g, ',')}. Vui lòng nạp thêm tiền</div>
                        )}
                        {isInsufficientBalance && (
                            <div className="text-center">
                                <Link className="btn btn-sm btn-success w-50 rounded-3" to="/recharge/bank">Nạp tiền</Link>
                            </div>
                        )}
                        <div className="mt-2 text-center">
                            <small className="fw-semibold">
                                <Link to="/user/transactions">Lịch sử giao dịch</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showModalErr && successMessage && <ModalErr message={successMessage.toLocaleString()} closeModal={() => setShowModalErr(false)} messageType="success" />}
        {showModalErr && errorMessage && <ModalErr message={errorMessage.toLocaleString()} closeModal={() => setShowModalErr(false)} messageType="error" />}
        </>
    );
};

export default Exchange;
