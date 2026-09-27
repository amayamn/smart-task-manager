import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // =====================================
    // ADMIN LOGIN
    // =====================================

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Admin login failed"
                );

                return;
            }

            localStorage.setItem(
                "adminToken",
                data.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            navigate("/admin-dashboard");

        } catch (error) {
            console.error(error);

            setMessage(
                "Cannot connect to server. Please make sure the backend is running."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">

            <style>{`

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;

                    font-family:
                        Inter,
                        "Segoe UI",
                        Arial,
                        sans-serif;

                    background: #aaaed0;
                }

                /* =====================================
                   MAIN BACKGROUND
                ===================================== */

                .admin-login-page {
                    min-height: 100vh;

                    display: flex;

                    justify-content: center;
                    align-items: center;

                    padding: 35px 20px;

                    position: relative;

                    overflow: hidden;

                    background:
                        radial-gradient(
                            circle at 10% 15%,
                            rgba(255,255,255,0.25),
                            transparent 28%
                        ),
                        radial-gradient(
                            circle at 90% 80%,
                            rgba(181,168,225,0.35),
                            transparent 32%
                        ),
                        linear-gradient(
                            135deg,
                            #aeb2d2 0%,
                            #c8c8e2 42%,
                            #e8e7f4 100%
                        );
                }

                /* =====================================
                   BACKGROUND SHAPES
                ===================================== */

                .bg-shape {
                    position: absolute;

                    border-radius: 50%;

                    pointer-events: none;

                    filter: blur(2px);
                }

                .bg-shape-one {
                    width: 320px;
                    height: 320px;

                    top: -180px;
                    left: -120px;

                    background:
                        rgba(237,235,250,0.28);
                }

                .bg-shape-two {
                    width: 360px;
                    height: 360px;

                    right: -190px;
                    bottom: -170px;

                    background:
                        rgba(142,130,196,0.16);
                }

                .bg-shape-three {
                    width: 150px;
                    height: 150px;

                    left: 8%;
                    bottom: 8%;

                    background:
                        rgba(255,255,255,0.12);
                }

                /* =====================================
                   LOGIN CARD
                ===================================== */

                .admin-login-card {
                    width: 100%;

                    max-width: 440px;

                    position: relative;

                    z-index: 2;

                    padding: 38px 40px 32px;

                    border-radius: 28px;

                    background:
                        rgba(255,255,255,0.95);

                    border:
                        1px solid
                        rgba(255,255,255,0.98);

                    box-shadow:
                        0 30px 80px
                        rgba(57,51,92,0.18);

                    backdrop-filter:
                        blur(15px);

                    animation:
                        cardAppear 0.5s ease;
                }

                @keyframes cardAppear {

                    from {
                        opacity: 0;

                        transform:
                            translateY(20px)
                            scale(0.98);
                    }

                    to {
                        opacity: 1;

                        transform:
                            translateY(0)
                            scale(1);
                    }
                }

                /* =====================================
                   ADMIN ICON
                ===================================== */

                .admin-login-icon {
                    width: 68px;
                    height: 68px;

                    margin:
                        0 auto 19px;

                    border-radius: 20px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #3b3657,
                            #28243e
                        );

                    color: #ffffff;

                    font-size: 17px;

                    font-weight: 900;

                    letter-spacing: 0.5px;

                    box-shadow:
                        0 12px 28px
                        rgba(48,43,72,0.18);
                }

                /* =====================================
                   TITLE
                ===================================== */

                .admin-login-title {
                    margin: 0;

                    text-align: center;

                    color: #28243d;

                    font-size: 30px;

                    font-weight: 850;

                    letter-spacing:
                        -0.9px;
                }

                .admin-login-title span {
                    color: #766c9e;
                }

                .admin-login-subtitle {
                    margin:
                        8px 0 28px;

                    text-align: center;

                    color: #89849a;

                    font-size: 11px;

                    line-height: 1.6;
                }

                /* =====================================
                   FORM
                ===================================== */

                .admin-label {
                    display: block;

                    margin:
                        17px 0 8px;

                    color: #6f6a80;

                    font-size: 9px;

                    font-weight: 900;

                    letter-spacing:
                        1.2px;

                    text-transform:
                        uppercase;
                }

                .admin-input-wrapper {
                    position: relative;
                }

                .admin-input {
                    width: 100%;

                    height: 52px;

                    padding:
                        0 16px;

                    border:
                        1px solid #e0deea;

                    border-radius: 13px;

                    outline: none;

                    background:
                        #f8f7fc;

                    color:
                        #37324c;

                    font-size: 13px;

                    transition:
                        all 0.25s ease;
                }

                .admin-input::placeholder {
                    color:
                        #aaa6b5;
                }

                .admin-input:hover {
                    border-color:
                        #cbc6dd;
                }

                .admin-input:focus {
                    border-color:
                        #9289b8;

                    background:
                        #ffffff;

                    box-shadow:
                        0 0 0 4px
                        rgba(145,135,184,0.10);
                }

                /* =====================================
                   PASSWORD BUTTON
                ===================================== */

                .password-toggle {
                    position: absolute;

                    right: 9px;

                    top: 50%;

                    transform:
                        translateY(-50%);

                    height: 34px;

                    padding:
                        0 10px;

                    border:
                        1px solid #dedbe8;

                    border-radius: 9px;

                    background:
                        #efedf7;

                    color:
                        #69637d;

                    font-size: 8px;

                    font-weight: 900;

                    cursor: pointer;

                    transition:
                        all 0.2s ease;
                }

                .password-toggle:hover {
                    background:
                        #e4e1f1;

                    color:
                        #49425f;

                    border-color:
                        #c8c2dc;
                }

                /* =====================================
                   ERROR
                ===================================== */

                .admin-error {
                    margin-top:
                        15px;

                    padding:
                        12px 14px;

                    border-radius:
                        11px;

                    background:
                        #fff1f3;

                    border:
                        1px solid
                        #f0cbd2;

                    color:
                        #b65b6b;

                    font-size:
                        10px;

                    line-height:
                        1.5;
                }

                /* =====================================
                   LOGIN BUTTON
                ===================================== */

                .admin-login-button {
                    width: 100%;

                    height: 53px;

                    margin-top:
                        22px;

                    border:
                        none;

                    border-radius:
                        13px;

                    background:
                        #302b48;

                    color:
                        #ffffff;

                    font-size:
                        12px;

                    font-weight:
                        900;

                    cursor:
                        pointer;

                    box-shadow:
                        0 12px 28px
                        rgba(48,43,72,0.16);

                    transition:
                        all 0.25s ease;
                }

                .admin-login-button:hover {
                    transform:
                        translateY(-2px);

                    background:
                        #40395d;

                    box-shadow:
                        0 16px 32px
                        rgba(48,43,72,0.22);
                }

                .admin-login-button:active {
                    transform:
                        translateY(0);
                }

                .admin-login-button:disabled {
                    opacity:
                        0.6;

                    cursor:
                        not-allowed;

                    transform:
                        none;
                }

                /* =====================================
                   LOADING
                ===================================== */

                .login-loading {
                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        8px;
                }

                .loading-spinner {
                    width: 15px;
                    height: 15px;

                    border:
                        2px solid
                        rgba(255,255,255,0.35);

                    border-top-color:
                        #ffffff;

                    border-radius:
                        50%;

                    animation:
                        spin 0.7s linear infinite;
                }

                @keyframes spin {

                    to {
                        transform:
                            rotate(360deg);
                    }
                }

                /* =====================================
                   DIVIDER
                ===================================== */

                .login-divider {
                    display:
                        flex;

                    align-items:
                        center;

                    gap:
                        11px;

                    margin:
                        24px 0 4px;

                    color:
                        #aaa5b5;

                    font-size:
                        8px;

                    font-weight:
                        800;

                    letter-spacing:
                        1px;
                }

                .login-divider::before,
                .login-divider::after {
                    content: "";

                    height: 1px;

                    flex: 1;

                    background:
                        #e7e4ee;
                }

                /* =====================================
                   GO TO HOME BUTTON
                ===================================== */

                .user-login-button {
                    width: 100%;

                    margin-top:
                        13px;

                    padding:
                        12px;

                    border:
                        1px solid #dedbe8;

                    border-radius:
                        12px;

                    background:
                        #f7f6fb;

                    color:
                        #625c76;

                    font-size:
                        10px;

                    font-weight:
                        850;

                    cursor:
                        pointer;

                    transition:
                        all 0.2s ease;
                }

                .user-login-button:hover {
                    background:
                        #eeecf6;

                    border-color:
                        #cfc9df;

                    color:
                        #443e5a;
                }

                /* =====================================
                   SECURITY
                ===================================== */

                .security-text {
                    margin:
                        18px 0 0;

                    text-align:
                        center;

                    color:
                        #aaa6b3;

                    font-size:
                        8px;

                    line-height:
                        1.5;
                }

                .security-line {
                    display:
                        inline-flex;

                    align-items:
                        center;

                    gap:
                        6px;
                }

                .security-dot {
                    width: 6px;
                    height: 6px;

                    border-radius:
                        50%;

                    background:
                        #94b59f;
                }

                /* =====================================
                   BRAND TEXT
                ===================================== */

                .brand-text {
                    position: absolute;

                    top: 25px;
                    left: 30px;

                    color:
                        rgba(255,255,255,0.85);

                    font-size:
                        11px;

                    font-weight:
                        700;

                    letter-spacing:
                        0.3px;
                }

                .brand-right {
                    position: absolute;

                    top: 25px;
                    right: 30px;

                    color:
                        rgba(255,255,255,0.78);

                    font-size:
                        10px;

                    font-weight:
                        600;
                }

                /* =====================================
                   MOBILE
                ===================================== */

                @media (max-width: 600px) {

                    .admin-login-page {
                        padding:
                            65px 17px 30px;
                    }

                    .admin-login-card {
                        padding:
                            31px 22px 27px;

                        border-radius:
                            24px;
                    }

                    .admin-login-icon {
                        width: 61px;
                        height: 61px;

                        border-radius:
                            18px;

                        font-size:
                            15px;
                    }

                    .admin-login-title {
                        font-size:
                            27px;
                    }

                    .admin-login-subtitle {
                        margin-bottom:
                            23px;
                    }

                    .brand-text {
                        top: 18px;
                        left: 20px;

                        font-size:
                            9px;
                    }

                    .brand-right {
                        top: 18px;
                        right: 20px;

                        font-size:
                            8px;
                    }
                }

            `}</style>


            {/* =====================================
                BACKGROUND
            ===================================== */}

            <div className="bg-shape bg-shape-one"></div>

            <div className="bg-shape bg-shape-two"></div>

            <div className="bg-shape bg-shape-three"></div>


            {/* =====================================
                TOP BRAND
            ===================================== */}

            <div className="brand-text">
                SMART TASK MANAGER
            </div>

            <div className="brand-right">
                ADMIN PORTAL
            </div>


            {/* =====================================
                LOGIN CARD
            ===================================== */}

            <div className="admin-login-card">

                {/* ADMIN ICON */}

                <div className="admin-login-icon">
                    AD
                </div>


                {/* TITLE */}

                <h1 className="admin-login-title">
                    Admin <span>Login</span>
                </h1>


                <p className="admin-login-subtitle">
                    Secure access to your Smart Task Manager
                    administration panel.
                </p>


                {/* =====================================
                    FORM
                ===================================== */}

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <label className="admin-label">
                        Admin Email
                    </label>

                    <input
                        className="admin-input"
                        type="email"
                        placeholder="Enter admin email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        autoComplete="email"
                        required
                    />


                    {/* PASSWORD */}

                    <label className="admin-label">
                        Admin Password
                    </label>

                    <div className="admin-input-wrapper">

                        <input
                            className="admin-input"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            style={{
                                paddingRight: "75px",
                            }}
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
                                ? "HIDE"
                                : "SHOW"}
                        </button>

                    </div>


                    {/* ERROR */}

                    {message && (
                        <div className="admin-error">
                            {message}
                        </div>
                    )}


                    {/* LOGIN */}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <span className="login-loading">

                                <span className="loading-spinner"></span>

                                Signing in...

                            </span>

                        ) : (
                            "Sign In to Admin Panel"
                        )}

                    </button>

                </form>


                {/* DIVIDER */}

                <div className="login-divider">
                    OR
                </div>


                {/* =====================================
                    HOME BUTTON
                ===================================== */}

                <button
                    type="button"
                    className="user-login-button"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Go to Home
                </button>


                {/* SECURITY */}

                <p className="security-text">

                    <span className="security-line">

                        <span className="security-dot"></span>

                        Protected administration area

                    </span>

                </p>

            </div>

        </div>
    );
}

export default AdminLogin;