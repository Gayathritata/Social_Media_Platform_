import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Anchor, Brain, Zap, PartyPopper, Sparkles, ArrowLeft } from 'lucide-react';
import AppLayout from '../../Components/global/AppLayout';
import './EngagementHub.css';

const FEATURES = [
    {
        id: 'harbor',
        title: 'The Safe Harbor',
        desc: 'Release your worries anonymously into the deep ocean.',
        icon: <Anchor size={32} />,
        color: '#0ea5e9',
        path: '/anonymous-help'
    },
    {
        id: 'quest',
        title: 'Synergy Quests',
        desc: 'Challenge your mind and boost the community IQ.',
        icon: <Brain size={32} />,
        color: '#8b5cf6',
        path: '/brain-teasers'
    },
    {
        id: 'pulse',
        title: 'Pulse Circles',
        desc: 'Join ephemeral groups that vanish every 24 hours.',
        icon: <Zap size={32} />,
        color: '#ef4444',
        path: '/community-spaces'
    },
    {
        id: 'hall',
        title: 'Celebration Hall',
        desc: 'Every small win deserves a standing ovation.',
        icon: <PartyPopper size={32} />,
        color: '#f59e0b',
        path: '/life-milestones'
    }
];

export default function EngagementHub() {
    const navigate = useNavigate();

    return (
        <AppLayout>
            <div className="engagement-hub">
                <button className="back-btn" onClick={() => navigate('/home')}>
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </button>
                <header className="hub-header">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="hub-badge"
                    >
                        <Sparkles size={16} /> DISCOVER SYNERGY
                    </motion.div>
                    <h1>Experience Something Unique</h1>
                    <p>Go beyond regular social media. Connect, play, and celebrate with the community.</p>
                </header>

                <div className="hub-grid">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className="feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(feature.path)}
                            style={{ '--accent': feature.color }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                            <div className="feature-footer">
                                <span>Explore Now</span>
                                <div className="footer-line"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
