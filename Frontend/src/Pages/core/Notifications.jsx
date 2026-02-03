import React, { useState } from 'react';
import AppLayout from '../../Components/global/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, AtSign, Bell } from 'lucide-react';
import bgVideo from '../../assets/explore-bg.mp4';
import './Notifications.css';

const NOTIFICATIONS_DATA = [
  {
    id: 1,
    type: 'like',
    user: 'vasanthika',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'liked your post "React 19 updates are amazing!"',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    user: 'Gayathri',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'commented: "Great explanation, thanks for sharing!"',
    time: '15m ago',
    read: false,
  },
  {
    id: 3,
    type: 'follow',
    user: 'Mubeena',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    content: 'started following you',
    time: '1h ago',
    read: true,
  },
  {
    id: 4,
    type: 'mention',
    user: 'Sravani',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    content: 'mentioned you in a comment',
    time: '3h ago',
    read: true,
  },
  {
    id: 5,
    type: 'like',
    user: 'padma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jason',
    content: 'liked your photo',
    time: '5h ago',
    read: true,
  },
];

export default function Notifications() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="icon-like" size={18} fill="#ef4444" color="#ef4444" />;
      case 'comment':
        return <MessageCircle className="icon-comment" size={18} fill="#3b82f6" color="#3b82f6" />;
      case 'follow':
        return <UserPlus className="icon-follow" size={18} fill="#10b981" color="#10b981" />;
      case 'mention':
        return <AtSign className="icon-mention" size={18} color="#8b5cf6" />;
      default:
        return <Bell size={18} />;
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppLayout>
      <div className="notifications-page">
        {/* Background Video Layer */}
        <div className="video-background-container">
          <div className="video-overlay"></div>
          <video
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="bg-video"
          />
        </div>

        <div className="notifications-container">
          <header className="notifications-header">
            <h2>Notifications</h2>
            <div className="filter-tabs">
              {['all', 'like', 'comment', 'mention', 'follow'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${filter === tab ? 'active' : ''}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}s
                </button>
              ))}
            </div>
          </header>

          <div className="notifications-list">
            <AnimatePresence>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`notification-card ${!notif.read ? 'unread' : ''}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="notif-icon-wrapper">{getIcon(notif.type)}</div>
                    <img src={notif.avatar} alt={notif.user} className="user-avatar" />
                    <div className="notif-content">
                      <p>
                        <span className="username">@{notif.user}</span> {notif.content}
                      </p>
                      <span className="time">{notif.time}</span>
                    </div>
                    {!notif.read && <span className="blue-dot" />}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-state"
                >
                  <Bell size={48} color="#ccc" />
                  <p>No notifications found.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
