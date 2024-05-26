import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Recharge = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    return (
        <div className='card'>
            <div className='card-body'>
                <div>
                    <div className="fs-5 fw-semibold text-center">Chọn hình thức nạp</div>
                    <div className="row text-center justify-content-center row-cols-2 row-cols-lg-5 g-2 g-lg-2 my-1 mb-2">
                        <div className="col">
                            <Link className="w-100 fw-semibold" to="/recharge/momo">
                                <div className='recharge-method-item'>
                                    <img alt="method" src="/images/momo.png"/>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link className="w-100 fw-semibold" to="/recharge/bank">
                                <div className='recharge-method-item'>
                                    <img alt="method" src="/images/atm.png"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recharge;
