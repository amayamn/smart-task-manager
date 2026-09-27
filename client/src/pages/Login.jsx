import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // ==========================================
    // LOGIN
    // ==========================================

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Invalid email or password"
                );
                return;
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            window.location.href = "/dashboard";

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
    // NAVIGATION
    // ==========================================

    const goHome = () => {
        window.location.href = "/";
    };

    const goRegister = () => {
        window.location.href = "/register";
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
                    background: #b8bfd5;
                }


                /* =========================================
                   PAGE
                ========================================= */

                .login-page {
                    min-height: 100vh;

                    width: 100%;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    padding: 30px;

                    position: relative;

                    overflow: hidden;

                    background:
                        linear-gradient(
                            135deg,
                            #aeb6cf 0%,
                            #cdd0df 48%,
                            #b9bed3 100%
                        );
                }


                /* =========================================
                   BACKGROUND EFFECTS
                ========================================= */

                .login-bg-one {
                    position: absolute;

                    width: 420px;
                    height: 420px;

                    left: -180px;
                    top: -180px;

                    border-radius: 50%;

                    background:
                        radial-gradient(
                            circle,
                            rgba(100, 91, 175, 0.25),
                            transparent 70%
                        );

                    filter: blur(10px);

                    pointer-events: none;
                }


                .login-bg-two {
                    position: absolute;

                    width: 400px;
                    height: 400px;

                    right: -180px;
                    bottom: -180px;

                    border-radius: 50%;

                    background:
                        radial-gradient(
                            circle,
                            rgba(123, 112, 191, 0.25),
                            transparent 70%
                        );

                    pointer-events: none;
                }


                .login-bg-three {
                    position: absolute;

                    width: 170px;
                    height: 170px;

                    right: 12%;
                    top: 8%;

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,0.20);

                    filter: blur(20px);

                    pointer-events: none;
                }


                /* =========================================
                   HOME BUTTON
                ========================================= */

                .home-button {
                    position: absolute;

                    top: 25px;
                    left: 30px;

                    z-index: 10;

                    padding:
                        9px 15px;

                    border:
                        1px solid
                        rgba(255,255,255,0.55);

                    border-radius: 10px;

                    background:
                        rgba(255,255,255,0.45);

                    color: #37334a;

                    font-size: 10px;

                    font-weight: 700;

                    cursor: pointer;

                    backdrop-filter: blur(10px);

                    transition:
                        all 0.2s ease;
                }


                .home-button:hover {
                    background:
                        rgba(255,255,255,0.75);

                    transform:
                        translateY(-1px);
                }


                /* =========================================
                   MAIN CONTAINER
                ========================================= */

                .login-wrapper {
                    width: 100%;

                    max-width: 1080px;

                    min-height: 630px;

                    display: grid;

                    grid-template-columns:
                        1.08fr
                        0.92fr;

                    position: relative;

                    z-index: 5;

                    overflow: hidden;

                    border-radius: 27px;

                    background: #f9f9fb;

                    border:
                        1px solid
                        rgba(255,255,255,0.80);

                    box-shadow:
                        0 30px 80px
                        rgba(39,36,66,0.22);
                }


                /* =========================================
                   LEFT VISUAL SIDE
                ========================================= */

                .login-visual {
                    position: relative;

                    padding: 36px;

                    overflow: hidden;

                    display: flex;

                    flex-direction: column;

                    justify-content: space-between;

                    background:
                        linear-gradient(
                            145deg,
                            #ececf8 0%,
                            #dfe0f1 42%,
                            #c8cbe3 100%
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

                    z-index: 10;
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

                    font-size: 17px;

                    font-weight: 900;

                    box-shadow:
                        0 8px 20px
                        rgba(38,35,57,0.18);
                }


                .brand-name {
                    color: #29263c;

                    font-size: 15px;

                    font-weight: 800;

                    letter-spacing: -0.2px;
                }


                .brand-small {
                    margin-top: 2px;

                    color: #777487;

                    font-size: 9px;
                }


                /* =========================================
                   LEFT CONTENT
                ========================================= */

                .visual-content {
                    position: relative;

                    z-index: 8;

                    margin-top: auto;

                    margin-bottom: 20px;
                }


                .visual-label {
                    display: inline-flex;

                    align-items: center;

                    gap: 7px;

                    padding:
                        7px 11px;

                    border-radius: 30px;

                    background:
                        rgba(255,255,255,0.55);

                    border:
                        1px solid
                        rgba(255,255,255,0.65);

                    color: #625e73;

                    font-size: 8px;

                    font-weight: 800;

                    text-transform: uppercase;

                    letter-spacing: 1.2px;

                    backdrop-filter:
                        blur(8px);
                }


                .visual-dot {
                    width: 6px;
                    height: 6px;

                    border-radius: 50%;

                    background: #655ba8;
                }


                .visual-content h1 {
                    max-width: 450px;

                    margin:
                        17px 0 0;

                    color: #27233a;

                    font-size: 45px;

                    line-height: 1.03;

                    letter-spacing: -2.3px;

                    font-weight: 700;
                }


                .visual-content h1 span {
                    color: #6258a2;
                }


                .visual-content p {
                    max-width: 390px;

                    margin:
                        18px 0 0;

                    color: #6e6b7c;

                    font-size: 12px;

                    line-height: 1.7;
                }


                /* =========================================
                   ABSTRACT PURPLE OBJECT
                ========================================= */

                .visual-art {
                    position: absolute;

                    right: -30px;

                    bottom: 35px;

                    width: 440px;

                    height: 310px;

                    pointer-events: none;
                }


                .art-glow {
                    position: absolute;

                    width: 300px;
                    height: 180px;

                    right: 35px;
                    bottom: 15px;

                    border-radius: 50%;

                    background:
                        rgba(101,91,171,0.24);

                    filter: blur(35px);
                }


                /* large platform */

                .art-platform {
                    position: absolute;

                    width: 290px;
                    height: 145px;

                    right: 35px;
                    bottom: 25px;

                    border-radius: 25px;

                    background:
                        linear-gradient(
                            145deg,
                            #f7f7ff,
                            #c8c7e4
                        );

                    border:
                        1px solid
                        rgba(255,255,255,0.8);

                    transform:
                        rotate(-8deg);

                    box-shadow:
                        0 25px 50px
                        rgba(71,66,126,0.20);
                }


                .art-platform::before {
                    content: "";

                    position: absolute;

                    width: 92px;
                    height: 92px;

                    left: 30px;
                    top: 28px;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            145deg,
                            #fafaff,
                            #9d99d0
                        );

                    box-shadow:
                        0 12px 25px
                        rgba(80,74,147,0.24);
                }


                .art-platform::after {
                    content: "";

                    position: absolute;

                    width: 105px;
                    height: 10px;

                    right: 30px;
                    top: 38px;

                    border-radius: 20px;

                    background: #aaa7d0;

                    box-shadow:
                        0 25px 0 #c5c4df,
                        0 50px 0 #d6d5e8;
                }


                /* floating sphere */

                .art-sphere {
                    position: absolute;

                    width: 110px;
                    height: 110px;

                    right: 25px;
                    top: 12px;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            145deg,
                            #f5f4ff,
                            #a7a3d7
                        );

                    box-shadow:
                        0 20px 35px
                        rgba(72,67,132,0.22);

                    transform:
                        rotate(12deg);
                }


                .art-sphere::after {
                    content: "";

                    position: absolute;

                    inset: 11px;

                    border-radius: 50%;

                    border:
                        2px solid
                        rgba(87,80,151,0.30);
                }


                /* small circle */

                .art-circle {
                    position: absolute;

                    width: 55px;
                    height: 55px;

                    left: 40px;
                    bottom: 15px;

                    border-radius: 50%;

                    background:
                        linear-gradient(
                            145deg,
                            #e9e8f8,
                            #aaa6d5
                        );

                    box-shadow:
                        0 12px 25px
                        rgba(75,69,134,0.18);
                }


                /* =========================================
                   LEFT BOTTOM FEATURES
                ========================================= */

                .visual-features {
                    position: relative;

                    z-index: 10;

                    display: flex;

                    gap: 8px;

                    flex-wrap: wrap;
                }


                .visual-feature {
                    padding:
                        8px 11px;

                    border-radius: 9px;

                    background:
                        rgba(255,255,255,0.48);

                    border:
                        1px solid
                        rgba(255,255,255,0.65);

                    color: #626074;

                    font-size: 8px;

                    font-weight: 700;

                    backdrop-filter:
                        blur(8px);
                }


                /* =========================================
                   RIGHT FORM
                ========================================= */

                .login-form-section {
                    display: flex;

                    align-items: center;

                    justify-content: center;

                    padding:
                        45px 55px;

                    background:
                        #fbfbfd;
                }


                .login-form {
                    width: 100%;

                    max-width: 355px;
                }


                /* =========================================
                   FORM TOP
                ========================================= */

                .form-top {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    margin-bottom: 40px;
                }


                .form-welcome {
                    color: #aaa7b3;

                    font-size: 9px;
                }


                .form-home {
                    border: none;

                    background: transparent;

                    color: #5d5688;

                    font-size: 10px;

                    font-weight: 800;

                    cursor: pointer;

                    padding: 7px 9px;

                    border-radius: 8px;

                    transition: 0.2s ease;
                }


                .form-home:hover {
                    background: #f0eff8;
                }


                /* =========================================
                   HEADING
                ========================================= */

                .form-heading {
                    margin-bottom: 28px;
                }


                .form-heading h2 {
                    margin: 0;

                    color: #29253b;

                    font-size: 31px;

                    font-weight: 700;

                    letter-spacing: -1.3px;
                }


                .form-heading p {
                    margin:
                        8px 0 0;

                    color: #898593;

                    font-size: 11px;

                    line-height: 1.5;
                }


                /* =========================================
                   ERROR MESSAGE
                ========================================= */

                .error-message {
                    display: flex;

                    align-items: center;

                    gap: 7px;

                    padding:
                        11px 13px;

                    margin-bottom: 18px;

                    border:
                        1px solid
                        #ecd0d5;

                    border-radius: 9px;

                    background:
                        #fff5f6;

                    color: #aa5261;

                    font-size: 10px;

                    line-height: 1.4;
                }


                /* =========================================
                   FIELD
                ========================================= */

                .field {
                    margin-bottom: 18px;
                }


                .field label {
                    display: block;

                    margin-bottom: 7px;

                    color: #504b5e;

                    font-size: 10px;

                    font-weight: 700;
                }


                .input-wrap {
                    position: relative;
                }


                .input-icon {
                    position: absolute;

                    left: 14px;

                    top: 50%;

                    transform:
                        translateY(-50%);

                    color: #aaa6b4;

                    font-size: 13px;

                    z-index: 2;
                }


                .field input {
                    width: 100%;

                    height: 48px;

                    padding:
                        0 42px;

                    border:
                        1px solid
                        #e1dfe7;

                    border-radius: 10px;

                    outline: none;

                    background:
                        #ffffff;

                    color: #312d40;

                    font-size: 12px;

                    transition:
                        all 0.2s ease;
                }


                .field input::placeholder {
                    color: #b2afba;
                }


                .field input:hover {
                    border-color:
                        #d1ceda;
                }


                .field input:focus {
                    border-color:
                        #8178b7;

                    box-shadow:
                        0 0 0 3px
                        rgba(129,120,183,0.10);
                }


                /* =========================================
                   PASSWORD TOGGLE
                ========================================= */

                .password-toggle {
                    position: absolute;

                    right: 11px;

                    top: 50%;

                    transform:
                        translateY(-50%);

                    border: none;

                    background: transparent;

                    color: #9994a5;

                    cursor: pointer;

                    font-size: 13px;

                    padding: 5px;
                }


                .password-toggle:hover {
                    color: #5d548f;
                }


                /* =========================================
                   LOGIN BUTTON
                ========================================= */

                .login-button {
                    width: 100%;

                    height: 49px;

                    margin-top: 4px;

                    border: none;

                    border-radius: 10px;

                    background:
                        #2c293e;

                    color: white;

                    font-size: 11px;

                    font-weight: 800;

                    letter-spacing: 0.2px;

                    cursor: pointer;

                    box-shadow:
                        0 10px 22px
                        rgba(44,41,62,0.15);

                    transition:
                        all 0.25s ease;
                }


                .login-button:hover:not(:disabled) {
                    transform:
                        translateY(-2px);

                    background:
                        #494360;

                    box-shadow:
                        0 14px 28px
                        rgba(44,41,62,0.21);
                }


                .login-button:active:not(:disabled) {
                    transform:
                        translateY(0);
                }


                .login-button:disabled {
                    opacity: 0.55;

                    cursor:
                        not-allowed;
                }


                /* =========================================
                   DIVIDER
                ========================================= */

                .divider {
                    display: flex;

                    align-items: center;

                    gap: 10px;

                    margin:
                        25px 0;
                }


                .divider::before,
                .divider::after {
                    content: "";

                    flex: 1;

                    height: 1px;

                    background:
                        #e8e5ec;
                }


                .divider span {
                    color: #aaa6b1;

                    font-size: 9px;
                }


                /* =========================================
                   REGISTER
                ========================================= */

                .register-area {
                    text-align: center;

                    color: #888491;

                    font-size: 10px;
                }


                .register-area button {
                    border: none;

                    background: transparent;

                    color: #6259a0;

                    font-size: 10px;

                    font-weight: 800;

                    cursor: pointer;

                    margin-left: 4px;

                    padding: 0;
                }


                .register-area button:hover {
                    color: #40376d;

                    text-decoration:
                        underline;
                }


                /* =========================================
                   SECURITY
                ========================================= */

                .security {
                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 5px;

                    margin-top: 23px;

                    color: #aaa6b1;

                    font-size: 8px;
                }


                /* =========================================
                   MOBILE
                ========================================= */

                @media (max-width: 850px) {

                    .login-page {
                        padding:
                            75px 20px 25px;
                    }


                    .login-wrapper {
                        max-width: 500px;

                        grid-template-columns:
                            1fr;

                        min-height: auto;
                    }


                    .login-visual {
                        min-height: 330px;

                        padding: 28px;
                    }


                    .visual-content h1 {
                        font-size: 35px;

                        letter-spacing: -1.7px;
                    }


                    .visual-content p {
                        max-width: 320px;
                    }


                    .visual-art {
                        transform:
                            scale(0.75);

                        transform-origin:
                            bottom right;

                        right: -70px;

                        bottom: -10px;
                    }


                    .login-form-section {
                        padding:
                            38px 30px;
                    }
                }


                @media (max-width: 480px) {

                    .login-page {
                        padding:
                            65px 12px 15px;
                    }


                    .home-button {
                        top: 17px;

                        left: 15px;
                    }


                    .login-wrapper {
                        border-radius:
                            21px;
                    }


                    .login-visual {
                        min-height: 295px;

                        padding: 23px;
                    }


                    .visual-content h1 {
                        font-size: 29px;
                    }


                    .visual-content p {
                        max-width: 275px;

                        font-size: 10px;
                    }


                    .visual-features {
                        display: none;
                    }


                    .visual-art {
                        opacity: 0.5;

                        transform:
                            scale(0.60);

                        right: -110px;

                        bottom: -30px;
                    }


                    .login-form-section {
                        padding:
                            30px 22px;
                    }


                    .form-top {
                        margin-bottom: 30px;
                    }


                    .form-heading h2 {
                        font-size: 27px;
                    }
                }

            `}</style>


            {/* =========================================
                PAGE
            ========================================= */}

            <div className="login-page">

                {/* BACKGROUND */}

                <div className="login-bg-one"></div>

                <div className="login-bg-two"></div>

                <div className="login-bg-three"></div>


                {/* HOME */}

                <button
                    className="home-button"
                    onClick={goHome}
                >
                    ← Back to Home
                </button>


                {/* =====================================
                    MAIN CARD
                ===================================== */}

                <div className="login-wrapper">


                    {/* =================================
                        LEFT SIDE
                    ================================= */}

                    <div className="login-visual">


                        {/* BRAND */}

                        <div className="brand">

                            <div className="brand-logo">
                                ✓
                            </div>

                            <div>

                                <div className="brand-name">
                                    Smart Task
                                </div>

                                <div className="brand-small">
                                    Productivity Workspace
                                </div>

                            </div>

                        </div>


                        {/* =================================
                            ABSTRACT ART
                        ================================= */}

                        <div className="visual-art">

                            <div className="art-glow"></div>

                            <div className="art-sphere"></div>

                            <div className="art-platform"></div>

                            <div className="art-circle"></div>

                        </div>


                        {/* CONTENT */}

                        <div className="visual-content">

                            <div className="visual-label">

                                <span className="visual-dot"></span>

                                Smart productivity

                            </div>


                            <h1>

                                Turn plans into

                                <br />

                                <span>
                                    progress.
                                </span>

                            </h1>


                            <p>

                                A simple workspace to organize
                                your tasks, monitor your progress,
                                and accomplish more every day.

                            </p>

                        </div>


                        {/* FEATURES */}

                        <div className="visual-features">

                            <div className="visual-feature">
                                ✓ Simple
                            </div>

                            <div className="visual-feature">
                                ✓ Organized
                            </div>

                            <div className="visual-feature">
                                ✓ Productive
                            </div>

                        </div>

                    </div>


                    {/* =================================
                        RIGHT SIDE
                    ================================= */}

                    <div className="login-form-section">

                        <div className="login-form">


                            {/* TOP */}

                            <div className="form-top">

                                <span className="form-welcome">
                                    Welcome back
                                </span>

                                <button
                                    className="form-home"
                                    onClick={goHome}
                                >
                                    Home →
                                </button>

                            </div>


                            {/* HEADING */}

                            <div className="form-heading">

                                <h2>
                                    Sign in
                                </h2>

                                <p>
                                    Enter your details to continue
                                    to your workspace.
                                </p>

                            </div>


                            {/* ERROR */}

                            {message && (

                                <div className="error-message">

                                    <span>
                                        ⚠️
                                    </span>

                                    <span>
                                        {message}
                                    </span>

                                </div>

                            )}


                            {/* FORM */}

                            <form onSubmit={handleLogin}>


                                {/* EMAIL */}

                                <div className="field">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="input-wrap">

                                        <span className="input-icon">
                                            ✉
                                        </span>

                                        <input
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

                                <div className="field">

                                    <label>
                                        Password
                                    </label>

                                    <div className="input-wrap">

                                        <span className="input-icon">
                                            🔒
                                        </span>

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
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
                                            className="password-toggle"
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


                                {/* LOGIN BUTTON */}

                                <button
                                    type="submit"
                                    className="login-button"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Signing in..."
                                        : "Sign In  →"}

                                </button>

                            </form>


                            {/* DIVIDER */}

                            <div className="divider">

                                <span>
                                    or
                                </span>

                            </div>


                            {/* REGISTER */}

                            <div className="register-area">

                                Don't have an account?

                                <button
                                    type="button"
                                    onClick={goRegister}
                                >
                                    Create account
                                </button>

                            </div>


                            {/* SECURITY */}

                            <div className="security">

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

export default Login;