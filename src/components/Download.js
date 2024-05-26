import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from './apiConfig'; 

const Download = () => {
    const [linkJava148, setLinkJava] = useState(null);
    const [linkJava211, setLinkJava211] = useState(null);
    const [linkAndroid, setLinkAndroid] = useState(null);
    const [linkPc, setLinkPc] = useState(null);
    const [linkIos, setLinkIos] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/settings`)
          .then(response => response.json())
          .then(data => {
            setLinkPc(data.pc_download_link);
            setLinkIos(data.ios_download_link);
            setLinkJava(data.java_download_link);
            setLinkJava211(data.java_auto_download_link);
            setLinkAndroid(data.android_download_link);
          })
          .catch(error => console.error('Lỗi khi lấy dữ liệu settings:', error));
      }, []);


  return (
    <>
        <div className='card'>
            <div className='card-body'>
                <div className="fw-semibold text-center h5">TẢI GAME CHO PC</div>
                <div className="text-center">
                    <span className="fw-semibold">Cách 1: Phiên bản thuần PC
                        <img width="35" height="35" style={{marginBottom:"1px"}} src="https://img.icons8.com/color/48/monitor--v1.png" alt="monitor--v1"/>
                    </span>
                    <div>
                        <Link to={linkPc} className="btn btn-danger me-1 mt-1">
                            Nso July PC v2.1.9
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <span className="fw-semibold">Cách 2: Phiên bản thuần IOS 
                        <img width="40" height="40" style={{marginBottom:"10px"}} src="https://img.icons8.com/papercut/60/mac-os.png" alt="mac-os"/>
                    </span>
                    <div>
                        <Link to={linkPc} className="btn btn-danger me-1 mt-1">
                            Nso July PC v2.1.9
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <span className="fw-semibold">Cách 3: Chạy giả lập Java
                        <img width="38" height="38" style={{marginBottom:"10px"}} src="https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png" alt="java-coffee-cup-logo--v1"/>
                    </span>
                    <div>
                        <Link to={linkJava148} className="btn btn-danger me-1 mt-1">
                            Nso July v1.4.8
                        </Link>
                        <Link to={linkJava211} className="btn btn-primary me-1 mt-1">
                            Nso July v2.1.1
                        </Link>
                    </div>

                        <div class="mt-4">
                            <div class="h6">Hướng dẫn cách cài đặt</div>
                            <div>Bước 1: Tải Microemulator: 
                                <a href="https://angelchip.net/files/share/AngelChipEmulatorEXE.zip"> AngelChipEmulator.zip</a>
                            </div>
                            <div>Bước 2: Tải một trong các phiên bản bên trên (Gợi ý: bản 211)</div>
                            <div>Bước 3: Giải nén file AngelChipEmulator.zip đã tải ở bước 1</div>
                            <div>Bước 4: Mở ứng dụng AngelChipEmulator.exe ở thư mục đã giải nén</div>
                            <div>Bước 5: Kéo file game có đuôi .jar đã tải ở trên vào và bấm Start</div>
                            Trước khi bấm Start các bạn căn chỉnh lại kích thước sao cho dễ chơi nhất nhé
                    </div>
                </div>
            </div>
        </div>
   </>
  );
};

export default Download;
