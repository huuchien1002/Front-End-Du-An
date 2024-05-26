import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// import ModalErr from './ModalErr';

const Transactions = () => {
    // const { username, balance, phone, kh, created_at} = useAuth();

  return (
    <>
    <div className='card'>
        <div className='card-body'>
            <div className="mb-3">
                <div className="row text-center justify-content-center row-cols-3 row-cols-lg-6 g-1 g-lg-1">
                    <div className="col">
                        <Link className='btn btn-sm btn-warning w-100 fw-semibold false' to="/user/profile" style={{backgroundColor: "rgb(255, 180, 115)"}}>Tài Khoản
                        </Link>
                    </div>
                    <div className="col">
                        <Link className='btn btn-sm btn-warning w-100 fw-semibold false active' to="/user/transactions" style={{backgroundColor: "rgb(255, 180, 115)"}}>Lịch Sử GD
                        </Link>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='table-responsive'>
                <table className='table align-middle table-row-dashed gy-5 dataTable no-footer'>
                    <thead>
                        <tr className='text-start fw-bold text-uppercase gs-0'>
                            <th className="table-sort-desc text-primary" style={{cursor: "pointer"}}>#ID</th>
                            <th className="" style={{cursor: "pointer"}}>Số tiền</th>
                            <th className="" style={{cursor: "pointer"}}>Sau G.D</th>
                            <th className="" style={{cursor: "pointer"}}>Mô tả</th>
                            <th className="" style={{cursor: "pointer"}}>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody className='fw-semibold'>
                        <tr>
                            <td colspan="5">
                                <div className="d-flex text-center w-100 align-content-center justify-content-center">Không có bản ghi nào</div>
                            </td>
                        </tr>
                    </tbody>        
                </table>
            </div>
            <div className='row'>
                <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>

                </div>
                <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                    <div>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <Link className='page-link' style={{cursor: "pointer"}}>&lt;</Link>
                            </li>
                            <li className='page-item active'>
                                <Link className='page-link' style={{cursor: "pointer"}}>1</Link>
                            </li>
                            <li className='page-item'>
                                <Link className='page-link' style={{cursor: "pointer"}}>&gt;</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
};

export default Transactions;
