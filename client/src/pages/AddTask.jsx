import React, { useEffect, useState } from "react";

function AddTask() {
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =====================================================
    // LOAD USER
    // =====================================================

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            window.location.href = "/login";
            return;
        }

        try {
            setUser(JSON.parse(savedUser));
        } catch (err) {
            console.error(err);
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    }, []);

    // =====================================================
    // NAVIGATION
    // =====================================================

    const goTo = (path) => {
        window.location.href = path;
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    // =====================================================
    // USER INITIAL
    // =====================================================

    const userInitial = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "U";

    // =====================================================
    // ADD TASK
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        const userId = user?._id || user?.id;

        if (!userId) {
            setError("User information is missing.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        userId: userId,
                        title: title.trim(),
                        description: description.trim(),
                        priority,
                        dueDate: dueDate || null,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                        "Failed to create task."
                );
                return;
            }

            setMessage("Task created successfully!");

            setTitle("");
            setDescription("");
            setPriority("Low");
            setDueDate("");

            setTimeout(() => {
                window.location.href = "/my-tasks";
            }, 900);
        } catch (err) {
            console.error(err);
            setError("Cannot connect to server.");
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <>
            <style>{`

                * {
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    margin: 0;

                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Arial,
                        sans-serif;

                    background: #e8e7f2;
                }

                button,
                input,
                textarea {
                    font-family: inherit;
                }

                /* =================================================
                   APP
                ================================================= */

                .dashboard-app {
                    min-height: 100vh;

                    background:
                        radial-gradient(
                            circle at 85% 5%,
                            rgba(187, 179, 235, 0.38),
                            transparent 28%
                        ),
                        radial-gradient(
                            circle at 5% 80%,
                            rgba(210, 204, 239, 0.35),
                            transparent 30%
                        ),
                        #e9e8f2;

                    color: #242238;
                }

                /* =================================================
                   SIDEBAR
                   EXACT DASHBOARD SIDEBAR
                ================================================= */

                .dashboard-sidebar {
                    position: fixed;

                    left: 0;
                    top: 0;
                    bottom: 0;

                    width: 235px;

                    padding: 28px 18px;

                    background:
                        rgba(248, 247, 252, 0.94);

                    border-right:
                        1px solid #dcd9e8;

                    display: flex;

                    flex-direction: column;

                    justify-content: space-between;

                    z-index: 100;

                    backdrop-filter: blur(15px);
                }

                .brand-area {
                    display: flex;

                    align-items: center;

                    gap: 11px;

                    padding:
                        4px 8px 35px;
                }

                .brand-logo {
                    width: 40px;
                    height: 40px;

                    border-radius: 12px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #302a4b,
                            #65568f
                        );

                    color: white;

                    font-size: 12px;

                    font-weight: 900;

                    box-shadow:
                        0 8px 20px
                        rgba(67, 55, 103, 0.2);
                }

                .brand-title {
                    color: #29243b;

                    font-size: 15px;

                    font-weight: 800;
                }

                .brand-subtitle {
                    margin-top: 3px;

                    color: #9994a8;

                    font-size: 7px;

                    letter-spacing: 1.1px;

                    font-weight: 700;
                }

                .nav-title {
                    padding:
                        0 11px 10px;

                    color: #aaa5b4;

                    font-size: 8px;

                    font-weight: 800;

                    letter-spacing: 1.5px;
                }

                .nav-item {
                    width: 100%;

                    border: none;

                    border-radius: 10px;

                    background: transparent;

                    color: #777287;

                    padding: 11px 12px;

                    margin-bottom: 5px;

                    display: flex;

                    align-items: center;

                    gap: 11px;

                    font-size: 11px;

                    font-weight: 700;

                    text-align: left;

                    cursor: pointer;

                    transition:
                        background 0.2s ease,
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .nav-item:hover {
                    background: #eeecf5;

                    color: #4b416b;

                    transform: translateX(2px);
                }

                .nav-item.active {
                    background:
                        linear-gradient(
                            90deg,
                            #e4dff3,
                            #f0edf8
                        );

                    color: #4e416e;

                    box-shadow:
                        inset 3px 0 0 #6d5a9d;
                }

                .nav-icon {
                    width: 27px;
                    height: 27px;

                    border-radius: 8px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #ebe9f2;

                    color: #77708b;

                    font-size: 10px;

                    font-weight: 900;
                }

                .nav-item.active .nav-icon {
                    background: #d9d2eb;

                    color: #57477d;
                }

                .sidebar-bottom {
                    border-top:
                        1px solid #e1dfe9;

                    padding-top: 17px;
                }

                .profile-area {
                    display: flex;

                    align-items: center;

                    gap: 10px;

                    padding:
                        7px 6px 14px;
                }

                .profile-avatar {
                    width: 37px;
                    height: 37px;

                    flex-shrink: 0;

                    border-radius: 11px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #b7acd8,
                            #7b6b9e
                        );

                    color: white;

                    font-size: 12px;

                    font-weight: 900;
                }

                .profile-details {
                    min-width: 0;

                    display: flex;

                    flex-direction: column;

                    gap: 3px;
                }

                .profile-details strong {
                    color: #39334b;

                    font-size: 10px;

                    overflow: hidden;

                    text-overflow: ellipsis;

                    white-space: nowrap;
                }

                .profile-details span {
                    color: #a19cab;

                    font-size: 8px;
                }

                .logout-button {
                    width: 100%;

                    padding: 9px;

                    border:
                        1px solid #ddd9e7;

                    border-radius: 9px;

                    background: #f7f6fa;

                    color: #777181;

                    font-size: 9px;

                    font-weight: 800;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .logout-button:hover {
                    background: #eeeaf5;

                    color: #514569;
                }

                /* =================================================
                   MAIN
                ================================================= */

                .dashboard-main {
                    margin-left: 235px;

                    min-height: 100vh;

                    padding:
                        28px 5% 50px;
                }

                /* =================================================
                   TOP BAR
                ================================================= */

                .topbar {
                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    margin-bottom: 28px;
                }

                .top-label {
                    color: #8c83a6;

                    font-size: 8px;

                    font-weight: 900;

                    letter-spacing: 1.8px;

                    margin-bottom: 5px;
                }

                .top-title {
                    margin: 0;

                    color: #28243b;

                    font-size: 29px;

                    line-height: 1;

                    letter-spacing: -1px;
                }

                .top-right {
                    display: flex;

                    align-items: center;

                    gap: 13px;
                }

                .date-area {
                    display: flex;

                    flex-direction: column;

                    align-items: flex-end;

                    gap: 3px;
                }

                .date-label {
                    color: #a09aa9;

                    font-size: 7px;

                    font-weight: 900;

                    letter-spacing: 1.2px;
                }

                .date-value {
                    color: #575164;

                    font-size: 10px;

                    font-weight: 700;
                }

                .top-avatar {
                    width: 40px;
                    height: 40px;

                    border-radius: 12px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #b8addb,
                            #796b9e
                        );

                    color: white;

                    font-size: 12px;

                    font-weight: 900;

                    box-shadow:
                        0 7px 18px
                        rgba(92, 77, 126, 0.18);
                }

                /* =================================================
                   PAGE INTRO
                ================================================= */

                .section-header {
                    margin-bottom: 14px;
                }

                .section-label {
                    display: block;

                    color: #8b83a1;

                    font-size: 7px;

                    font-weight: 900;

                    letter-spacing: 1.7px;

                    margin-bottom: 4px;
                }

                .section-title {
                    margin: 0;

                    color: #29243b;

                    font-size: 19px;

                    letter-spacing: -0.4px;
                }

                .page-description {
                    margin:
                        7px 0 25px;

                    color: #9891a2;

                    font-size: 10px;

                    line-height: 1.6;
                }

                /* =================================================
                   FORM AREA
                ================================================= */

                .form-layout {
                    display: grid;

                    grid-template-columns:
                        1.45fr 1fr;

                    gap: 15px;

                    margin-bottom: 30px;
                }

                .form-card {
                    padding: 23px;

                    border-radius: 16px;

                    background:
                        rgba(255,255,255,0.94);

                    border:
                        1px solid #dedbe8;

                    box-shadow:
                        0 8px 25px
                        rgba(75, 67, 99, 0.07);
                }

                .form-card-title {
                    margin: 0;

                    color: #29243b;

                    font-size: 18px;
                }

                .form-card-subtitle {
                    margin:
                        5px 0 20px;

                    color: #aaa4b2;

                    font-size: 8px;
                }

                /* =================================================
                   MESSAGE
                ================================================= */

                .success-message {
                    margin-bottom: 15px;

                    padding: 11px 13px;

                    border-radius: 9px;

                    background: #e5eee8;

                    border:
                        1px solid #c7dbcc;

                    color: #62826c;

                    font-size: 9px;

                    font-weight: 800;
                }

                .error-message {
                    margin-bottom: 15px;

                    padding: 11px 13px;

                    border-radius: 9px;

                    background: #fbf3f4;

                    border:
                        1px solid #ead9dc;

                    color: #9b6972;

                    font-size: 9px;

                    font-weight: 800;
                }

                /* =================================================
                   FORM GROUP
                ================================================= */

                .form-group {
                    margin-bottom: 17px;
                }

                .form-label {
                    display: block;

                    margin-bottom: 7px;

                    color: #514b5e;

                    font-size: 9px;

                    font-weight: 800;
                }

                .required {
                    color: #9a706a;
                }

                .form-input,
                .form-textarea {
                    width: 100%;

                    border:
                        1px solid #ddd9e6;

                    border-radius: 10px;

                    background: #faf9fc;

                    color: #464052;

                    outline: none;

                    font-size: 10px;

                    transition:
                        border 0.2s ease,
                        box-shadow 0.2s ease,
                        background 0.2s ease;
                }

                .form-input {
                    height: 43px;

                    padding:
                        0 13px;
                }

                .form-textarea {
                    min-height: 105px;

                    resize: vertical;

                    padding:
                        12px 13px;

                    line-height: 1.6;
                }

                .form-input::placeholder,
                .form-textarea::placeholder {
                    color: #b4afba;
                }

                .form-input:focus,
                .form-textarea:focus {
                    border-color: #a99bc5;

                    background: white;

                    box-shadow:
                        0 0 0 3px
                        rgba(123, 106, 158, 0.09);
                }

                /* =================================================
                   FORM ROW
                ================================================= */

                .form-row {
                    display: grid;

                    grid-template-columns:
                        1fr 1fr;

                    gap: 13px;
                }

                /* =================================================
                   PRIORITY
                ================================================= */

                .priority-options {
                    display: grid;

                    grid-template-columns:
                        repeat(3, 1fr);

                    gap: 7px;
                }

                .priority-option {
                    border:
                        1px solid #e0dce8;

                    border-radius: 9px;

                    background: #faf9fc;

                    padding: 10px 6px;

                    cursor: pointer;

                    text-align: center;

                    transition:
                        transform 0.2s ease,
                        border 0.2s ease,
                        background 0.2s ease;
                }

                .priority-option:hover {
                    transform: translateY(-2px);

                    background: #f5f2f9;
                }

                .priority-option.selected-low {
                    background: #e7eee9;

                    border-color: #b9cfbf;
                }

                .priority-option.selected-medium {
                    background: #efecd9;

                    border-color: #d6ce9d;
                }

                .priority-option.selected-high {
                    background: #f1e5e2;

                    border-color: #d8bdb7;
                }

                .priority-radio {
                    display: none;
                }

                .priority-dot {
                    width: 8px;
                    height: 8px;

                    display: block;

                    margin:
                        0 auto 6px;

                    border-radius: 50%;
                }

                .low-dot {
                    background: #7c9c87;
                }

                .medium-dot {
                    background: #aaa06d;
                }

                .high-dot {
                    background: #a47c73;
                }

                .priority-name {
                    font-size: 8px;

                    font-weight: 900;
                }

                .low-name {
                    color: #63806d;
                }

                .medium-name {
                    color: #8d8251;
                }

                .high-name {
                    color: #936b64;
                }

                /* =================================================
                   BUTTONS
                ================================================= */

                .form-actions {
                    display: flex;

                    justify-content: flex-end;

                    gap: 9px;

                    margin-top: 21px;

                    padding-top: 18px;

                    border-top:
                        1px solid #e7e3ed;
                }

                .cancel-button {
                    border:
                        1px solid #ddd9e6;

                    border-radius: 9px;

                    padding:
                        10px 17px;

                    background: #f7f6fa;

                    color: #777181;

                    font-size: 9px;

                    font-weight: 800;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .cancel-button:hover {
                    background: #eeeaf5;

                    color: #514569;
                }

                .submit-button {
                    border: none;

                    border-radius: 9px;

                    padding:
                        10px 19px;

                    background:
                        linear-gradient(
                            135deg,
                            #4a3e67,
                            #706095
                        );

                    color: white;

                    font-size: 9px;

                    font-weight: 800;

                    cursor: pointer;

                    box-shadow:
                        0 7px 18px
                        rgba(73, 61, 104, 0.17);

                    transition: 0.2s ease;
                }

                .submit-button:hover {
                    transform: translateY(-2px);

                    box-shadow:
                        0 10px 22px
                        rgba(73, 61, 104, 0.22);
                }

                .submit-button:disabled {
                    opacity: 0.65;

                    cursor: not-allowed;

                    transform: none;
                }

                /* =================================================
                   INFO CARD
                ================================================= */

                .info-card {
                    padding: 23px;

                    border-radius: 16px;

                    background:
                        rgba(255,255,255,0.94);

                    border:
                        1px solid #dedbe8;

                    box-shadow:
                        0 8px 25px
                        rgba(75, 67, 99, 0.07);
                }

                .info-header {
                    display: flex;

                    align-items: center;

                    gap: 11px;

                    margin-bottom: 15px;
                }

                .info-icon {
                    width: 38px;
                    height: 38px;

                    border-radius: 10px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #e8e3f3;

                    color: #66558d;

                    font-size: 15px;

                    font-weight: 900;
                }

                .info-title {
                    margin: 0;

                    color: #29243b;

                    font-size: 15px;
                }

                .info-text {
                    margin:
                        0 0 18px;

                    color: #8d8795;

                    font-size: 9px;

                    line-height: 1.7;
                }

                .tip-list {
                    display: grid;

                    gap: 8px;
                }

                .tip-item {
                    display: flex;

                    align-items: center;

                    gap: 9px;

                    padding: 10px;

                    border-radius: 9px;

                    background: #faf9fc;

                    border:
                        1px solid #e7e3ed;
                }

                .tip-number {
                    width: 28px;
                    height: 28px;

                    flex-shrink: 0;

                    border-radius: 8px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #e8e2f3;

                    color: #66558d;

                    font-size: 7px;

                    font-weight: 900;
                }

                .tip-content strong {
                    display: block;

                    color: #554d62;

                    font-size: 8px;

                    margin-bottom: 2px;
                }

                .tip-content span {
                    color: #938c9e;

                    font-size: 7px;

                    line-height: 1.4;
                }

                /* =================================================
                   FOOTER
                ================================================= */

                .dashboard-footer {
                    margin-top: 34px;

                    padding-top: 17px;

                    border-top:
                        1px solid #dcd9e5;

                    display: flex;

                    justify-content: space-between;

                    color: #a29ca9;

                    font-size: 8px;

                    font-weight: 700;
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 1050px) {

                    .dashboard-sidebar {
                        width: 210px;
                    }

                    .dashboard-main {
                        margin-left: 210px;

                        padding-left: 30px;

                        padding-right: 30px;
                    }

                    .form-layout {
                        grid-template-columns: 1fr;
                    }

                    .info-card {
                        display: none;
                    }
                }

                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 750px) {

                    .dashboard-sidebar {
                        position: relative;

                        width: 100%;

                        min-height: auto;

                        border-right: none;

                        border-bottom:
                            1px solid #dcd9e8;

                        padding: 15px;

                        display: block;
                    }

                    .brand-area {
                        padding:
                            5px 5px 18px;
                    }

                    .nav-title {
                        display: none;
                    }

                    .nav-section {
                        display: grid;

                        grid-template-columns:
                            repeat(2, 1fr);

                        gap: 5px;
                    }

                    .nav-item {
                        margin: 0;
                    }

                    .sidebar-bottom {
                        display: none;
                    }

                    .dashboard-main {
                        margin-left: 0;

                        padding:
                            22px 15px 40px;
                    }

                    .topbar {
                        margin-bottom: 20px;
                    }

                    .top-title {
                        font-size: 24px;
                    }

                    .date-area {
                        display: none;
                    }

                    .form-card,
                    .info-card {
                        padding: 20px;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .form-actions {
                        justify-content: stretch;
                    }

                    .cancel-button,
                    .submit-button {
                        flex: 1;
                    }
                }

                /* =================================================
                   SMALL MOBILE
                ================================================= */

                @media (max-width: 450px) {

                    .nav-section {
                        grid-template-columns: 1fr;
                    }

                    .top-avatar {
                        width: 36px;
                        height: 36px;
                    }

                    .form-card {
                        padding: 17px;
                    }

                    .priority-options {
                        grid-template-columns: 1fr;
                    }

                    .priority-option {
                        display: flex;

                        align-items: center;

                        gap: 8px;

                        text-align: left;
                    }

                    .priority-dot {
                        margin: 0;
                    }

                    .dashboard-footer {
                        flex-direction: column;

                        gap: 7px;
                    }
                }

            `}</style>

            <div className="dashboard-app">

                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <aside className="dashboard-sidebar">

                    <div>

                        {/* BRAND */}

                        <div className="brand-area">

                            <div className="brand-logo">
                                ST
                            </div>

                            <div>

                                <div className="brand-title">
                                    Smart Task
                                </div>

                                <div className="brand-subtitle">
                                    PRODUCTIVITY WORKSPACE
                                </div>

                            </div>

                        </div>


                        {/* NAVIGATION */}

                        <div className="nav-title">
                            MAIN MENU
                        </div>

                        <div className="nav-section">

                            <button
                                className="nav-item"
                                onClick={() =>
                                    goTo("/dashboard")
                                }
                            >
                                <span className="nav-icon">
                                    D
                                </span>

                                Dashboard
                            </button>


                            <button
                                className="nav-item"
                                onClick={() =>
                                    goTo("/my-tasks")
                                }
                            >
                                <span className="nav-icon">
                                    T
                                </span>

                                My Tasks
                            </button>


                            <button
                                className="nav-item active"
                                onClick={() =>
                                    goTo("/add-task")
                                }
                            >
                                <span className="nav-icon">
                                    +
                                </span>

                                Add Task
                            </button>


                            <button
                                className="nav-item"
                                onClick={() =>
                                    goTo("/high-priority")
                                }
                            >
                                <span className="nav-icon">
                                    !
                                </span>

                                High Priority
                            </button>


                            <button
                                className="nav-item"
                                onClick={() =>
                                    goTo("/completed")
                                }
                            >
                                <span className="nav-icon">
                                    ✓
                                </span>

                                Completed
                            </button>

                        </div>

                    </div>


                    {/* SIDEBAR BOTTOM */}

                    <div className="sidebar-bottom">

                        <div className="profile-area">

                            <div className="profile-avatar">
                                {userInitial}
                            </div>

                            <div className="profile-details">

                                <strong>
                                    {user?.name || "User"}
                                </strong>

                                <span>
                                    Active account
                                </span>

                            </div>

                        </div>


                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>

                    </div>

                </aside>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <main className="dashboard-main">

                    {/* TOP BAR */}

                    <header className="topbar">

                        <div>

                            <div className="top-label">
                                WORKSPACE
                            </div>

                            <h1 className="top-title">
                                Add Task
                            </h1>

                        </div>


                        <div className="top-right">

                            <div className="date-area">

                                <span className="date-label">
                                    TODAY
                                </span>

                                <span className="date-value">

                                    {new Date().toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}

                                </span>

                            </div>


                            <div className="top-avatar">
                                {userInitial}
                            </div>

                        </div>

                    </header>


                    {/* PAGE INTRO */}

                    <section className="section-header">

                        <span className="section-label">
                            TASK MANAGEMENT
                        </span>

                        <h2 className="section-title">
                            Create a New Task
                        </h2>

                        <p className="page-description">
                            Add the details below to organize
                            your work and keep track of your
                            progress.
                        </p>

                    </section>


                    {/* FORM LAYOUT */}

                    <div className="form-layout">

                        {/* =================================================
                            FORM CARD
                        ================================================= */}

                        <section className="form-card">

                            <h3 className="form-card-title">
                                Task Details
                            </h3>

                            <p className="form-card-subtitle">
                                Fill in the information for your
                                new task.
                            </p>


                            {/* SUCCESS */}

                            {message && (
                                <div className="success-message">
                                    ✓ {message}
                                </div>
                            )}


                            {/* ERROR */}

                            {error && (
                                <div className="error-message">
                                    {error}
                                </div>
                            )}


                            <form onSubmit={handleSubmit}>

                                {/* TITLE */}

                                <div className="form-group">

                                    <label className="form-label">
                                        Task Title{" "}
                                        <span className="required">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Complete project report"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="form-group">

                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        className="form-textarea"
                                        placeholder="Add some details about this task..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* PRIORITY + DATE */}

                                <div className="form-row">

                                    {/* PRIORITY */}

                                    <div className="form-group">

                                        <label className="form-label">
                                            Priority
                                        </label>

                                        <div className="priority-options">

                                            <label
                                                className={`priority-option ${
                                                    priority === "Low"
                                                        ? "selected-low"
                                                        : ""
                                                }`}
                                            >

                                                <input
                                                    type="radio"
                                                    className="priority-radio"
                                                    value="Low"
                                                    checked={
                                                        priority ===
                                                        "Low"
                                                    }
                                                    onChange={(e) =>
                                                        setPriority(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                />

                                                <span className="priority-dot low-dot" />

                                                <span className="priority-name low-name">
                                                    Low
                                                </span>

                                            </label>


                                            <label
                                                className={`priority-option ${
                                                    priority === "Medium"
                                                        ? "selected-medium"
                                                        : ""
                                                }`}
                                            >

                                                <input
                                                    type="radio"
                                                    className="priority-radio"
                                                    value="Medium"
                                                    checked={
                                                        priority ===
                                                        "Medium"
                                                    }
                                                    onChange={(e) =>
                                                        setPriority(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                />

                                                <span className="priority-dot medium-dot" />

                                                <span className="priority-name medium-name">
                                                    Medium
                                                </span>

                                            </label>


                                            <label
                                                className={`priority-option ${
                                                    priority === "High"
                                                        ? "selected-high"
                                                        : ""
                                                }`}
                                            >

                                                <input
                                                    type="radio"
                                                    className="priority-radio"
                                                    value="High"
                                                    checked={
                                                        priority ===
                                                        "High"
                                                    }
                                                    onChange={(e) =>
                                                        setPriority(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                />

                                                <span className="priority-dot high-dot" />

                                                <span className="priority-name high-name">
                                                    High
                                                </span>

                                            </label>

                                        </div>

                                    </div>


                                    {/* DUE DATE */}

                                    <div className="form-group">

                                        <label className="form-label">
                                            Due Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-input"
                                            value={dueDate}
                                            onChange={(e) =>
                                                setDueDate(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>


                                {/* BUTTONS */}

                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() =>
                                            goTo("/dashboard")
                                        }
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="submit-button"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "+ Create Task"}
                                    </button>

                                </div>

                            </form>

                        </section>


                        {/* =================================================
                            INFORMATION CARD
                        ================================================= */}

                        <aside className="info-card">

                            <div className="info-header">

                                <div className="info-icon">
                                    +
                                </div>

                                <h3 className="info-title">
                                    Stay Organized
                                </h3>

                            </div>


                            <p className="info-text">
                                Break your work into clear,
                                manageable tasks. Setting the right
                                priority helps you focus on what
                                matters most.
                            </p>


                            <div className="tip-list">

                                <div className="tip-item">

                                    <div className="tip-number">
                                        01
                                    </div>

                                    <div className="tip-content">

                                        <strong>
                                            Use clear titles
                                        </strong>

                                        <span>
                                            Make your task easy
                                            to understand at a
                                            glance.
                                        </span>

                                    </div>

                                </div>


                                <div className="tip-item">

                                    <div className="tip-number">
                                        02
                                    </div>

                                    <div className="tip-content">

                                        <strong>
                                            Set priorities
                                        </strong>

                                        <span>
                                            Mark important tasks
                                            as High priority.
                                        </span>

                                    </div>

                                </div>


                                <div className="tip-item">

                                    <div className="tip-number">
                                        03
                                    </div>

                                    <div className="tip-content">

                                        <strong>
                                            Add a due date
                                        </strong>

                                        <span>
                                            Keep track of
                                            deadlines and stay
                                            on schedule.
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </aside>

                    </div>


                    {/* FOOTER */}

                    <footer className="dashboard-footer">

                        <span>
                            Smart Task Manager
                        </span>

                        <span>
                            Productivity Workspace
                        </span>

                    </footer>

                </main>

            </div>
        </>
    );
}

export default AddTask;

