import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import API_BASE_URL from './apiConfig'; 

const Category = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/posts`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);
    const pinnedPosts = posts.filter(post => post.pin === 0);
    return (
        <div className='card'>
            <div className='card-body'>
                <Link class="fw-semibold" to="/home">Về trang chủ</Link>
                <div className='card-title h5'>Hướng dẫn - Tính năng</div>
                <hr />
                <div>
                    {pinnedPosts.map(post => (
                        <div key={post.id} className="post-item d-flex align-items-center my-2">
                            <div className="post-image">
                                <img className="logo" alt="Admin" src="/images/avatar.png" />
                            </div>
                            <div>
                                <Link className="fw-bold" to={`/post/${post.id}`}>{post.title}</Link>
                                <div className="text-muted font-weight-bold">Lượt xem: {post.views}, Bình luận: {post.comments_count} </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pt-2 card-title h5">Danh mục</div>
                <hr />
                <div>
                    <div className="post-item d-flex align-items-center my-2">
                        <div className="post-image">
                            <img className="logo" alt="Hướng dẫn - Tính năng" src="/images/small/2.png" />
                        </div>
                        <div>
                            <Link className='fw-bold text-dangere' to="/category">Hướng dẫn - Tính năng
                            </Link>
                            <div className="text-muted font-weight-bold">Các bài viết hướng dẫn về tính năng trên GAME</div>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className="card-title h5">Giới thiệu</div>
                    <hr />
                    <div className="mx-2 fs-6">
                        Ninja School July là một game thế giới mở với chủ đề trường học ninja, nơi người chơi sẽ được trải nghiệm cuộc sống của một ninja thực thụ.
                        Trong game, người chơi có thể tham gia vào các hoạt động giải trí như săn bắn quái vật, khám phá khu rừng bí ẩn, hoặc tham gia đấu trường PvP
                        để thử thách và cạnh tranh với những ninja khác. Ngoài ra, game còn có nhiều nhiệm vụ và thử thách khác nhau cho người chơi hoàn thành, từ đó
                        thu thập được điểm kinh nghiệm và trang bị vũ khí, trang phục mới. Với đồ họa đẹp mắt, âm thanh sống động và nội dung đa dạng, Ninja School July
                        sẽ đem đến cho người chơi những trải nghiệm tuyệt vời và thỏa mãn niềm đam mê với văn hóa ninja.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
