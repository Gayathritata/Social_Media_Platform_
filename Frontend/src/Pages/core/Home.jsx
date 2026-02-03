import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppLayout from "../../Components/global/AppLayout";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, PlusSquare, BadgeCheck } from "lucide-react";
import { usePosts } from "../../context/PostContext";
import "./Home.css";

// Dummy Data
const STORIES = [
  { id: 1, username: "your_story", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=You", isUser: true },
  { id: 2, username: "virat_kohli", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
  { id: 3, username: "mubeena_shaik", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { id: 4, username: "gayathri", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 5, username: "sravani", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
  { id: 6, username: "vasanthika_07", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
];

const SUGGESTIONS = [
  { id: 1, username: "react_official", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=React", reason: "Popular" },
  { id: 2, username: "web_master", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Web", reason: "Followed by jane_doe" },
  { id: 3, username: "design_daily", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design", reason: "New to SocialApp" },
];

export default function Home() {
  const { posts, likePost, addComment, savedPostIds, toggleSave } = usePosts();
  const [commentInputs, setCommentInputs] = useState({});
  const [activeComments, setActiveComments] = useState({});

  const handleLike = (postId) => {
    likePost(postId);
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    if (!commentInputs[postId]?.trim()) return;

    addComment(postId, commentInputs[postId]);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const toggleComments = (postId) => {
    setActiveComments({ ...activeComments, [postId]: !activeComments[postId] });
  };

  return (
    <AppLayout>
      <div className="home-layout">

        {/* LEFT/CENTER: Feed */}
        <div className="feed-container">

          {/* Stories Bar */}
          <div className="stories-bar">
            {STORIES.map((story) => (
              <div key={story.id} className="story-item">
                <div className={`story-ring ${story.isUser ? "user-ring" : ""}`}>
                  <img src={story.img} alt={story.username} className="story-img" />
                  {story.isUser && <div className="add-story-icon">+</div>}
                </div>
                <span className="story-username">{story.username}</span>
              </div>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                {/* Header */}
                <div className="post-header">
                  <div className="post-user-info">
                    <img src={post.userImg} alt={post.username} className="post-avatar" />
                    <span className="post-username">{post.username}</span>
                    <span className="post-time">• {post.time}</span>
                  </div>
                  <MoreHorizontal size={20} className="post-options-icon" />
                </div>

                {/* Media */}
                <div className="post-media">
                  <img src={post.postImg} alt="Post content" />
                </div>

                {/* Actions */}
                <div className="post-actions">
                  <div className="actions-left">
                    <Heart
                      size={24}
                      className="action-icon like-icon"
                      onClick={() => handleLike(post.id)}
                    />
                    <MessageCircle
                      size={24}
                      className="action-icon comment-icon"
                      onClick={() => toggleComments(post.id)}
                    />
                    <Send size={24} className="action-icon share-icon" />
                  </div>
                  <div className="actions-right">
                    <Bookmark
                      size={24}
                      className={`action-icon save-icon ${savedPostIds.includes(post.id) ? 'active' : ''}`}
                      onClick={() => toggleSave(post.id)}
                      fill={savedPostIds.includes(post.id) ? "#f59e0b" : "none"}
                    />
                  </div>
                </div>

                {/* Likes & Caption */}
                <div className="post-content">
                  <div className="post-likes">{post.likes} likes</div>
                  <div className="post-caption">
                    <span className="caption-username">{post.username}</span> {post.caption}
                  </div>

                  {post.postComments?.length > 0 && (
                    <div className="view-comments" onClick={() => toggleComments(post.id)}>
                      {activeComments[post.id] ? "Hide comments" : `View all ${post.postComments.length} comments`}
                    </div>
                  )}

                  {activeComments[post.id] && (
                    <div className="comments-list">
                      {post.postComments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                          <span className="comment-username">{comment.username}</span> {comment.text}
                        </div>
                      ))}
                    </div>
                  )}

                  <form className="search-comment" onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    />
                    {commentInputs[post.id]?.trim() && (
                      <button type="submit" className="post-comment-btn">Post</button>
                    )}
                  </form>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT: Sidebar (Desktop Only) */}
        <div className="sidebar-container">
          {/* User Profile Mini */}
          <div className="sidebar-profile">
            <Link to="/profile">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="User" className="sidebar-avatar" />
            </Link>
            <div className="sidebar-user-info">
              <Link to="/profile" className="sidebar-username">
                padma
                <BadgeCheck size={14} className="verified-icon" fill="#3b82f6" color="white" />
              </Link>
            </div>
            <button className="switch-btn">Switch</button>
          </div>

          {/* Suggestions */}
          <div className="suggestions-header">
            <span>Suggestions for you</span>
            <button>See All</button>
          </div>

          <div className="suggestions-list">
            {SUGGESTIONS.map((sug) => (
              <div key={sug.id} className="suggestion-item">
                <img src={sug.img} alt={sug.username} className="suggestion-avatar" />
                <div className="suggestion-info">
                  <div className="suggestion-username">{sug.username}</div>
                  <div className="suggestion-reason">{sug.reason}</div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>



          {/* Footer Links */}
          <div className="sidebar-footer">
            <p>© 2026 SOCIALAPP </p>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
