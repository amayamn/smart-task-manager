import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HighPriority() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD USER
    // =====================================================

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            navigate("/login");
            return;
        }

        try {
            setUser(JSON.parse(savedUser));
        } catch (err) {
            console.error(err);
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    // =====================================================
    // GET HIGH PRIORITY TASKS
    // =====================================================

    useEffect(() => {
        const getHighPriorityTasks = async () => {
            try {
                setLoading(true);
                setError("");

                const savedUser = localStorage.getItem("user");

                if (!savedUser) {
                    navigate("/login");
                    return;
                }

                const currentUser = JSON.parse(savedUser);

                if (!currentUser._id) {
                    setError("User information is missing.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `http://localhost:5000/api/tasks?userId=${currentUser._id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(
                        data.message || "Failed to load tasks."
                    );
                    return;
                }

                const allTasks = Array.isArray(data)
                    ? data
                    : data.tasks || [];

                const highTasks = allTasks.filter(
                    (task) =>
                        task.priority &&
                        task.priority.toLowerCase() === "high"
                );

                setTasks(highTasks);
            } catch (err) {
                console.error(err);
                setError("Cannot connect to server.");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            getHighPriorityTasks();
        }
    }, [user, navigate]);

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    // =====================================================
    // STATUS STYLE
    // =====================================================

    const getStatusStyle = (task) => {
        if (
            task.status === "Completed" ||
            task.completed === true
        ) {
            return styles.completed;
        }

        if (task.status === "In Progress") {
            return styles.inProgress;
        }

        return styles.pending;
    };

    const getStatusText = (task) => {
        if (
            task.status === "Completed" ||
            task.completed === true
        ) {
            return "Completed";
        }

        if (task.status === "In Progress") {
            return "In Progress";
        }

        return "Pending";
    };

    // =====================================================
    // DATE
    // =====================================================

    const formatDate = (date) => {
        if (!date) return "No date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // =====================================================
    // USER INITIAL
    // =====================================================

    const userInitial = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "U";

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

                button {
                    font-family: inherit;
                }

                /* =================================================
                   APP
                ================================================= */

                .high-priority-app {
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
                   SAME AS DASHBOARD
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

                .high-priority-main {
                    margin-left: 235px;

                    min-height: 100vh;

                    padding:
                        28px 5% 50px;
                }

                /* =================================================
                   TOP BAR
                ================================================= */

                .priority-topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    margin-bottom: 28px;
                }

                .priority-top-label {
                    color: #8c83a6;

                    font-size: 8px;
                    font-weight: 900;

                    letter-spacing: 1.8px;

                    margin-bottom: 5px;
                }

                .priority-top-title {
                    margin: 0;

                    color: #28243b;

                    font-size: 29px;
                    line-height: 1;

                    letter-spacing: -1px;
                }

                .priority-top-right {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .priority-date-area {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 3px;
                }

                .priority-date-label {
                    color: #a09aa9;

                    font-size: 7px;
                    font-weight: 900;

                    letter-spacing: 1.2px;
                }

                .priority-date-value {
                    color: #575164;

                    font-size: 10px;
                    font-weight: 700;
                }

                .priority-top-avatar {
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
                   HERO
                ================================================= */

                .priority-hero {
                    position: relative;

                    overflow: hidden;

                    min-height: 240px;

                    padding: 36px 40px;

                    border-radius: 20px;

                    background:
                        linear-gradient(
                            120deg,
                            #eeedf8 0%,
                            #d9d5ed 48%,
                            #c5bddf 100%
                        );

                    border:
                        1px solid #d5d0e3;

                    box-shadow:
                        0 15px 35px
                        rgba(76, 67, 104, 0.1);

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    margin-bottom: 32px;
                }

                .priority-hero::before {
                    content: "";

                    position: absolute;

                    width: 270px;
                    height: 270px;

                    right: 30px;
                    bottom: -175px;

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,0.35);
                }

                .priority-hero::after {
                    content: "";

                    position: absolute;

                    width: 190px;
                    height: 190px;

                    right: 170px;
                    top: -115px;

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,0.25);
                }

                .priority-hero-content {
                    position: relative;
                    z-index: 2;

                    max-width: 650px;
                }

                .priority-hero-label {
                    display: inline-block;

                    margin-bottom: 10px;

                    color: #71658f;

                    font-size: 8px;
                    font-weight: 900;

                    letter-spacing: 1.7px;
                }

                .priority-hero-title {
                    margin: 0;

                    color: #252139;

                    font-size: 34px;
                    line-height: 1.1;

                    letter-spacing: -1.4px;
                }

                .priority-hero-title span {
                    color: #76649d;
                }

                .priority-hero-description {
                    max-width: 540px;

                    margin:
                        12px 0 0;

                    color: #706a7e;

                    font-size: 11px;

                    line-height: 1.7;
                }

                .priority-hero-button {
                    position: relative;
                    z-index: 3;

                    border: none;

                    padding:
                        12px 19px;

                    border-radius: 9px;

                    background: #302a46;

                    color: white;

                    font-size: 10px;
                    font-weight: 800;

                    cursor: pointer;

                    box-shadow:
                        0 8px 18px
                        rgba(44, 37, 65, 0.2);

                    transition:
                        transform 0.2s ease,
                        background 0.2s ease;
                }

                .priority-hero-button:hover {
                    transform: translateY(-2px);
                    background: #494066;
                }

                /* =================================================
                   SUMMARY
                ================================================= */

                .priority-summary {
                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    gap: 20px;

                    margin-bottom: 18px;
                }

                .summary-label {
                    display: block;

                    color: #8b83a1;

                    font-size: 7px;
                    font-weight: 900;

                    letter-spacing: 1.7px;

                    margin-bottom: 5px;
                }

                .summary-title {
                    margin: 0;

                    color: #29243b;

                    font-size: 19px;

                    letter-spacing: -0.4px;
                }

                .summary-description {
                    margin:
                        5px 0 0;

                    color: #9993a2;

                    font-size: 9px;
                }

                .priority-count {
                    min-width: 115px;

                    padding: 14px 18px;

                    border-radius: 13px;

                    background:
                        linear-gradient(
                            135deg,
                            #e4dff2,
                            #d3cbe8
                        );

                    border:
                        1px solid #d5cfe3;

                    text-align: center;

                    box-shadow:
                        0 8px 22px
                        rgba(75, 67, 99, 0.07);
                }

                .priority-count-number {
                    display: block;

                    color: #5e4d83;

                    font-size: 24px;

                    font-weight: 900;
                }

                .priority-count-label {
                    display: block;

                    margin-top: 3px;

                    color: #817590;

                    font-size: 7px;

                    font-weight: 900;

                    letter-spacing: 1px;
                }

                /* =================================================
                   ERROR
                ================================================= */

                .priority-error {
                    padding: 17px;

                    margin-bottom: 18px;

                    border-radius: 10px;

                    background: #fbf3f4;

                    border:
                        1px solid #ead9dc;

                    color: #9b6972;

                    font-size: 9px;
                }

                .priority-error strong {
                    display: block;
                    margin-bottom: 4px;
                }

                /* =================================================
                   TASK SECTION
                ================================================= */

                .priority-task-section {
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

                .priority-task-header {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    margin-bottom: 18px;

                    gap: 15px;
                }

                .priority-task-heading {
                    margin: 0;

                    color: #29243b;

                    font-size: 19px;
                }

                .priority-add-button {
                    border:
                        1px solid #d8d1e6;

                    border-radius: 8px;

                    padding: 8px 12px;

                    background: #f2eff8;

                    color: #645583;

                    font-size: 9px;

                    font-weight: 800;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .priority-add-button:hover {
                    background: #e8e2f3;
                }

                /* =================================================
                   LOADING
                ================================================= */

                .priority-loading {
                    padding: 50px 20px;

                    text-align: center;

                    color: #9992a2;

                    font-size: 10px;
                }

                .loading-line {
                    width: 100px;

                    height: 4px;

                    margin:
                        0 auto 12px;

                    border-radius: 20px;

                    background:
                        linear-gradient(
                            90deg,
                            #ded9e9,
                            #806da5,
                            #ded9e9
                        );

                    animation:
                        loading 1.2s infinite;
                }

                @keyframes loading {
                    0% {
                        opacity: 0.4;
                    }

                    50% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 0.4;
                    }
                }

                /* =================================================
                   EMPTY
                ================================================= */

                .priority-empty {
                    padding: 50px 20px;

                    text-align: center;

                    border:
                        1px dashed #d5cfdf;

                    border-radius: 12px;

                    background: #faf9fc;
                }

                .priority-empty-icon {
                    width: 52px;
                    height: 52px;

                    margin:
                        0 auto 13px;

                    border-radius: 14px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background: #e8e2f3;

                    color: #6a598d;

                    font-size: 23px;
                    font-weight: 900;
                }

                .priority-empty-title {
                    margin: 0 0 6px;

                    color: #4b4456;

                    font-size: 15px;
                }

                .priority-empty-text {
                    max-width: 440px;

                    margin:
                        0 auto 18px;

                    color: #9c96a3;

                    font-size: 9px;

                    line-height: 1.6;
                }

                .priority-empty-button {
                    border: none;

                    border-radius: 9px;

                    padding:
                        10px 16px;

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
                }

                /* =================================================
                   TASK GRID
                ================================================= */

                .priority-task-grid {
                    display: grid;

                    grid-template-columns:
                        repeat(3, 1fr);

                    gap: 13px;
                }

                /* =================================================
                   TASK CARD
                ================================================= */

                .priority-task-card {
                    position: relative;

                    overflow: hidden;

                    min-height: 245px;

                    padding: 18px;

                    border-radius: 14px;

                    background:
                        linear-gradient(
                            145deg,
                            #f2f0f7,
                            #faf9fc
                        );

                    border:
                        1px solid #dedbe8;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .priority-task-card:hover {
                    transform: translateY(-3px);

                    box-shadow:
                        0 12px 28px
                        rgba(75, 67, 99, 0.1);
                }

                .priority-task-card::after {
                    content: "";

                    position: absolute;

                    width: 110px;
                    height: 110px;

                    border-radius: 50%;

                    right: -50px;
                    bottom: -55px;

                    border:
                        12px solid
                        rgba(145,116,166,0.12);

                    pointer-events: none;
                }

                .priority-task-top {
                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    gap: 8px;

                    margin-bottom: 16px;
                }

                .high-badge {
                    padding:
                        5px 8px;

                    border-radius: 6px;

                    background: #f1e5e2;

                    color: #956d66;

                    font-size: 7px;

                    font-weight: 900;

                    letter-spacing: 0.8px;
                }

                .status-badge {
                    padding:
                        5px 8px;

                    border-radius: 6px;

                    font-size: 7px;

                    font-weight: 900;

                    white-space: nowrap;
                }

                .completed {
                    background: #e5eee8;

                    color: #62826c;

                    border:
                        1px solid #cddfd2;
                }

                .inProgress {
                    background: #e7e1f2;

                    color: #68568b;

                    border:
                        1px solid #d6cde5;
                }

                .pending {
                    background: #eeecf1;

                    color: #817b88;

                    border:
                        1px solid #ded9e3;
                }

                .priority-task-title {
                    margin:
                        0 0 8px;

                    color: #393148;

                    font-size: 15px;

                    font-weight: 800;

                    line-height: 1.3;

                    word-break: break-word;
                }

                .priority-task-description {
                    min-height: 44px;

                    margin: 0;

                    color: #817b8a;

                    font-size: 9px;

                    line-height: 1.6;
                }

                .priority-decoration {
                    height: 42px;

                    margin:
                        12px -18px;

                    position: relative;

                    overflow: hidden;

                    background:
                        linear-gradient(
                            180deg,
                            transparent,
                            rgba(155,128,177,.12)
                        );
                }

                .priority-decoration-star {
                    position: absolute;

                    left: 20px;

                    bottom: -19px;

                    color: #9d82b1;

                    font-size: 58px;

                    opacity: .45;
                }

                .priority-details {
                    display: grid;

                    grid-template-columns:
                        repeat(2, 1fr);

                    gap: 10px;

                    padding-top: 11px;

                    border-top:
                        1px solid #e5e1e9;
                }

                .priority-detail {
                    display: flex;

                    flex-direction: column;

                    gap: 4px;

                    min-width: 0;
                }

                .priority-detail-label {
                    color: #a09aa8;

                    font-size: 7px;

                    font-weight: 900;

                    letter-spacing: 0.9px;
                }

                .priority-detail-value {
                    color: #5e586a;

                    font-size: 9px;

                    font-weight: 800;

                    overflow: hidden;

                    text-overflow: ellipsis;

                    white-space: nowrap;
                }

                /* =================================================
                   BOTTOM INFO
                ================================================= */

                .priority-bottom-card {
                    margin-top: 20px;

                    padding: 18px 21px;

                    border-radius: 14px;

                    background:
                        linear-gradient(
                            135deg,
                            #e7e2f1,
                            #f0edf6
                        );

                    border:
                        1px solid #dcd7e5;

                    display: flex;

                    align-items: center;

                    gap: 13px;
                }

                .priority-bottom-icon {
                    width: 39px;
                    height: 39px;

                    flex-shrink: 0;

                    border-radius: 11px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #c9bedf;

                    color: #65547f;

                    font-size: 15px;

                    font-weight: 900;
                }

                .priority-bottom-title {
                    margin: 0;

                    color: #554b63;

                    font-size: 12px;

                    font-weight: 800;
                }

                .priority-bottom-text {
                    margin:
                        4px 0 0;

                    color: #827b8a;

                    font-size: 9px;
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

                    .high-priority-main {
                        margin-left: 210px;

                        padding-left: 30px;

                        padding-right: 30px;
                    }

                    .priority-task-grid {
                        grid-template-columns:
                            repeat(2, 1fr);
                    }

                    .priority-hero-title {
                        font-size: 30px;
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

                    .high-priority-main {
                        margin-left: 0;

                        padding:
                            22px 15px 40px;
                    }

                    .priority-topbar {
                        margin-bottom: 20px;
                    }

                    .priority-top-title {
                        font-size: 24px;
                    }

                    .priority-date-area {
                        display: none;
                    }

                    .priority-hero {
                        padding: 25px;

                        min-height: auto;

                        flex-direction: column;

                        align-items: flex-start;

                        gap: 20px;
                    }

                    .priority-hero-title {
                        font-size: 28px;
                    }

                    .priority-hero-description {
                        font-size: 10px;
                    }

                    .priority-summary {
                        align-items: flex-start;
                    }

                    .priority-task-grid {
                        grid-template-columns: 1fr;
                    }

                    .priority-bottom-card {
                        align-items: flex-start;
                    }

                    .dashboard-footer {
                        flex-direction: column;

                        gap: 7px;
                    }
                }

                /* =================================================
                   SMALL MOBILE
                ================================================= */

                @media (max-width: 450px) {

                    .nav-section {
                        grid-template-columns: 1fr;
                    }

                    .priority-top-avatar {
                        width: 36px;
                        height: 36px;
                    }

                    .priority-hero-title {
                        font-size: 25px;
                    }

                    .priority-summary {
                        flex-direction: column;
                    }

                    .priority-count {
                        width: 100%;
                    }

                    .priority-task-section {
                        padding: 17px;
                    }

                    .priority-task-header {
                        align-items: flex-start;
                    }

                    .priority-bottom-card {
                        flex-direction: column;
                    }
                }

            `}</style>

            <div className="high-priority-app">

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
                                    navigate("/dashboard")
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
                                    navigate("/my-tasks")
                                }
                            >
                                <span className="nav-icon">
                                    T
                                </span>

                                My Tasks
                            </button>


                            <button
                                className="nav-item"
                                onClick={() =>
                                    navigate("/add-task")
                                }
                            >
                                <span className="nav-icon">
                                    +
                                </span>

                                Add Task
                            </button>


                            <button
                                className="nav-item active"
                                onClick={() =>
                                    navigate("/high-priority")
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
                                    navigate("/completed")
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

                <main className="high-priority-main">

                    {/* TOP BAR */}

                    <header className="priority-topbar">

                        <div>

                            <div className="priority-top-label">
                                PRIORITY MANAGEMENT
                            </div>

                            <h1 className="priority-top-title">
                                High Priority
                            </h1>

                        </div>


                        <div className="priority-top-right">

                            <div className="priority-date-area">

                                <span className="priority-date-label">
                                    TODAY
                                </span>

                                <span className="priority-date-value">
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


                            <div className="priority-top-avatar">
                                {userInitial}
                            </div>

                        </div>

                    </header>


                    {/* =================================================
                        HERO
                    ================================================= */}

                    <section className="priority-hero">

                        <div className="priority-hero-content">

                            <span className="priority-hero-label">
                                FOCUS ON WHAT MATTERS
                            </span>

                            <h2 className="priority-hero-title">

                                Your most important
                                <br />

                                <span>
                                    work starts here.
                                </span>

                            </h2>

                            <p className="priority-hero-description">
                                Keep your attention on the tasks
                                that need you most. Your high-priority
                                work is organized here for a clear,
                                focused workflow.
                            </p>

                        </div>


                        <button
                            className="priority-hero-button"
                            onClick={() =>
                                navigate("/add-task")
                            }
                        >
                            + New Important Task
                        </button>

                    </section>


                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    <section className="priority-summary">

                        <div>

                            <span className="summary-label">
                                PRIORITY FOCUS
                            </span>

                            <h2 className="summary-title">
                                High Priority Tasks
                            </h2>

                            <p className="summary-description">
                                Important tasks that deserve your
                                attention first.
                            </p>

                        </div>


                        <div className="priority-count">

                            <span className="priority-count-number">
                                {tasks.length}
                            </span>

                            <span className="priority-count-label">
                                HIGH PRIORITY
                            </span>

                        </div>

                    </section>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="priority-error">

                            <strong>
                                Unable to load tasks
                            </strong>

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    {/* =================================================
                        TASK SECTION
                    ================================================= */}

                    <section className="priority-task-section">

                        <div className="priority-task-header">

                            <div>

                                <span className="summary-label">
                                    IMPORTANT WORK
                                </span>

                                <h2 className="priority-task-heading">
                                    Your Priority Tasks
                                </h2>

                            </div>


                            <button
                                className="priority-add-button"
                                onClick={() =>
                                    navigate("/add-task")
                                }
                            >
                                + Add Task
                            </button>

                        </div>


                        {/* LOADING */}

                        {loading && (

                            <div className="priority-loading">

                                <div className="loading-line" />

                                Loading your high-priority tasks...

                            </div>

                        )}


                        {/* EMPTY */}

                        {!loading &&
                            !error &&
                            tasks.length === 0 && (

                                <div className="priority-empty">

                                    <div className="priority-empty-icon">
                                        !
                                    </div>

                                    <h3 className="priority-empty-title">
                                        No High Priority Tasks
                                    </h3>

                                    <p className="priority-empty-text">
                                        You currently don't have any
                                        high-priority tasks. Create an
                                        important task whenever you need
                                        to focus on something urgent.
                                    </p>

                                    <button
                                        className="priority-empty-button"
                                        onClick={() =>
                                            navigate("/add-task")
                                        }
                                    >
                                        + Create Important Task
                                    </button>

                                </div>

                            )}


                        {/* TASK GRID */}

                        {!loading &&
                            !error &&
                            tasks.length > 0 && (

                                <div className="priority-task-grid">

                                    {tasks.map((task) => (

                                        <div
                                            className="priority-task-card"
                                            key={task._id}
                                        >

                                            {/* TOP */}

                                            <div className="priority-task-top">

                                                <span className="high-badge">
                                                    ★ HIGH
                                                </span>

                                                <span
                                                    className="status-badge"
                                                    style={getStatusStyle(task)}
                                                >
                                                    {getStatusText(task)}
                                                </span>

                                            </div>


                                            {/* TITLE */}

                                            <h3 className="priority-task-title">
                                                {task.title}
                                            </h3>


                                            {/* DESCRIPTION */}

                                            <p className="priority-task-description">
                                                {task.description ||
                                                    "No description added for this task."}
                                            </p>


                                            {/* DECORATION */}

                                            <div className="priority-decoration">

                                                <span className="priority-decoration-star">
                                                    ✦
                                                </span>

                                            </div>


                                            {/* DETAILS */}

                                            <div className="priority-details">

                                                <div className="priority-detail">

                                                    <span className="priority-detail-label">
                                                        CATEGORY
                                                    </span>

                                                    <strong className="priority-detail-value">
                                                        {task.category ||
                                                            "General"}
                                                    </strong>

                                                </div>


                                                <div className="priority-detail">

                                                    <span className="priority-detail-label">
                                                        DUE DATE
                                                    </span>

                                                    <strong className="priority-detail-value">
                                                        {formatDate(
                                                            task.deadline ||
                                                            task.dueDate
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                    </section>


                    {/* =================================================
                        BOTTOM INFO
                    ================================================= */}

                    <section className="priority-bottom-card">

                        <div className="priority-bottom-icon">
                            ✦
                        </div>

                        <div>

                            <h3 className="priority-bottom-title">
                                Make meaningful progress
                            </h3>

                            <p className="priority-bottom-text">
                                Start with your most important task,
                                stay focused, and finish strong.
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        FOOTER
                    ================================================= */}

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

export default HighPriority;