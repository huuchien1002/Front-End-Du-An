import React, {useState} from 'react';

const ModalErr = ({ message, closeModal, messageType }) => {
    const [isError, setIsError] = useState(messageType === 'error');

    const handleCloseModal = () => {
        setIsError(false);
        closeModal();
    };
    return (
        <div id="NotiflixReportWrap" className="notiflix-report" style={{ zIndex: 4002, borderRadius: '25px', fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif', display: 'flex', flexFlow: 'column wrap', alignItems: 'center', justifyContent: 'center' }}>
            <div className="notiflix-report-overlay nx-with-animation nx-report-click-to-close" style={{ background: 'rgb(93 93 93 / 20%)', animationDuration: '100ms' }} onClick={handleCloseModal}></div>
            <div className="notiflix-report-content nx-with-animation nx-fade" style={{ width: '320px', background: '#feecd8', animationDuration: '100ms' }}>
                <div style={{ width: '50px', height: '50px' }} className="notiflix-report-icon">
                {isError ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        fill="#ff5549"
                        viewBox="0 0 120 120"
                        >
                        <style>
                            {`
                            @keyframes NXReportFailure2-animation {
                                0% { opacity: 0 }
                                40%, to { opacity: 1 }
                            }
                            @keyframes NXReportFailure1-animation {
                                0% {
                                    transform: translate(60px, 60px) scale(.5, .5) translate(-60px, -60px);
                                }
                                40%, to {
                                    transform: translate(60px, 60px) scale(1, 1) translate(-60px, -60px);
                                }
                                60% {
                                    transform: translate(60px, 60px) scale(.95, .95) translate(-60px, -60px);
                                }
                            }
                            @keyframes NXReportFailure3-animation {
                                0% {
                                    transform: translate(60px, 60px) scale(.5, .5) translate(-60px, -60px);
                                }
                                50%, to {
                                    transform: translate(60px, 60px) scale(1, 1) translate(-60px, -60px);
                                }
                                60% {
                                    transform: translate(60px, 60px) scale(.95, .95) translate(-60px, -60px);
                                }
                            }
                            @keyframes NXReportFailure4-animation {
                                0% { opacity: 0 }
                                50%, to { opacity: 1 }
                            }
                            `}
                        </style>
                        <g
                            style={{
                            animationName: 'NXReportFailure1-animation',
                            animationTimingFunction: 'cubic-bezier(.42, 0, .58, 1)',
                            transform: 'translate(60px, 60px) scale(1, 1) translate(-60px, -60px)'
                            }}
                        >
                            <path
                            d="M4.35 34.95c0-16.82 13.78-30.6 30.6-30.6h50.1c16.82 0 30.6 13.78 30.6 30.6v50.1c0 16.82-13.78 30.6-30.6 30.6h-50.1c-16.82 0-30.6-13.78-30.6-30.6v-50.1zM34.95 120h50.1c19.22 0 34.95-15.73 34.95-34.95v-50.1C120 15.73 104.27 0 85.05 0h-50.1C15.73 0 0 15.73 0 34.95v50.1C0 104.27 15.73 120 34.95 120z"
                            style={{ animationName: 'NXReportFailure2-animation', animationTimingFunction: 'cubic-bezier(.42, 0, .58, 1)' }}
                            fill="inherit"
                            data-animator-group="true"
                            data-animator-type="2"
                            />
                        </g>
                        <g
                            style={{
                            animationName: 'NXReportFailure3-animation',
                            animationTimingFunction: 'cubic-bezier(.42, 0, .58, 1)',
                            transform: 'translate(60px, 60px) scale(1, 1) translate(-60px, -60px)'
                            }}
                        >
                            <path
                            d="M82.4 37.6c-.9-.9-2.37-.9-3.27 0L60 56.73 40.86 37.6a2.306 2.306 0 0 0-3.26 3.26L56.73 60 37.6 79.13c-.9.9-.9 2.37 0 3.27.45.45 1.04.68 1.63.68.59 0 1.18-.23 1.63-.68L60 63.26 79.13 82.4c.45.45 1.05.68 1.64.68.58 0 1.18-.23 1.63-.68.9-.9.9-2.37 0-3.27L63.26 60 82.4 40.86c.9-.91.9-2.36 0-3.26z"
                            style={{ animationName: 'NXReportFailure4-animation', animationTimingFunction: 'cubic-bezier(.42, 0, .58, 1)' }}
                            fill="inherit"
                            data-animator-group="true"
                            data-animator-type="2"
                            />
                        </g>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" id="NXReportSuccess" width="50px" height="50px" viewBox="0 0 120 120"fill="#32c682">
                    <g style={{ animationName: "NXReportSuccess2-animation", transform: "translate(60px,60px) scale(1,1) translate(-60px,-60px)" }}>
                        <path
                        d="M60 115.38C29.46 115.38 4.62 90.54 4.62 60 4.62 29.46 29.46 4.62 60 4.62c30.54 0 55.38 24.84 55.38 55.38 0 30.54-24.84 55.38-55.38 55.38zM60 0C26.92 0 0 26.92 0 60s26.92 60 60 60 60-26.92 60-60S93.08 0 60 0z"
                        style={{ animationName: "NXReportSuccess3-animation" }}
                        fill="inherit"
                        data-animator-group="true"
                        data-animator-type="2"
                        ></path>
                    </g>
                    <g style={{ animationName: "NXReportSuccess1-animation", transform: "translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px)" }}>
                        <path
                        d="M88.27 35.39L52.8 75.29 31.43 58.2c-.98-.81-2.44-.63-3.24.36-.79.99-.63 2.44.36 3.24l23.08 18.46c.43.34.93.51 1.44.51.64 0 1.27-.26 1.74-.78l36.91-41.53a2.3 2.3 0 0 0-.19-3.26c-.95-.86-2.41-.77-3.26.19z"
                        style={{ animationName: "NXReportSuccess4-animation" }}
                        fill="inherit"
                        data-animator-group="true"
                        data-animator-type="2"
                        ></path>
                    </g>
                    </svg>
                    )}
                 </div>
                 <h5 className="notiflix-report-title" style={{ fontWeight: 500, fontSize: '16px', color: '#1e1e1e' }}>{isError ? 'Thất bại' : 'Thành công'}</h5>
                <p className="notiflix-report-message" style={{ fontSize: '14px', color: '#242424' }}>{message}</p>
                <a id="NXReportButton" className="notiflix-report-button" style={{ fontWeight: 500, fontSize: '14px', background: '#ff5549', color: '#fff' }} onClick={closeModal}>Xác nhận</a>
            </div>
        </div>
    );
};

export default ModalErr;
