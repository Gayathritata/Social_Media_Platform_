import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, Mic2, MessageSquare, Plus, ArrowLeft, X, Sparkles } from 'lucide-react';
import AppLayout from "../../Components/global/AppLayout";
import './CommunitySpaces.css';

const CIRCLES = [
    { id: 1, name: "Early Bird Developers", members: 42, activity: 'high', theme: '#3b82f6' },
    { id: 2, name: "Mindful Meditation", members: 128, activity: 'medium', theme: '#10b981' },
    { id: 3, name: "Book Club: Sci-Fi", members: 15, activity: 'low', theme: '#8b5cf6' },
    { id: 4, name: "Morning Coffee Vibes", members: 56, activity: 'high', theme: '#f59e0b' },
];

export default function CommunitySpaces() {
    const navigate = useNavigate();
    const [circles, setCircles] = useState(CIRCLES);
    const [isCreating, setIsCreating] = useState(false);
    const [newCircle, setNewCircle] = useState({ name: '', theme: '#3b82f6' });

    const handleCreate = (e) => {
        e.preventDefault();
        if (!newCircle.name.trim()) return;

        const circle = {
            id: Date.now(),
            name: newCircle.name,
            members: 1,
            activity: 'high',
            theme: newCircle.theme
        };

        setCircles([circle, ...circles]);
        setIsCreating(false);
        setNewCircle({ name: '', theme: '#3b82f6' });
    };
    return (
        <AppLayout>
            <div className="pulse-circles-container">
                <button className="back-btn" onClick={() => navigate('/engagement')}>
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <div className="circles-header">
                    <div className="badge"><Zap size={14} /> LIVE SPACES</div>
                    <h1>Pulse Circles</h1>
                    <p>Real-time rooms that vanish every 24 hours. Jump in before they're gone.</p>
                </div>

                <div className="circles-grid">
                    {circles.map((circle) => (
                        <motion.div
                            key={circle.id}
                            className={`circle-card ${circle.activity}`}
                            whileHover={{ scale: 1.05 }}
                            style={{ '--theme-color': circle.theme }}
                        >
                            <div className="activity-ring"></div>
                            <div className="circle-content">
                                <div className="circle-icon" style={{ backgroundColor: circle.theme }}>
                                    <Users size={24} color="white" />
                                </div>
                                <h3>{circle.name}</h3>
                                <div className="members-count">{circle.members} online now</div>

                                <div className="circle-actions">
                                    <button className="join-btn">
                                        <Mic2 size={16} /> Join Live
                                    </button>
                                    <button className="chat-btn">
                                        <MessageSquare size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        className="create-circle-card"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setIsCreating(true)}
                    >
                        <div className="add-icon"><Plus size={32} /></div>
                        <span>Pulse a New Circle</span>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isCreating && (
                        <motion.div
                            className="creation-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="creation-modal"
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                            >
                                <div className="modal-header">
                                    <div className="modal-badge"><Sparkles size={14} /> NEW PULSE</div>
                                    <button className="close-btn" onClick={() => setIsCreating(false)}>
                                        <X size={20} />
                                    </button>
                                </div>

                                <h2>Create a Pulse Circle</h2>
                                <p>This room will exist for only 24 hours. Make it count.</p>

                                <form onSubmit={handleCreate}>
                                    <div className="form-group">
                                        <label>Circle Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Late Night Jazz Sessions"
                                            value={newCircle.name}
                                            onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                                            autoFocus
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Theme Color</label>
                                        <div className="color-options">
                                            {['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#ec4899'].map(color => (
                                                <div
                                                    key={color}
                                                    className={`color-swatch ${newCircle.theme === color ? 'active' : ''}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setNewCircle({ ...newCircle, theme: color })}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" className="pulse-btn">
                                        <Zap size={18} /> Pulse Into Existence
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AppLayout>
    );
}
