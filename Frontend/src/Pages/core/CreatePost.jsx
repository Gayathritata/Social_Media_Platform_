import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, MapPin, Smile, Send, ArrowLeft, Loader2 } from 'lucide-react';
import AppLayout from '../../Components/global/AppLayout';
import { usePosts } from '../../context/PostContext';
import './CreatePost.css';

export default function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !image) return;

    setIsPosting(true);

    const newPost = {
      id: Date.now(),
      username: "padma",
      userImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      postImg: image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
      caption: content,
      likes: 0,
      comments: 0,
      time: "Just now"
    };

    // Simulate API call delay
    setTimeout(() => {
      addPost(newPost);
      setIsPosting(false);
      navigate('/home');
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="create-post-container">
        <header className="create-post-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h2>Create New Post</h2>
          <button
            className={`post-submit-btn ${(!content.trim() && !image) ? 'disabled' : ''}`}
            onClick={handlePost}
            disabled={isPosting || (!content.trim() && !image)}
          >
            {isPosting ? <Loader2 className="animate-spin" size={20} /> : "Post"}
          </button>
        </header>

        <div className="create-post-content">
          <div className="user-mini-info">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="User" className="user-avatar" />
            <span className="username">padma</span>
          </div>

          <textarea
            placeholder="Share what's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2200}
          />

          <AnimatePresence>
            {image && (
              <motion.div
                className="image-preview-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <img src={image} alt="Preview" className="image-preview" />
                <button className="remove-img-btn" onClick={() => setImage(null)}>
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="create-post-footer">
          <div className="footer-actions">
            <label className="action-item">
              <Image size={24} className="icon-image" />
              <span>Photo</span>
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
            <button className="action-item">
              <MapPin size={24} className="icon-location" />
              <span>Location</span>
            </button>
            <button className="action-item">
              <Smile size={24} className="icon-emoji" />
              <span>Feeling</span>
            </button>
          </div>

          <div className="content-limit">
            <div className={`limit-ring ${content.length > 2000 ? 'warning' : ''}`} style={{ '--progress': `${(content.length / 2200) * 100}%` }}></div>
            <span>{2200 - content.length}</span>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
}
