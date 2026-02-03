import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, Droplets, Anchor, Heart, ArrowLeft } from 'lucide-react';
import AppLayout from "../../Components/global/AppLayout";
import './AnonymousHelp.css';

const BOTTLE_TYPES = [
    { id: 'blue', color: '#60a5fa', icon: <Droplets size={20} /> },
    { id: 'cyan', color: '#22d3ee', icon: <Anchor size={20} /> },
    { id: 'indigo', color: '#818cf8', icon: <Heart size={20} /> },
];

export default function AnonymousHelp() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isReleasing, setIsReleasing] = useState(false);
    const [releasingBottleColor, setReleasingBottleColor] = useState('');
    const [bottles, setBottles] = useState([
        { id: 1, text: "Feeling overwhelmed with exams, any tips?", color: '#60a5fa', x: 20, y: 30 },
        { id: 2, text: "I just need someone to tell me it's going to be okay.", color: '#22d3ee', x: 60, y: 15 },
        { id: 3, text: "Grateful for this community!", color: '#818cf8', x: 40, y: 50 },
    ]);

    const handleRelease = (e) => {
        e.preventDefault();
        if (!message.trim() || isReleasing) return;

        const color = BOTTLE_TYPES[Math.floor(Math.random() * BOTTLE_TYPES.length)].color;
        setReleasingBottleColor(color);
        setIsReleasing(true);

        // After animation completes (1.5s)
        setTimeout(() => {
            const newBottle = {
                id: Date.now(),
                text: message,
                color: color,
                x: Math.random() * 80 + 10,
                y: Math.random() * 40 + 10,
            };

            setBottles([newBottle, ...bottles]);
            setMessage('');
            setIsReleasing(false);
        }, 1500);
    };

    return (
        <AppLayout>
            <div className="safe-harbor-container">
                <button className="back-btn" onClick={() => navigate('/engagement')}>
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <div className="ocean-background">
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>

                    <div className="bottles-area">
                        <div className="ripples-layer">
                            {isReleasing && (
                                <motion.div
                                    className="ocean-ripple"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [1, 4], opacity: [0.6, 0] }}
                                    transition={{ delay: 1.2, duration: 1 }}
                                    style={{ left: "50%", top: "30%" }}
                                />
                            )}
                        </div>

                        <AnimatePresence>
                            {isReleasing && (
                                <motion.div
                                    className="throwing-bottle premium-bottle"
                                    initial={{
                                        opacity: 0,
                                        scale: 1,
                                        left: "50%",
                                        top: "100%",
                                        x: "-50%",
                                        y: 0,
                                        rotate: -45
                                    }}
                                    animate={{
                                        opacity: [0, 1, 1],
                                        top: ["90%", "30%", "45%"], // Parabolic peak and landing
                                        scale: [1, 1.8, 0.6],
                                        rotate: [0, 180, 540],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        times: [0, 0.6, 1],
                                        ease: "easeOut"
                                    }}
                                    style={{ backgroundColor: releasingBottleColor }}
                                >
                                    <div className="bottle-cork"></div>
                                    <div className="bottle-paper"></div>
                                    <Droplets size={24} color="white" />
                                </motion.div>
                            )}

                            {bottles.map((bottle) => (
                                <motion.div
                                    key={bottle.id}
                                    className="bottle"
                                    initial={{ opacity: 0, scale: 0, y: 100 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: [0, -10, 0],
                                        x: [0, 5, 0]
                                    }}
                                    transition={{
                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                        x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                        opacity: { duration: 0.5 }
                                    }}
                                    style={{
                                        left: `${bottle.x}%`,
                                        top: `${bottle.y}%`,
                                        backgroundColor: bottle.color
                                    }}
                                    onClick={() => alert(`Message from the deep: "${bottle.text}"`)}
                                >
                                    <Droplets className="bottle-icon" size={24} />
                                    <div className="bottle-label">Help</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="shore-content">
                    <div className="shore-header">
                        <h1>The Safe Harbor</h1>
                        <p>Write your worries on paper, put them in a bottle, and release them to the ocean. The community is here for you.</p>
                    </div>

                    <form className="bottle-form" onSubmit={handleRelease}>
                        <textarea
                            placeholder="What's on your mind? (Anonymous)"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            maxLength={200}
                        />
                        <button type="submit" className="release-btn">
                            <Send size={18} /> Release Bottle
                        </button>
                    </form>

                    <div className="kindness-stats">
                        <div className="stat-card">
                            <Heart className="text-pink-500" />
                            <span>1,240 Kind Souls Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
