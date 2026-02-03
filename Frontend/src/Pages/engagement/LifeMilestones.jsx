import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star, PartyPopper, Plus, Heart, ArrowLeft } from 'lucide-react';
import AppLayout from "../../Components/global/AppLayout";
import './LifeMilestones.css';

const MILESTONES = [
    { id: 1, title: "Drank 2L of Water", category: "Health", date: "Today", likes: 12 },
    { id: 2, title: "Fixed a critical bug at work", category: "Career", date: "Yesterday", likes: 24 },
    { id: 3, title: "Completed a 5km run", category: "Fitness", date: "2 days ago", likes: 45 },
];

export default function LifeMilestones() {
    const navigate = useNavigate();
    const [items, setItems] = useState(MILESTONES);
    const [newMilestone, setNewMilestone] = useState('');

    const triggerConfetti = () => {
        // In a real app, we'd use canvas-confetti. 
        // Here we'll simulate with a CSS class or simple animation.
        alert("🎉 CELEBRATION! Confetti falling! 🎉");
    };

    const addMilestone = (e) => {
        e.preventDefault();
        if (!newMilestone.trim()) return;
        const item = {
            id: Date.now(),
            title: newMilestone,
            category: "Personal",
            date: "Just now",
            likes: 0
        };
        setItems([item, ...items]);
        setNewMilestone('');
        triggerConfetti();
    };

    return (
        <AppLayout>
            <div className="celebration-hall">
                <button className="back-btn" onClick={() => navigate('/engagement')}>
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <header className="hall-header">
                    <div className="header-icon"><PartyPopper size={48} /></div>
                    <h1>Celebration Hall</h1>
                    <p>Every win deserves a standing ovation. Share your milestones, big or small.</p>
                </header>

                <section className="milestone-input-area">
                    <form className="milestone-form" onSubmit={addMilestone}>
                        <input
                            type="text"
                            placeholder="What did you achieve today?"
                            value={newMilestone}
                            onChange={(e) => setNewMilestone(e.target.value)}
                        />
                        <button type="submit" className="add-btn">
                            <Plus size={20} /> Share
                        </button>
                    </form>
                </section>

                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="milestone-card-wrapper"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="milestone-dot">
                                <Trophy size={16} />
                            </div>
                            <div className="milestone-card">
                                <div className="card-top">
                                    <span className="category">{item.category}</span>
                                    <span className="date">{item.date}</span>
                                </div>
                                <h3>{item.title}</h3>
                                <div className="card-bottom">
                                    <button className="celebrate-btn" onClick={triggerConfetti}>
                                        <PartyPopper size={16} /> Celebrate
                                    </button>
                                    <span className="likes"><Heart size={14} fill="red" color="red" /> {item.likes}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
