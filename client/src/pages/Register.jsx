import React, { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // ==========================================
    // REGISTER
    // ==========================================

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(
                    data.message ||
                    "Registration successful!"
                );

                window.location.href = "/login";
            } else {
                setMessage(
                    data.message ||
                    "Registration failed."
                );
            }
        } catch (error) {
            console.error(error);

            setMessage(
                "Cannot connect to server. Make sure your backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOGIN
    // ==========================================

    const goToLogin = () => {
        window.location.href = "/login";
    };

    return (
        <>
            <style>{`

                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #root {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    min-height: 100%;
                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Arial,
                        sans-serif;
                }

                body {
                    background: #c8cbe0;
                }

                /* =========================================
                   PAGE
                ========================================= */

                .register-page {
                    min-height: 100vh;
                    width: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 35px;

                    position: relative;
                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 8% 12%,
                            rgba(112, 105, 196, 0.25),
                            transparent 25%
                        ),
                        radial-gradient(
                            circle at 90% 85%,
                            rgba(154, 145, 218, 0.25),
                            transparent 30%
                        ),
                        linear-gradient(
                            135deg,
                            #b8bdd3 0%,
                            #d8d9e7 50%,
                            #c1c4d9 100%
                        );
                }

                /* =========================================
                   BACKGROUND BLOBS
                ========================================= */

                .bg-circle {
                    position: absolute;

                    border-radius: 50%;

                    pointer-events: none;

                    filter: blur(5px);

                    opacity: 0.55;
                }

                .bg-circle-one {
                    width: 300px;
                    height: 300px;

                    left: -100px;
                    top: -100px;

                    background:
                        radial-gradient(
                            circle,
                            rgba(91, 84, 170, 0.30),
                            transparent 70%
                        );
                }

                .bg-circle-two {
                    width: 350px;
                    height: 350px;

                    right: -140px;
                    bottom: -130px;

                    background:
                        radial-gradient(
                            circle,
                            rgba(123, 111, 192, 0.30),
                            transparent 70%
                        );
                }

                .bg-circle-three {
                    width: 180px;
                    height: 180px;

                    right: 15%;
                    top: 8%;

                    background:
                        radial-gradient(
                            circle,
                            rgba(255, 255, 255, 0.35),
                            transparent 70%
                        );
                }

                /* =========================================
                   MAIN CONTAINER
                ========================================= */

                .register-wrapper {
                    width: 100%;
                    max-width: 1080px;

                    min-height: 650px;

                    display: grid;

                    grid-template-columns:
                        1.05fr
                        0.95fr;

                    position: relative;

                    z-index: 5;

                    overflow: hidden;

                    border-radius: 28px;

                    background: #f8f8fb;

                    box-shadow:
                        0 30px 70px
                        rgba(37, 34, 63, 0.20);

                    border:
                        1px solid
                        rgba(255, 255, 255, 0.65);
                }

                /* =========================================
                   LEFT SIDE
                ========================================= */

                .register-visual {
                    position: relative;

                    padding: 38px;

                    overflow: hidden;

                    display: flex;

                    flex-direction: column;

                    justify-content: space-between;

                    background:
                        linear-gradient(
                            145deg,
                            #e8e8f7 0%,
                            #d7d9f0 48%,
                            #c4c8e5 100%
                        );
                }

                /* =========================================
                   BRAND
                ========================================= */

                .brand {
                    display: flex;

                    align-items: center;

                    gap: 10px;

                    position: relative;

                    z-index: 5;
                }

                .brand-logo {
                    width: 38px;
                    height: 38px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    border-radius: 12px;

                    background: #29263c;

                    color: white;

                    font-size: 18px;

                    font-weight: 900;

                    box-shadow:
                        0 8px 18px
                        rgba(43, 39, 63, 0.18);
                }

                .brand-name {
                    color: #27243a;

                    font-size: 15px;

                    font-weight: 800;

                    letter-spacing: -0.2px;
                }

                .brand-subtitle {
                    margin-top: 2px;

                    color: #716f82;

                    font-size: 10px;
                }

                /* =========================================
                   LEFT HERO CONTENT
                ========================================= */

                .visual-content {
                    position: relative;

                    z-index: 4;

                    margin-top: auto;

                    margin-bottom: 20px;
                }

                .small-label {
                    display: inline-flex;

                    align-items: center;

                    gap: 7px;

                    padding: 7px 11px;

                    border-radius: 30px;

                    background:
                        rgba(255, 255, 255, 0.58);

                    border:
                        1px solid
                        rgba(255, 255, 255, 0.65);

                    color: #5e5b72;

                    font-size: 9px;

                    font-weight: 800;

                    text-transform: uppercase;

                    letter-spacing: 1.2px;

                    backdrop-filter: blur(8px);
                }

                .small-label-dot {
                    width: 6px;
                    height: 6px;

                    border-radius: 50%;

                    background: #5b52a3;
                }

                .visual-content h1 {
                    max-width: 450px;

                    margin:
                        18px 0 0;

                    color: #242237;

                    font-size: 46px;

                    line-height: 1.02;

                    letter-spacing: -2.4px;

                    font-weight: 700;
                }

                .visual-content h1 span {
                    color: #5c55a2;
                }

                .visual-content p {
                    max-width: 400px;

                    margin:
                        18px 0 0;

                    color: #68677a;

                    font-size: 13px;

                    line-height: 1.65;
                }

                /* =========================================
                   ABSTRACT VISUAL
                ========================================= */

                .abstract-scene {
                    position: absolute;

                    right: -10px;
                    bottom: 40px;

                    width: 420px;
                    height: 270px;

                    pointer-events: none;
                }

                .scene-glow {
                    position: absolute;

                    width: 260px;
                    height: 160px;

                    right: 30px;
                    bottom: 15px;

                    border-radius: 50%;

                    background:
                        rgba(111, 101, 184, 0.28);

                    filter: blur(35px);
                }

                .scene-card {
                    position: absolute;

                    width: 270px;
                    height: 150px;

                    right: 40px;
                    bottom: 25px;

                    border-radius: 25px;

                    transform:
                        rotate(-8deg);

                    background:
                        linear-gradient(
                            145deg,
                            rgba(255,255,255,0.92),
                            rgba(218,220,241,0.85)
                        );

                    border:
                        1px solid
                        rgba(255,255,255,0.8);

                    box-shadow:
                        0 25px 45px
                        rgba(74, 68, 124, 0.20);
                }

                .scene-card::before {
                    content: "";

                    position: absolute;

                    width: 90px;
                    height: 90px;

                    border-radius: 50%;

                    left: 25px;
                    top: 30px;

                    background:
                        radial-gradient(
                            circle at 35% 30%,
                            #ffffff,
                            #aaa7dc 55%,
                            #7771ba 100%
                        );

                    box-shadow:
                        0 10px 25px
                        rgba(79, 72, 143, 0.25);
                }

                .scene-card::after {
                    content: "";

                    position: absolute;

                    width: 90px;
                    height: 12px;

                    right: 30px;
                    top: 38px;

                    border-radius: 20px;

                    background: #9692c7;

                    box-shadow:
                        0 25px 0 #c1c0dd,
                        0 50px 0 #d2d2e7;
                }

                .scene-orb {
                    position: absolute;

                    width: 105px;
                    height: 105px;

                    border-radius: 50%;

                    right: 20px;
                    top: 5px;

                    background:
                        linear-gradient(
                            145deg,
                            #eeeeff,
                            #aaa8d9
                        );

                    box-shadow:
                        0 20px 35px
                        rgba(71, 67, 125, 0.20);

                    transform:
                        rotate(15deg);
                }

                .scene-orb::after {
                    content: "";

                    position: absolute;

                    inset: 11px;

                    border-radius: 50%;

                    border:
                        2px solid
                        rgba(88, 80, 158, 0.35);
                }

                /* =========================================
                   LEFT BOTTOM FEATURES
                ========================================= */

                .visual-features {
                    position: relative;

                    z-index: 5;

                    display: flex;

                    gap: 8px;

                    flex-wrap: wrap;
                }

                .visual-feature {
                    padding: 9px 12px;

                    border-radius: 10px;

                    background:
                        rgba(255,255,255,0.48);

                    border:
                        1px solid
                        rgba(255,255,255,0.60);

                    color: #5e5c70;

                    font-size: 9px;

                    font-weight: 700;

                    backdrop-filter: blur(8px);
                }

                /* =========================================
                   RIGHT FORM SECTION
                ========================================= */

                .register-form-section {
                    display: flex;

                    align-items: center;

                    justify-content: center;

                    padding:
                        45px 55px;

                    background: #fafafd;
                }

                .register-form {
                    width: 100%;

                    max-width: 360px;
                }

                /* =========================================
                   TOP NAV
                ========================================= */

                .form-top {
                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    margin-bottom: 35px;
                }

                .form-top-text {
                    color: #9694a3;

                    font-size: 10px;
                }

                .login-top-button {
                    border: none;

                    background: transparent;

                    color: #403b61;

                    font-size: 10px;

                    font-weight: 800;

                    cursor: pointer;

                    padding: 8px 10px;

                    border-radius: 8px;

                    transition: 0.2s ease;
                }

                .login-top-button:hover {
                    background: #eeeeF8;

                    color: #5b53a2;
                }

                /* =========================================
                   HEADING
                ========================================= */

                .register-heading {
                    margin-bottom: 28px;
                }

                .register-heading h2 {
                    margin: 0;

                    color: #242237;

                    font-size: 31px;

                    font-weight: 700;

                    letter-spacing: -1.2px;
                }

                .register-heading p {
                    margin:
                        8px 0 0;

                    color: #858392;

                    font-size: 11px;

                    line-height: 1.5;
                }

                /* =========================================
                   MESSAGE
                ========================================= */

                .register-message {
                    display: flex;

                    align-items: center;

                    gap: 8px;

                    padding:
                        11px 13px;

                    margin-bottom: 17px;

                    border-radius: 10px;

                    border:
                        1px solid
                        #f1cccc;

                    background:
                        #fff4f4;

                    color: #c34d4d;

                    font-size: 10px;
                }

                /* =========================================
                   FIELD
                ========================================= */

                .register-field {
                    margin-bottom: 17px;
                }

                .register-field label {
                    display: block;

                    margin-bottom: 7px;

                    color: #555263;

                    font-size: 10px;

                    font-weight: 700;
                }

                /* =========================================
                   INPUT WRAPPER
                ========================================= */

                .register-input-wrap {
                    position: relative;
                }

                .register-icon {
                    position: absolute;

                    left: 14px;

                    top: 50%;

                    transform:
                        translateY(-50%);

                    color: #aaa8b8;

                    font-size: 13px;

                    z-index: 2;
                }

                /* =========================================
                   INPUT
                ========================================= */

                .register-input {
                    width: 100%;

                    height: 48px;

                    padding:
                        0 42px;

                    border:
                        1px solid
                        #e4e3eb;

                    border-radius: 11px;

                    outline: none;

                    background: #ffffff;

                    color: #302d42;

                    font-size: 12px;

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .register-input::placeholder {
                    color: #b4b2bd;
                }

                .register-input:hover {
                    border-color: #d4d2df;
                }

                .register-input:focus {
                    border-color: #8078bf;

                    background: #ffffff;

                    box-shadow:
                        0 0 0 3px
                        rgba(128, 120, 191, 0.10);
                }

                /* =========================================
                   PASSWORD BUTTON
                ========================================= */

                .register-password-toggle {
                    position: absolute;

                    right: 12px;

                    top: 50%;

                    transform:
                        translateY(-50%);

                    border: none;

                    background: transparent;

                    color: #aaa8b8;

                    cursor: pointer;

                    font-size: 14px;

                    padding: 4px;
                }

                .register-password-toggle:hover {
                    color: #5f58a0;
                }

                /* =========================================
                   BUTTON
                ========================================= */

                .register-button {
                    width: 100%;

                    height: 49px;

                    margin-top: 5px;

                    border: none;

                    border-radius: 11px;

                    background:
                        #29263c;

                    color: #ffffff;

                    font-size: 11px;

                    font-weight: 800;

                    letter-spacing: 0.2px;

                    cursor: pointer;

                    box-shadow:
                        0 10px 22px
                        rgba(42, 38, 60, 0.16);

                    transition:
                        all 0.25s ease;
                }

                .register-button:hover:not(:disabled) {
                    transform:
                        translateY(-2px);

                    background:
                        #4b4669;

                    box-shadow:
                        0 14px 28px
                        rgba(42, 38, 60, 0.22);
                }

                .register-button:active:not(:disabled) {
                    transform:
                        translateY(0);
                }

                .register-button:disabled {
                    opacity: 0.55;

                    cursor: not-allowed;
                }

                /* =========================================
                   LOGIN
                ========================================= */

                .back-login {
                    text-align: center;

                    margin-top: 22px;

                    color: #9694a2;

                    font-size: 10px;
                }

                .back-login button {
                    border: none;

                    background: transparent;

                    color: #5d55a0;

                    font-size: 10px;

                    font-weight: 800;

                    cursor: pointer;

                    margin-left: 4px;

                    padding: 0;
                }

                .back-login button:hover {
                    text-decoration: underline;
                }

                /* =========================================
                   SECURITY
                ========================================= */

                .register-security {
                    display: flex;

                    justify-content: center;

                    align-items: center;

                    gap: 5px;

                    margin-top: 22px;

                    color: #b0aeb9;

                    font-size: 9px;
                }

                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 850px) {

                    .register-page {
                        padding: 20px;
                    }

                    .register-wrapper {
                        max-width: 500px;

                        grid-template-columns: 1fr;

                        min-height: auto;
                    }

                    .register-visual {
                        min-height: 330px;

                        padding: 28px;
                    }

                    .visual-content h1 {
                        font-size: 34px;

                        letter-spacing: -1.6px;
                    }

                    .abstract-scene {
                        transform:
                            scale(0.75);

                        transform-origin:
                            bottom right;

                        right: -30px;

                        bottom: -10px;
                    }

                    .visual-content p {
                        max-width: 310px;
                    }

                    .register-form-section {
                        padding:
                            38px 30px;
                    }
                }

                @media (max-width: 480px) {

                    .register-page {
                        padding: 12px;
                    }

                    .register-wrapper {
                        border-radius: 22px;
                    }

                    .register-visual {
                        min-height: 300px;

                        padding: 23px;
                    }

                    .visual-content h1 {
                        font-size: 29px;
                    }

                    .visual-content p {
                        font-size: 11px;

                        max-width: 280px;
                    }

                    .visual-features {
                        display: none;
                    }

                    .abstract-scene {
                        opacity: 0.55;

                        transform:
                            scale(0.62);

                        right: -80px;
                        bottom: -25px;
                    }

                    .register-form-section {
                        padding:
                            30px 22px;
                    }

                    .form-top {
                        margin-bottom: 28px;
                    }

                    .register-heading h2 {
                        font-size: 27px;
                    }
                }

            `}</style>

            {/* =========================================
                PAGE
            ========================================= */}

            <div className="register-page">

                {/* Background */}

                <div className="bg-circle bg-circle-one"></div>
                <div className="bg-circle bg-circle-two"></div>
                <div className="bg-circle bg-circle-three"></div>


                {/* =====================================
                    MAIN CARD
                ===================================== */}

                <div className="register-wrapper">

                    {/* =================================
                        LEFT VISUAL
                    ================================= */}

                    <div className="register-visual">

                        {/* Brand */}

                        <div className="brand">

                            <div className="brand-logo">
                                ✓
                            </div>

                            <div>

                                <div className="brand-name">
                                    Smart Task
                                </div>

                                <div className="brand-subtitle">
                                    Productivity workspace
                                </div>

                            </div>

                        </div>


                        {/* Abstract Illustration */}

                        <div className="abstract-scene">

                            <div className="scene-glow"></div>

                            <div className="scene-orb"></div>

                            <div className="scene-card"></div>

                        </div>


                        {/* Hero Content */}

                        <div className="visual-content">

                            <div className="small-label">

                                <span className="small-label-dot"></span>

                                Smart productivity

                            </div>

                            <h1>

                                Organize your work.
                                <br />

                                <span>
                                    Achieve more.
                                </span>

                            </h1>

                            <p>

                                Everything you need to manage
                                your tasks, track your progress,
                                and stay focused — all in one
                                simple workspace.

                            </p>

                        </div>


                        {/* Features */}

                        <div className="visual-features">

                            <div className="visual-feature">
                                ✓ Easy to use
                            </div>

                            <div className="visual-feature">
                                ✓ Track progress
                            </div>

                            <div className="visual-feature">
                                ✓ Stay organized
                            </div>

                        </div>

                    </div>


                    {/* =================================
                        RIGHT FORM
                    ================================= */}

                    <div className="register-form-section">

                        <div className="register-form">

                            {/* Top */}

                            <div className="form-top">

                                <span className="form-top-text">
                                    Welcome to Smart Task
                                </span>

                                <button
                                    type="button"
                                    className="login-top-button"
                                    onClick={goToLogin}
                                >
                                    Sign in →
                                </button>

                            </div>


                            {/* Heading */}

                            <div className="register-heading">

                                <h2>
                                    Create account
                                </h2>

                                <p>
                                    Start organizing your tasks in
                                    just a few seconds.
                                </p>

                            </div>


                            {/* Message */}

                            {message && (
                                <div className="register-message">

                                    ⚠️

                                    <span>
                                        {message}
                                    </span>

                                </div>
                            )}


                            {/* Form */}

                            <form onSubmit={handleRegister}>

                                {/* NAME */}

                                <div className="register-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <div className="register-input-wrap">

                                        <span className="register-icon">
                                            👤
                                        </span>

                                        <input
                                            className="register-input"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div className="register-field">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="register-input-wrap">

                                        <span className="register-icon">
                                            ✉
                                        </span>

                                        <input
                                            className="register-input"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                </div>


                                {/* PASSWORD */}

                                <div className="register-field">

                                    <label>
                                        Password
                                    </label>

                                    <div className="register-input-wrap">

                                        <span className="register-icon">
                                            🔒
                                        </span>

                                        <input
                                            className="register-input"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Minimum 6 characters"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="register-password-toggle"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                        >
                                            {showPassword
                                                ? "🙈"
                                                : "👁"}
                                        </button>

                                    </div>

                                </div>


                                {/* CONFIRM PASSWORD */}

                                <div className="register-field">

                                    <label>
                                        Confirm Password
                                    </label>

                                    <div className="register-input-wrap">

                                        <span className="register-icon">
                                            🔒
                                        </span>

                                        <input
                                            className="register-input"
                                            type={
                                                showConfirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Repeat your password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="register-password-toggle"
                                            onClick={() =>
                                                setShowConfirm(
                                                    !showConfirm
                                                )
                                            }
                                        >
                                            {showConfirm
                                                ? "🙈"
                                                : "👁"}
                                        </button>

                                    </div>

                                </div>


                                {/* REGISTER BUTTON */}

                                <button
                                    type="submit"
                                    className="register-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create Account  →"}
                                </button>

                            </form>


                            {/* LOGIN */}

                            <div className="back-login">

                                Already have an account?

                                <button
                                    type="button"
                                    onClick={goToLogin}
                                >
                                    Sign in
                                </button>

                            </div>


                            {/* SECURITY */}

                            <div className="register-security">

                                🔒

                                Secure connection

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Register;