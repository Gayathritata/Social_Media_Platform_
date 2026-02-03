import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import AppLayout from '../../Components/global/AppLayout';
import { usePosts } from '../../context/PostContext';
import './SavedPosts.css';

export default function SavedPosts() {
    const navigate = useNavigate();
    const { posts, savedPostIds } = usePosts();

    const savedPosts = posts.filter(post => savedPostIds.includes(post.id));

    return (
        <AppLayout>
            <div className="saved-posts-container">
                <header className="saved-header">
                    <button className="back-arrow-btn" onClick={() => navigate('/settings')}>
                        <ArrowLeft size={22} />
                    </button>
                    <h1>Saved Posts</h1>
                </header>

                {savedPosts.length > 0 ? (
                    <div className="saved-posts-grid">
                        {savedPosts.map((post) => (
                            <article key={post.id} className="post-card">
                                <div className="post-header">
                                    <div className="post-user-info">
                                        <img src={post.userImg} alt={post.username} className="post-avatar" />
                                        <span className="post-username">{post.username}</span>
                                    </div>
                                    <MoreHorizontal size={20} className="post-options-icon" />
                                </div>

                                <div className="post-media">
                                    <img src={post.postImg} alt="Saved content" />
                                </div>

                                <div className="post-actions">
                                    <div className="actions-left">
                                        <Heart size={24} className="action-icon" />
                                        <MessageCircle size={24} className="action-icon" />
                                    </div>
                                    <Bookmark size={24} className="action-icon active" fill="#f59e0b" />
                                </div>

                                <div className="post-content">
                                    <div className="post-likes">{post.likes} likes</div>
                                    <div className="post-caption">
                                        <span className="caption-username">{post.username}</span> {post.caption}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-saved">
                        <div className="empty-icon-circle">
                            <Bookmark size={48} />
                        </div>
                        <h2>No saved posts yet</h2>
                        <p>Save posts you want to see again. Only you can see what you've saved.</p>
                        <button className="explore-btn" onClick={() => navigate('/home')}>
                            Explore Posts
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
