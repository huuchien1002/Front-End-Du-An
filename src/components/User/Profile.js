import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import moment from 'moment';

// import ModalErr from './ModalErr';

const Profile = () => {
    const { username, balance, phone, kh, created_at} = useAuth();

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
            <table className='table'>
                <tbody>
                    <tr className='fw-semibold'>
                        <td>Tài khoản</td>
                        <td>{username}</td>
                    </tr>
                    <tr className='fw-semibold'>
                        <td>Mật khẩu</td>
                        <td>*** (<Link to="/user/change-password">Đổi mật khẩu</Link>)</td>
                    </tr>
                    <tr className='fw-semibold'>
                        <td>Số dư</td>
                        <td>{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} P</td>
                    </tr>
                    <tr className='fw-semibold'>
                        <td>Số điện thoại</td>
                        <td>{phone ? phone : 'Chưa Có'}</td>
                    </tr>
                    <tr className='fw-semibold'>
                        <td>Trạng thái</td>
                        <td className='text-success fw-bold'>{kh === 0 ? 'Chưa kích hoạt' : kh === 1 ? 'Hoạt động' : 'Đã bị ban'}</td>

                    </tr>
                    <tr className='fw-semibold'>
                        <td>Ngày tham gia</td>
                        <td>{created_at ? moment(created_at).format('HH:mm:ss DD/MM/YYYY') : 'Trống'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
};

export default Profile;
