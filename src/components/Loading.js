import React from 'react';

const Loading = () => {
    return (
        <div id="NotiflixLoadingWrap" className="notiflix-loading nx-with-animation nx-remove"
        style={{
          zIndex: 4000,
          background: 'rgb(231, 231, 231)',
          animationDuration: '400ms',
          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
          display: 'flex',
          flexFlow: 'column wrap',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <div style={{ width: '80px', height: '80px' }} className="notiflix-loading-icon nx-with-message">
          <svg xmlns="http://www.w3.org/2000/svg" stroke="#32c682" width="80px" height="80px" viewBox="0 0 44 44">
            <g fill="none" fillRule="evenodd" strokeWidth="2">
              <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1"
                  keyTimes="0; 1" repeatCount="indefinite" values="1; 20"></animate>
                <animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s"
                  keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0">
                </animate>
              </circle>
              <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s"
                  keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20">
                </animate>
                <animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s"
                  keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0">
                </animate>
              </circle>
            </g>
          </svg>
        </div>
        <p id="NotiflixLoadingMessage" className="nx-loading-message" style={{ color: '#626060', fontSize: '15px' }}>Đang tải</p>
      </div>
    );
};

export default Loading;
