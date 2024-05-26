import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig'; 

const Bank = () => {
    const [exchangeAmounts, setExchangeAmounts] = useState({});
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [bankInfo, setBankInfo] = useState(null);
    const [username, setUsername] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [showAmountSelection, setShowAmountSelection] = useState(true);
    
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/settings`)
            .then(response => response.json())
            .then(data => setExchangeAmounts(JSON.parse(data.exchange_amounts)))
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);
    useEffect(() => {
        if (countdown === 0 && bankInfo) {
            setBankInfo(null);
            setCountdown(60);
            setShowAmountSelection(true);
        } else if (countdown > 0 && bankInfo) {
            const timer = setTimeout(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, bankInfo]);

    const formatMoney = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleSelectAmount = (amount) => {
        setSelectedAmount(amount);
    }

    const handlePayment = () => {
        if (selectedAmount) {
            setBankInfo({
                bank: "Mb Bank",
                owner: "Nguyễn Văn Bin",
                accountNumber: "123123",
                amount: selectedAmount,
                content: `nt ${username}` 
            });
            setShowAmountSelection(false);
        } else {
            alert("Vui lòng chọn một mốc nạp trước khi thanh toán");
        }
    }
    const handleConfirm = () => {
        setBankInfo(null);
        setShowAmountSelection(true);
    }
    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div>
                        <div className="fs-5 fw-semibold text-center">Chọn hình thức nạp</div>
                        <div className="row text-center justify-content-center row-cols-2 row-cols-lg-5 g-2 g-lg-2 my-1 mb-2">
                            {/* <div className="col">
                                <Link className="w-100 fw-semibold" to="/recharge/momo">
                                    <div className='recharge-method-item'>
                                        <img alt="method" src="/images/momo.png"/>
                                    </div>
                                </Link>
                            </div> */}
                            <div className="col">
                                <Link className="w-100 fw-semibold" to="/recharge/bank">
                                    <div className={`recharge-method-item active`}>
                                        <img alt="method" src="/images/atm.png"/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-center">
                        {showAmountSelection && (
                            <div className="col-md-8 mt-3">
                                <div className="fs-5 fw-semibold text-center">Chọn mốc nạp</div>
                                <div className="row text-center justify-content-center row-cols-2 row-cols-lg-3 g-2 g-lg-2 my-1 mb-2">
                                    {Object.entries(exchangeAmounts).map(([amount, points]) => (
                                        <div key={amount} className="col">
                                            <div className="w-100 fw-semibold cursor-pointer">
                                                <div
                                                    className={`recharge-method-item position-relative false ${selectedAmount === amount ? 'active' : ''}`}
                                                    style={{ height: "90px" }}
                                                    onClick={() => handleSelectAmount(amount)}
                                                >
                                                    <div>{formatMoney(amount)}đ</div>
                                                    <div className="center-text text-danger">
                                                        <span>Nhận</span>
                                                    </div>
                                                    <div className="text-primary">{formatMoney(amount)}P </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-3">
                                    <button type="button" className="w-50 rounded-3 btn btn-primary btn-sm" onClick={handlePayment}>Thanh toán</button>
                                    <div className="mt-2">
                                        <small className="fw-semibold"><a href="/user/transactions">Lịch sử giao dịch</a></small>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {bankInfo && (
                        <div className='d-flex justify-content-center'>
                            <div className="col-md-8 mt-3">
                                <div className="fs-5 fw-semibold text-center">Thanh toán</div>
                                <div>
                                    <div className="table-responsive-sm">
                                        <table className="fw-semibold mt-3 table">
                                            <tbody>
                                                <tr>
                                                    <td>Ngân hàng</td>
                                                    <td>{bankInfo.bank}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chủ tài khoản</td>
                                                    <td>{bankInfo.owner}</td>
                                                </tr>
                                                <tr>
                                                    <td>Số tài khoản</td>
                                                    <td>{bankInfo.accountNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>Số tiền</td>
                                                    <td>{formatMoney(bankInfo.amount)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nội dung</td>
                                                    <td>{bankInfo.content}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-center fw-semibold fs-5">Quét mã để thanh toán</div>
                                    <div className="text-center mt-2">
                                        <img style={{ height: '250px' }} src={`https://api.vietqr.io/970416/${bankInfo.accountNumber}/${bankInfo.amount}/${bankInfo.content}/qr_only.jpg`} alt="QR code" />
                                    </div>
                                    <div className="text-center mt-3">
                                        <button type="button" className="w-50 rounded-3 btn btn-primary btn-sm" onClick={handleConfirm}>
                                            {countdown === 0 ? 'Đóng' : `Xác nhận (${countdown})`}
                                        </button>
                                        <div className="mt-2">
                                            <small className="fw-semibold">
                                                <a href="/user/transactions">Lịch sử giao dịch</a>
                                            </small>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <small className="fw-semibold">Lưu ý khi thanh toán: Giao dịch trên hoàn toàn được kiểm duyệt tự
                                            động, yêu cầu kiểm tra kỹ nội dung chuyển tiền trước khi thực hiện chuyển. Nếu ghi thiếu, sai hoặc quá
                                            10 phút không thấy cộng tiền, các bạn hãy liên hệ với <a target="_blank" rel="noreferrer">Fanpage</a> để
                                            được hỗ trợ
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Bank;
