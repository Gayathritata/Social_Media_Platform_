import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Cpu, TrendingUp, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import AppLayout from "../../Components/global/AppLayout";
import './BrainTeasers.css';

export default function BrainTeasers() {
  const navigate = useNavigate();
  const [solved, setSolved] = useState(false);
  const [answer, setAnswer] = useState('');

  const checkAnswer = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === 'synergy') {
      setSolved(true);
      alert("Correct! Synergy is the answer. +100 IQ Points!");
    } else {
      alert("Try again! Hint: It's the name of our platform.");
    }
  };

  return (
    <AppLayout>
      <div className="synergy-quests-container">
        <button className="back-btn" onClick={() => navigate('/engagement')}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="quest-sidebar">
          <div className="community-iq-card">
            <div className="card-label">Community IQ</div>
            <div className="iq-value">142.8</div>
            <div className="iq-trend"><TrendingUp size={14} /> +2.4 today</div>
          </div>

          <nav className="quest-nav">
            <div className="nav-item active">Daily Quest</div>
            <div className="nav-item">Logic Lab</div>
            <div className="nav-item">Word Wizard</div>
          </nav>
        </div>

        <main className="quest-main">
          <header className="quest-header">
            <div className="quest-id">QUEST #142</div>
            <h1>The Daily Synapse</h1>
            <p>Solve the connection to boost the collective intelligence.</p>
          </header>

          <div className="puzzle-section">
            <div className="riddle-box">
              <p className="riddle-text">
                "Together we are more than the sum of our parts.
                When connection meets power, what starts?"
              </p>
              <div className="clues">
                <span className="clue">7 Letters</span>
                <span className="clue">S _ _ _ _ _ Y</span>
              </div>
            </div>

            {!solved ? (
              <form className="answer-form" onSubmit={checkAnswer}>
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button type="submit">Submit Solution <ChevronRight size={18} /></button>
              </form>
            ) : (
              <motion.div
                className="success-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle2 color="#22c55e" size={32} />
                <h3>Solved!</h3>
                <p>You've contributed to the Community IQ.</p>
              </motion.div>
            )}
          </div>

          <div className="quest-stats">
            <div className="mini-stat">
              <Brain size={18} />
              <span>842 Solved</span>
            </div>
            <div className="mini-stat">
              <Cpu size={18} />
              <span>94,200 Total Efficiency</span>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
