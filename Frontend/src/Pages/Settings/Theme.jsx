import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import "./Theme.css";

const Theme = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    const themes = [
        {
            id: "light",
            name: "Light Mode",
            icon: <Sun className="theme-icon" />,
            active: !isDarkMode,
            action: () => isDarkMode && toggleTheme(),
            description: "Clean and bright interface for daylight use."
        },
        {
            id: "dark",
            name: "Dark Mode",
            icon: <Moon className="theme-icon" />,
            active: isDarkMode,
            action: () => !isDarkMode && toggleTheme(),
            description: "Easy on the eyes, perfect for low-light environments."
        }
    ];

    return (
        <div className="theme-page">
            <div className="theme-header">
                <ArrowLeft
                    className="back-arrow"
                    size={24}
                    onClick={() => navigate('/settings')}
                />

                <h1>Appearance</h1>
            </div>

            <div className="theme-container">
                <section className="theme-section">
                    <h2>Color Theme</h2>
                    <p className="section-desc">Choose how the app looks to you.</p>

                    <div className="theme-grid">
                        {themes.map((t) => (
                            <div
                                key={t.id}
                                className={`theme-card ${t.active ? 'active' : ''}`}
                                onClick={t.action}
                            >
                                <div className="theme-card-header">
                                    {t.icon}
                                    <div className="radio-circle">
                                        {t.active && <div className="radio-inner" />}
                                    </div>
                                </div>
                                <h3>{t.name}</h3>
                                <p>{t.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="theme-options">
                    <div className="option-row">
                        <div className="option-info">
                            <Monitor size={20} />
                            <div>
                                <h4>System Preference</h4>
                                <p>Sync with your device settings</p>
                            </div>
                        </div>
                        <label className="switch">
                            <input type="checkbox" disabled />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Theme;
