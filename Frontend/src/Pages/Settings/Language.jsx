import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Languages } from "lucide-react";
import "./Language.css";

export default function Language() {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const languages = ["English"];

    return (
        <div className="language-page">
            <div className="language-header">
                <ArrowLeft className="back-arrow" size={24} onClick={() => navigate("/settings")} />
                <h2 className="page-title">Language</h2>
            </div>

            <div className="language-container">
                <div className="language-info">
                    <Languages size={40} className="lang-icon" />
                    <h3>Select Language</h3>
                    <p>Choose your preferred language for the application interface.</p>
                </div>

                <div className="language-list">
                    {languages.map((lang) => (
                        <div
                            key={lang}
                            className={`language-item ${selectedLanguage === lang ? "active" : ""}`}
                            onClick={() => setSelectedLanguage(lang)}
                        >
                            <span className="lang-name">{lang}</span>
                            {selectedLanguage === lang && <Check size={20} className="check-icon" />}
                        </div>
                    ))}
                </div>

                <div className="note-box">
                    <p>More languages will be added soon! 🌍</p>
                </div>
            </div>
        </div>
    );
}
