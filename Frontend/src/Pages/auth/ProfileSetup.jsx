import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, User, Briefcase, Info, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import './ProfileSetup.css';

export default function ProfileSetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        bio: '',
        title: '',
        interests: [],
        avatar: null
    });

    const interestsList = ["Tech", "Design", "Nature", "Music", "Photography", "Gaming", "Travel", "Art", "Finance"];

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            // Save to localStorage for Profile page to use
            const profileData = {
                ...formData,
                name: 'Padma', // Defaulting to Padma as seen in Profile.jsx
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            navigate('/profile');
        }
    };

    return (
        <div className="profile-setup-container">
            <div className="setup-glass">
                <div className="setup-progress">
                    <div className={`progress-bar step-${step}`}></div>
                </div>

                <div className="setup-content">
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="setup-step"
                        >
                            <div className="setup-header">
                                <ArrowLeft className="back-arrow" size={24} onClick={() => navigate('/settings')} />
                                <h1>Craft Your Identity</h1>
                                <p>Let the world know who you are. Start with a profile picture and your professional title.</p>
                            </div>


                            <div className="avatar-upload">
                                <div className="avatar-placeholder">
                                    <User size={60} />
                                    <button className="upload-btn"><Camera size={18} /></button>
                                </div>
                            </div>

                            <div className="input-group">
                                <label><Briefcase size={16} /> Professional Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Product Designer"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="setup-step"
                        >
                            <div className="setup-header">
                                <h1>Share Your Story</h1>
                                <p>Write a brief bio. This will be the first thing people see on your profile.</p>
                            </div>

                            <div className="input-group">
                                <label><Info size={16} /> Bio</label>
                                <textarea
                                    placeholder="I'm a passionate developer who loves..."
                                    maxLength={150}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                                <div className="char-count">{formData.bio.length}/150</div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="setup-step"
                        >
                            <div className="setup-header">
                                <h1>Your Passions</h1>
                                <p>Select your interests to help us personalize your experience.</p>
                            </div>

                            <div className="interests-grid">
                                {interestsList.map(interest => (
                                    <button
                                        key={interest}
                                        className={`interest-tag ${formData.interests.includes(interest) ? 'active' : ''}`}
                                        onClick={() => handleInterestToggle(interest)}
                                    >
                                        {formData.interests.includes(interest) && <CheckCircle size={14} />}
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="setup-footer">
                    {step > 1 && (
                        <button className="back-link" onClick={() => setStep(step - 1)}>Go Back</button>
                    )}
                    <button className="next-btn" onClick={handleNext}>
                        {step === 3 ? "Complete Setup" : "Continue"}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
