import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from './apiConfig'; 

const Community = () => {
    const [LinkBoxZalo, setLinkBoxZalo] = useState(null);
    const [LinkFage, setLinkFage] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/settings`)
          .then(response => response.json())
          .then(data => {
            setLinkBoxZalo(data.zalo_box_link);
            setLinkFage(data.fanpage_link);
          })
          .catch(error => console.error('Lỗi khi lấy dữ liệu settings:', error));
      }, []);

  return (
    <>
        <div className='card'>
            <div className='card-body'>
                <div className='row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-2'>
                    <div className='col'>
                        <Link to={LinkFage}>
                            <div className='card card-cover h-80 overflow-hidden text-white bg-dark rounded-5 shadow-lg'>
                                <div className='d-flex flex-column h-80 p-5 pb-3 text-white text-shadow-1'>
                                    <h3 className="pt-1 mt-5 mb-4 fw-bold">FanPage Nso July</h3>
                                    <ul className='d-flex list-unstyled mt-auto'>
                                        <li className='me-auto'>
                                            <img src="https://i.pinimg.com/originals/ce/d6/6e/ced66ecfc53814d71f8774789b55cc76.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <small>Facebook</small></li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* <div className='col'>
                        <Link to="">
                            <div className='card card-cover h-80 overflow-hidden text-white bg-dark rounded-5 shadow-lg'>
                                <div className='d-flex flex-column h-80 p-5 pb-3 text-white text-shadow-1'>
                                    <h3 className="pt-1 mt-5 mb-4 fw-bold">FanPage Nso July</h3>
                                    <ul className='d-flex list-unstyled mt-auto'>
                                        <li className='me-auto'>
                                            <img src="https://i.pinimg.com/originals/ce/d6/6e/ced66ecfc53814d71f8774789b55cc76.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <small>Facebook</small></li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    </div> */}
                    <div className='col'>
                        <Link target='_blank' to={LinkBoxZalo}>
                            <div className='card card-cover h-80 overflow-hidden text-white bg-dark rounded-5 shadow-lg'>
                                <div className='d-flex flex-column h-80 p-5 pb-3 text-white text-shadow-1'>
                                    <h3 className="pt-1 mt-5 mb-4 fw-bold">Cộng đồng Box Zalo</h3>
                                    <ul className='d-flex list-unstyled mt-auto'>
                                        <li className='me-auto'>
                                            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <small>Zalo</small></li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
   </>
  );
};

export default Community;
