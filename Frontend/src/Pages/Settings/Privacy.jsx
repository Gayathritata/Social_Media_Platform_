import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, EyeOff, UserCheck } from "lucide-react";
import "./Privacy.css";

const Privacy = () => {
    const navigate = useNavigate();

    const privacySettings = [
        {
            id: "profile-visibility",
            title: "Profile Visibility",
            description: "Control who can see your profile and posts.",
            icon: <Eye size={20} />,
            status: "Public"
        },
        {
            id: "two-factor",
            title: "Two-Factor Authentication",
            description: "Add an extra layer of security to your account.",
            icon: <Lock size={20} />,
            status: "Disabled"
        },
        {
            id: "data-sharing",
            title: "Data Sharing",
            description: "Manage how your data is shared with third-party apps.",
            icon: <Shield size={20} />,
            status: "On"
        },
        {
            id: "blocked-users",
            title: "Blocked Users",
            description: "View and manage people you've blocked.",
            icon: <EyeOff size={20} />,
            status: "0 users"
        }
    ];

    return (
        <div className="privacy-page">
            <div className="privacy-header">
                <ArrowLeft
                    className="back-arrow"
                    size={24}
                    onClick={() => navigate('/settings')}
                />
                <h2 className="page-title">Privacy Settings</h2>
            </div>

            <div className="privacy-container">
                <div className="privacy-info">
                    <UserCheck size={40} className="privacy-icon" />
                    <h3>Your Privacy Matters</h3>
                    <p>Manage your account security and control how your information is used.</p>
                </div>

                <div className="privacy-list">
                    {privacySettings.map((item) => (
                        <div key={item.id} className="privacy-card">
                            <div className="card-header">
                                <div className="icon-title">
                                    <div className="item-icon">{item.icon}</div>
                                    <div className="item-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <span className="item-status">{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="privacy-footer">
                    <p>Learn more about our <span className="link">Privacy Policy</span></p>
                </div>
            </div>
        </div>
    );

};

export default Privacy;
