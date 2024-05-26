import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import API_BASE_URL from './apiConfig'; 

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts`,)
            .then(response => response.json())
            .then(data => {
                const foundPost = data.find(post => post.id === parseInt(id));
                setPost(foundPost);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }
    const goBack = () => {
        window.history.back();
    };
    return (
        <div className='card'>
            <div className='card-body'>
                <>
                <div className='to-back'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-chevron-left fw-semibold" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                    <span className='back-to fw-semibold' onClick={goBack}> Quay Lại</span>
                </div>
                    <div key={post.id} className="d-flex align-items-center">
                        <div className="post-image d-none d-sm-block">
                            <img src="/images/avatar.png" alt={post.title} />
                            <div className="post-author">Admin</div>
                        </div>
                        <div className="post-detail flex-fill">
                            <div className="fw-bold text-primary">{post.title}</div>
                            <div className="post-date">{post.created_at}</div>
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                            <div className="post-info mt-2">{post.views} lượt xem, {post.comments_count} bình luận</div>
                        </div>
                    </div>
                    <hr className="my-3" />
                </>
                <div className="comment-list">
                    <div className="d-flex align-items-center mb-3">
                        <div className="post-image d-none d-sm-block"></div>
                        <div className="flex-fill">
                            <textarea className="form-control comment-input" placeholder="Viết bình luận..."></textarea>
                            <div className="d-flex justify-content-end">
                                <button className="px-2 py-1 fw-semibold text-secondary bg-warning bg-opacity-25 border border-warning border-opacity-75 rounded-2 link-success cursor-pointer mt-2">
                                    Gửi bình luận
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="post-image d-none d-sm-block">
                            <img src="/images/small/Smallnam.png" alt="2939" />
                            <div className="post-author text-dark">admin</div>
                        </div>
                        <div className="post-detail flex-fill">
                            <div className="d-flex align-items-center justify-content-between">
                                <small className="fw-semibold" style={{ color: 'rgb(0, 0, 0)' }}>admin - Admin Đẹp Trai</small>
                                <div className="post-date">18:55:43 21/03/2024</div>
                            </div>
                            <div className="post-content mt-0">Chào Mừng Các Bạn Đến Với Server</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
                        <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                            <div>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" style={{ cursor: 'pointer' }}>&lt;</a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" style={{ cursor: 'pointer' }}>1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" style={{ cursor: 'pointer' }}>&gt;</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
