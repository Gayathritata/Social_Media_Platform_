import './Register.css'; // Changed import to Register.css
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import exploreBg from '../../assets/explore-bg.mp4';
import socialLogo from '../../assets/social-logo.png';

function Register() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dobRef = useRef(null);
    const genderRef = useRef(null);
    const addressRef = useRef(null);
    const interestsRef = useRef(null);
    const languageRef = useRef(null);

    const [password, setPassword] = useState("");
    const [passwordScore, setPasswordScore] = useState(0);
    const [step, setStep] = useState(1);       // Current step
    const [dob, setDob] = useState("");        // Date of Birth
    const [gender, setGender] = useState("");  // Gender
    const [address, setAddress] = useState(""); // Address
    const [interests, setInterests] = useState(""); // Interests
    const [language, setLanguage] = useState("");   // Preferred Language
    const [errors, setErrors] = useState({}); // For validation

    const checkPasswordStrength = (pwd) => {
        let score = 0;
        if (/[A-Z]/.test(pwd)) score++; // Uppercase
        if (/[a-z]/.test(pwd)) score++; // Lowercase
        if (/[0-9]/.test(pwd)) score++; // Number
        if (/[^A-Za-z0-9]/.test(pwd)) score++; // Special character
        setPasswordScore(score);
    };

    const getStrengthColor = () => {
        switch (passwordScore) {
            case 1: return "red";
            case 2: return "orange";
            case 3: return "yellow";
            case 4: return "green";
            default: return "lightgray";
        }
    };

    const validateStep = () => {
        let stepErrors = {};

        if (step === 1) {
            if (!nameRef.current.value.trim()) stepErrors.name = "Name is required";
            if (!emailRef.current.value.trim()) stepErrors.email = "Email is required";
            if (passwordScore < 4) stepErrors.password = "Password does not meet requirements";
        } else if (step === 2) {
            if (!dob) stepErrors.dob = "Date of Birth is required";
            if (!gender) stepErrors.gender = "Gender is required";
            if (!address.trim()) stepErrors.address = "Address is required";
        } else if (step === 3) {
            if (!interests.trim()) stepErrors.interests = "Interests are required";
            if (!language.trim()) stepErrors.language = "Preferred Language is required";
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep()) setStep(step + 1);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setErrors({});
        setStep(step - 1);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (validateStep()) {
            alert("Registration Successful!");
            // Reset form logic here
            setStep(1);
            setPassword("");
            setPasswordScore(0);
            setDob("");
            setGender("");
            setAddress("");
            setInterests("");
            setLanguage("");
            setErrors({});
        }
    };

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            if (nextRef) {
                nextRef.current.focus(); // Move to next input
            } else {
                // No next input → move to next step or register
                if (step < 3) {
                    handleNext(e);
                } else {
                    handleRegister(e);
                }
            }
        }
    };

    return (
        <div className="register-container split-screen">
            {/* Left Pane - Video & Branding */}
            <div className="left-pane">
                <video className="bg-video" autoPlay loop muted playsInline>
                    <source src={exploreBg} type="video/mp4" />
                </video>
                <div className="overlay">
                    <div className="brand-text">
                        <h1>Join Us</h1>
                        <p>Create an account to start your journey.</p>
                    </div>
                </div>
            </div>

            {/* Right Pane - Form */}
            <div className="right-pane">
                <div className="auth-box">
                    <div className="auth-header">
                        <h3>Register</h3>
                    </div>

                    <form>
                        {/* Step 1: Name,Email,Password */}
                        {step === 1 && (
                            <>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input ref={nameRef} type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        required onKeyDown={(e) => handleKeyDown(e, emailRef)} />
                                    {errors.name && <div className="text-danger" style={{ fontSize: '0.8rem' }}>{errors.name}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref={emailRef} type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        required onKeyDown={(e) => handleKeyDown(e, passwordRef)} />
                                    {errors.email && <div className="text-danger" style={{ fontSize: '0.8rem' }}>{errors.email}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input ref={passwordRef} type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        required value={password}
                                        onChange={(e) => { setPassword(e.target.value); checkPasswordStrength(e.target.value); }}
                                        onKeyDown={(e) => handleKeyDown(e, null)} />
                                    {errors.password && <div className="text-danger" style={{ fontSize: '0.8rem' }}>{errors.password}</div>}

                                    {/* Password Strength Bar */}
                                    <div style={{ height: "4px", width: "100%", backgroundColor: "#e0e0e0", borderRadius: "2px", marginTop: "8px" }}>
                                        <div style={{ height: "4px", width: `${(passwordScore / 4) * 100}%`, backgroundColor: getStrengthColor(), borderRadius: "2px", transition: "width 0.3s" }}></div>
                                    </div>

                                    {/* Password Requirements */}
                                    <small className="text-muted" style={{ display: 'block', marginTop: '5px', fontSize: '0.75rem' }}>
                                        Must have:
                                        <span style={{ color: /[A-Z]/.test(password) ? "green" : "inherit", margin: '0 3px' }}>1 Uppercase</span>,
                                        <span style={{ color: /[a-z]/.test(password) ? "green" : "inherit", margin: '0 3px' }}>1 Lowercase</span>,
                                        <span style={{ color: /[0-9]/.test(password) ? "green" : "inherit", margin: '0 3px' }}>1 Number</span>,
                                        <span style={{ color: /[^A-Za-z0-9]/.test(password) ? "green" : "inherit", margin: '0 3px' }}>1 Special</span>
                                    </small>
                                </div>

                                <button className="btn-primary" onClick={handleNext}>Next</button>
                            </>
                        )}

                        {/* Step 2: DOB, Gender, Address */}
                        {step === 2 && (
                            <>
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input ref={dobRef} type="date" className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                                        value={dob} onChange={(e) => setDob(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, genderRef)} />
                                    {errors.dob && <div className="text-danger">{errors.dob}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <select ref={genderRef} className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                                        value={gender} onChange={(e) => setGender(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, addressRef)}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea ref={addressRef} className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, null)}></textarea>
                                    {errors.address && <div className="text-danger">{errors.address}</div>}
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="btn-secondary" onClick={handlePrev}>Previous</button>
                                    <button className="btn-primary" onClick={handleNext} style={{ marginTop: 0 }}>Next</button>
                                </div>
                            </>
                        )}

                        {/* Step 3: Interests, Preferred Language */}
                        {step === 3 && (
                            <>
                                <div className="form-group">
                                    <label>Interests</label>
                                    <input ref={interestsRef} type="text" className={`form-control ${errors.interests ? "is-invalid" : ""}`}
                                        value={interests} onChange={(e) => setInterests(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, languageRef)} />
                                    {errors.interests && <div className="text-danger">{errors.interests}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Preferred Language</label>
                                    <select
                                        ref={languageRef}
                                        className={`form-control ${errors.language ? "is-invalid" : ""}`}
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, null)}
                                    >
                                        <option value="">Select Preferred Language</option>
                                        <option value="English">English</option>
                                        <option value="Telugu">Telugu</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                        <option value="German">German</option>
                                        <option value="Chinese">Chinese</option>
                                    </select>
                                    {errors.language && <div className="text-danger">{errors.language}</div>}
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="btn-secondary" onClick={handlePrev}>Previous</button>
                                    <button className="btn-success" onClick={handleRegister}>Register</button>
                                </div>
                            </>
                        )}
                    </form>
                    <div className="auth-footer">
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
