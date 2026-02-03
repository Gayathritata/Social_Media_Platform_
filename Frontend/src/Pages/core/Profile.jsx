import React, { useState, useEffect } from "react";
import AppLayout from "../../Components/global/AppLayout";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Padma",
    bio: "Frontend Developer | React Learner 🚀",
    title: "Enthusiastic Developer",
    interests: [],
    posts: 6,
    followers: 120,
    following: 80,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedData = JSON.parse(savedProfile);
      setUserData(prev => ({
        ...prev,
        ...parsedData,
        bio: parsedData.bio || prev.bio,
        title: parsedData.title || prev.title
      }));
    }
  }, []);

  const userPosts = [
    { id: 1, title: "My First React App" },
    { id: 2, title: "Learning Hooks" },
    { id: 3, title: "CSS Tips" },
    { id: 4, title: "JavaScript Tricks" },
    { id: 5, title: "Frontend Roadmap" },
    { id: 6, title: "React vs Angular" },
  ];

  return (
    <AppLayout>
      <div className="profile-container">
        {/* =====================
            PROFILE HEADER
        ===================== */}
        <div className="profile-header">
          {/* Avatar */}
          <div className="profile-avatar">
            {userData.name.charAt(0)}
          </div>

          {/* Name & Bio */}
          <div className="profile-info">
            <h2>{userData.name}</h2>
            <p className="profile-title">{userData.title}</p>
            <p className="profile-bio">{userData.bio}</p>
            {userData.interests && userData.interests.length > 0 && (
              <div className="profile-interests">
                {userData.interests.map(interest => (
                  <span key={interest} className="interest-pill">{interest}</span>
                ))}
              </div>
            )}
          </div>

          {/* Spacer pushes settings to right */}
          <div className="profile-spacer"></div>

          {/* Settings (icon + text) */}
          <div
            className="profile-settings"
            onClick={() => navigate("/settings")}
          >
            <FiSettings size={18} />
            <span>Settings</span>
          </div>
        </div>

        {/* =====================
            STATS
        ===================== */}
        <div className="profile-stats">
          <div>
            <strong>{userData.posts}</strong>
            <span>Posts</span>
          </div>
          <div>
            <strong>{userData.followers}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>{userData.following}</strong>
            <span>Following</span>
          </div>
        </div>

        {/* =====================
            POSTS
        ===================== */}
        <div className="profile-posts">
          <h3>Posts</h3>

          <div className="posts-grid">
            {userPosts.map((post) => (
              <div key={post.id} className="post-card">
                {post.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
