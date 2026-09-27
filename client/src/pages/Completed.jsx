
import React, { useEffect, useState } from "react";

function Completed() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

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
    // GET TASKS
    // =====================================================

    const getTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const savedUser = localStorage.getItem("user");

            if (!savedUser) {
                window.location.href = "/login";
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
                setError(data.message || "Failed to load tasks");
                return;
            }

            setTasks(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError("Cannot connect to server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            getTasks();
        }
    }, [user]);

    // =====================================================
    // TOGGLE TASK
    // =====================================================

    const toggleTask = async (task) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completed: !task.completed,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to update task");
                return;
            }

            setTasks((previousTasks) =>
                previousTasks.map((item) =>
                    item._id === task._id ? data.task : item
                )
            );
        } catch (err) {
            console.error(err);
            alert("Cannot connect to server.");
        }
    };

    // =====================================================
    // DELETE TASK
    // =====================================================

    const deleteTask = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to delete task");
                return;
            }

            setTasks((previousTasks) =>
                previousTasks.filter((task) => task._id !== id)
            );
        } catch (err) {
            console.error(err);
            alert("Cannot connect to server.");
        }
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
    // NAVIGATION
    // =====================================================

    const goTo = (path) => {
        window.location.href = path;
    };

    // =====================================================
    // CALCULATIONS
    // =====================================================

    const completedTasks = tasks.filter(
        (task) => task.completed
    );

    const filteredTasks = completedTasks.filter((task) =>
        task.title
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalTasks = tasks.length;

    const remainingTasks =
        totalTasks - completedTasks.length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks.length / totalTasks) * 100
              );

    // =====================================================
    // USER
    // =====================================================

    const userInitial = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "U";

    // =====================================================
    // DATE
    // =====================================================

    const today = new Date().toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

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

                .completed-app {
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

                .completed-main {
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
                   HERO
                ================================================= */

                .completed-hero {
                    position: relative;

                    overflow: hidden;

                    min-height: 220px;

                    padding: 34px 38px;

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

                    margin-bottom: 28px;
                }

                .completed-hero::before {
                    content: "";

                    position: absolute;

                    width: 260px;
                    height: 260px;

                    right: 30px;
                    bottom: -170px;

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,0.35);

                    filter: blur(2px);
                }

                .completed-hero::after {
                    content: "";

                    position: absolute;

                    width: 180px;
                    height: 180px;

                    right: 170px;
                    top: -110px;

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,0.25);
                }

                .hero-content {
                    position: relative;

                    z-index: 2;

                    max-width: 610px;
                }

                .hero-label {
                    display: inline-block;

                    margin-bottom: 10px;

                    color: #71658f;

                    font-size: 8px;

                    font-weight: 900;

                    letter-spacing: 1.7px;
                }

                .hero-title {
                    margin: 0;

                    color: #252139;

                    font-size: 34px;

                    line-height: 1.1;

                    letter-spacing: -1.4px;
                }

                .hero-title span {
                    color: #76649d;
                }

                .hero-description {
                    max-width: 510px;

                    margin:
                        12px 0 0;

                    color: #706a7e;

                    font-size: 11px;

                    line-height: 1.7;
                }

                .hero-button {
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

                .hero-button:hover {
                    transform: translateY(-2px);

                    background: #494066;
                }

                /* =================================================
                   STATS
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

                .stats-grid {
                    display: grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap: 13px;

                    margin-bottom: 28px;
                }

                .stat-card {
                    min-width: 0;

                    padding: 19px;

                    border-radius: 14px;

                    background:
                        rgba(255,255,255,0.9);

                    border:
                        1px solid #dedbe8;

                    box-shadow:
                        0 8px 24px
                        rgba(75, 67, 99, 0.07);

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .stat-card:hover {
                    transform: translateY(-3px);

                    box-shadow:
                        0 14px 30px
                        rgba(75, 67, 99, 0.1);
                }

                .stat-top {
                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    margin-bottom: 16px;
                }

                .stat-icon {
                    width: 37px;
                    height: 37px;

                    border-radius: 10px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    font-size: 11px;

                    font-weight: 900;
                }

                .stat-number {
                    color: #28233b;

                    font-size: 26px;

                    font-weight: 800;

                    line-height: 1;
                }

                .stat-name {
                    margin-top: 5px;

                    color: #5e586b;

                    font-size: 9px;

                    font-weight: 800;
                }

                .stat-description {
                    margin-top: 3px;

                    color: #aaa4b2;

                    font-size: 8px;
                }

                /* =================================================
                   COMPLETED CONTENT
                ================================================= */

                .completed-card {
                    padding: 23px;

                    border-radius: 16px;

                    background:
                        rgba(255,255,255,0.94);

                    border:
                        1px solid #dedbe8;

                    box-shadow:
                        0 8px 25px
                        rgba(75, 67, 99, 0.07);

                    margin-bottom: 28px;
                }

                .card-header {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    margin-bottom: 18px;
                }

                .card-title {
                    margin: 0;

                    color: #29243b;

                    font-size: 18px;
                }

                .completion-circle {
                    width: 58px;
                    height: 58px;

                    border-radius: 50%;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #e7e2f4,
                            #d3cbe8
                        );

                    border:
                        4px solid #bbb0d5;

                    color: #5e4d83;

                    font-size: 11px;

                    font-weight: 900;
                }

                .progress-track {
                    width: 100%;

                    height: 13px;

                    overflow: hidden;

                    border-radius: 20px;

                    background: #eeecf2;

                    border:
                        1px solid #e3e0e9;
                }

                .progress-fill {
                    height: 100%;

                    border-radius: 20px;

                    background:
                        linear-gradient(
                            90deg,
                            #b2a3d2,
                            #69578f
                        );

                    transition:
                        width 0.6s ease;
                }

                .progress-caption {
                    margin-top: 8px;

                    color: #9891a2;

                    font-size: 8px;
                }

                .progress-stats {
                    display: grid;

                    grid-template-columns:
                        repeat(3, 1fr);

                    gap: 9px;

                    margin-top: 18px;
                }

                .progress-stat {
                    padding: 11px;

                    border-radius: 9px;

                    background: #f6f4f9;

                    border:
                        1px solid #e7e3ed;

                    text-align: center;
                }

                .progress-stat strong {
                    display: block;

                    color: #393148;

                    font-size: 17px;
                }

                .progress-stat span {
                    display: block;

                    margin-top: 3px;

                    color: #9993a2;

                    font-size: 8px;
                }

                /* =================================================
                   SEARCH
                ================================================= */

                .search-box {
                    height: 43px;

                    display: flex;

                    align-items: center;

                    gap: 10px;

                    padding: 0 14px;

                    background: #f8f7fb;

                    border:
                        1px solid #e2dfea;

                    border-radius: 10px;

                    margin-bottom: 15px;
                }

                .search-icon {
                    color: #8d8798;

                    font-size: 18px;
                }

                .search-input {
                    width: 100%;

                    height: 100%;

                    border: none;

                    outline: none;

                    background: transparent;

                    color: #4c4658;

                    font-size: 9px;
                }

                .search-input::placeholder {
                    color: #aaa4b2;
                }

                /* =================================================
                   TASK LIST
                ================================================= */

                .task-list {
                    display: grid;

                    gap: 7px;
                }

                .task-row {
                    display: flex;

                    align-items: center;

                    gap: 11px;

                    padding: 11px 12px;

                    border:
                        1px solid #e6e3eb;

                    border-radius: 10px;

                    background: #faf9fc;

                    transition: 0.2s ease;
                }

                .task-row:hover {
                    background: #f5f2f9;

                    transform: translateY(-1px);
                }

                .task-check {
                    width: 31px;
                    height: 31px;

                    flex-shrink: 0;

                    border-radius: 8px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    cursor: pointer;

                    font-size: 12px;

                    font-weight: 900;

                    border: 1px solid;

                }

                .task-main {
                    flex: 1;

                    min-width: 0;
                }

                .task-name {
                    display: block;

                    overflow: hidden;

                    text-overflow: ellipsis;

                    white-space: nowrap;

                    margin-bottom: 4px;

                    font-size: 10px;

                    font-weight: 800;
                }

                .task-meta {
                    display: flex;

                    align-items: center;

                    gap: 6px;
                }

                .priority-badge {
                    padding: 3px 7px;

                    border-radius: 5px;

                    font-size: 7px;

                    font-weight: 900;
                }

                .task-dot {
                    width: 3px;
                    height: 3px;

                    border-radius: 50%;

                    background: #b3adb9;
                }

                .completed-text {
                    color: #64816d;

                    font-size: 7px;
                }

                .task-status {
                    padding: 5px 8px;

                    border-radius: 6px;

                    font-size: 7px;

                    font-weight: 800;

                    white-space: nowrap;
                }

                .delete-button {
                    border:
                        1px solid #e5d9dc;

                    border-radius: 6px;

                    padding: 6px 8px;

                    background: #fbf5f6;

                    color: #a47780;

                    font-size: 7px;

                    font-weight: 800;

                    cursor: pointer;

                    transition: 0.2s ease;
                }

                .delete-button:hover {
                    background: #f5e7e9;

                    color: #8f5965;
                }

                /* =================================================
                   EMPTY
                ================================================= */

                .empty-state {
                    padding: 45px 20px;

                    text-align: center;

                    border:
                        1px dashed #d5cfdf;

                    border-radius: 12px;

                    background: #faf9fc;
                }

                .empty-icon {
                    width: 48px;
                    height: 48px;

                    margin:
                        0 auto 12px;

                    border-radius: 12px;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    background: #e8e2f3;

                    color: #6a598d;

                    font-size: 22px;

                    font-weight: 800;
                }

                .empty-title {
                    margin: 0 0 5px;

                    color: #4b4456;

                    font-size: 14px;
                }

                .empty-text {
                    margin: 0 0 17px;

                    color: #9c96a3;

                    font-size: 9px;
                }

                .primary-button {
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

                    transition: 0.2s ease;
                }

                .primary-button:hover {
                    transform: translateY(-2px);

                    box-shadow:
                        0 10px 22px
                        rgba(73, 61, 104, 0.22);
                }

                /* =================================================
                   STATES
                ================================================= */

                .state-box {
                    padding: 35px;

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

                .error-box {
                    padding: 17px;

                    border-radius: 10px;

                    background: #fbf3f4;

                    border:
                        1px solid #ead9dc;

                    color: #9b6972;

                    font-size: 9px;
                }

                .error-box p {
                    margin-bottom: 12px;
                }

                .retry-button {
                    border: none;

                    border-radius: 8px;

                    padding: 8px 13px;

                    background:
                        linear-gradient(
                            135deg,
                            #4a3e67,
                            #706095
                        );

                    color: white;

                    font-size: 8px;

                    font-weight: 800;

                    cursor: pointer;
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

                    .completed-main {
                        margin-left: 210px;

                        padding-left: 30px;

                        padding-right: 30px;
                    }

                    .stats-grid {
                        grid-template-columns:
                            repeat(2, 1fr);
                    }

                    .hero-title {
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

                    .completed-main {
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

                    .completed-hero {
                        padding: 25px;

                        min-height: auto;

                        flex-direction: column;

                        align-items: flex-start;

                        gap: 20px;
                    }

                    .hero-title {
                        font-size: 28px;
                    }

                    .hero-description {
                        font-size: 10px;
                    }

                    .stats-grid {
                        grid-template-columns:
                            repeat(2, 1fr);

                        gap: 9px;
                    }

                    .stat-card {
                        padding: 15px;
                    }

                    .stat-number {
                        font-size: 22px;
                    }

                    .task-row {
                        flex-wrap: wrap;
                    }

                    .task-status {
                        margin-left: 42px;
                    }

                    .delete-button {
                        margin-left: auto;
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

                    .top-avatar {
                        width: 36px;
                        height: 36px;
                    }

                    .hero-title {
                        font-size: 25px;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .completed-card {
                        padding: 17px;
                    }

                    .progress-stats {
                        grid-template-columns: 1fr;
                    }

                    .task-row {
                        gap: 8px;
                    }

                    .task-status {
                        margin-left: 39px;
                    }
                }

            `}</style>

            <div className="completed-app">

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
                                className="nav-item"
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
                                className="nav-item active"
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
                    MAIN
                ================================================= */}

                <main className="completed-main">

                    {/* TOP BAR */}

                    <header className="topbar">

                        <div>

                            <div className="top-label">
                                COMPLETED WORK
                            </div>

                            <h1 className="top-title">
                                Completed
                            </h1>

                        </div>


                        <div className="top-right">

                            <div className="date-area">

                                <span className="date-label">
                                    TODAY
                                </span>

                                <span className="date-value">
                                    {today}
                                </span>

                            </div>


                            <div className="top-avatar">
                                {userInitial}
                            </div>

                        </div>

                    </header>


                    {/* =================================================
                        HERO
                    ================================================= */}

                    <section className="completed-hero">

                        <div className="hero-content">

                            <span className="hero-label">
                                PRODUCTIVITY WORKSPACE
                            </span>

                            <h2 className="hero-title">

                                Work completed.

                                <br />

                                <span>
                                    Progress achieved.
                                </span>

                            </h2>

                            <p className="hero-description">
                                Review everything you've completed,
                                track your progress and celebrate
                                the work you've finished.
                            </p>

                        </div>


                        <button
                            className="hero-button"
                            onClick={() =>
                                goTo("/add-task")
                            }
                        >
                            + New Task
                        </button>

                    </section>


                    {/* =================================================
                        PERFORMANCE
                    ================================================= */}

                    <section>

                        <div className="section-header">

                            <span className="section-label">
                                PERFORMANCE
                            </span>

                            <h2 className="section-title">
                                Completion Overview
                            </h2>

                        </div>


                        <div className="stats-grid">

                            <StatCard
                                number={
                                    completedTasks.length
                                }
                                label="Completed"
                                description="Finished tasks"
                                icon="01"
                                type="completed"
                            />


                            <StatCard
                                number={totalTasks}
                                label="Total Tasks"
                                description="All tasks"
                                icon="02"
                                type="total"
                            />


                            <StatCard
                                number={remainingTasks}
                                label="Remaining"
                                description="Tasks still pending"
                                icon="03"
                                type="pending"
                            />


                            <StatCard
                                number={`${progress}%`}
                                label="Success Rate"
                                description="Overall completion"
                                icon="04"
                                type="high"
                            />

                        </div>

                    </section>


                    {/* =================================================
                        COMPLETION RATE
                    ================================================= */}

                    <section className="completed-card">

                        <div className="card-header">

                            <div>

                                <span className="section-label">
                                    PRODUCTIVITY
                                </span>

                                <h2 className="card-title">
                                    Completion Rate
                                </h2>

                            </div>


                            <div className="completion-circle">
                                {progress}%
                            </div>

                        </div>


                        <div className="progress-track">

                            <div
                                className="progress-fill"
                                style={{
                                    width:
                                        `${progress}%`,
                                }}
                            />

                        </div>


                        <div className="progress-caption">
                            {progress}% of your tasks completed
                        </div>


                        <div className="progress-stats">

                            <div className="progress-stat">

                                <strong>
                                    {completedTasks.length}
                                </strong>

                                <span>
                                    Completed
                                </span>

                            </div>


                            <div className="progress-stat">

                                <strong>
                                    {remainingTasks}
                                </strong>

                                <span>
                                    Remaining
                                </span>

                            </div>


                            <div className="progress-stat">

                                <strong>
                                    {totalTasks}
                                </strong>

                                <span>
                                    Total
                                </span>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        COMPLETED TASKS
                    ================================================= */}

                    <section className="completed-card">

                        <div className="card-header">

                            <div>

                                <span className="section-label">
                                    TASK ACTIVITY
                                </span>

                                <h2 className="card-title">
                                    Completed Tasks
                                </h2>

                            </div>


                            <button
                                className="primary-button"
                                onClick={() =>
                                    goTo("/my-tasks")
                                }
                            >
                                View All Tasks →
                            </button>

                        </div>


                        {/* SEARCH */}

                        <div className="search-box">

                            <span className="search-icon">
                                ⌕
                            </span>

                            <input
                                type="text"
                                placeholder="Search completed tasks..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="search-input"
                            />

                        </div>


                        {/* LOADING */}

                        {loading && (

                            <div className="state-box">

                                <div className="loading-line" />

                                Loading completed tasks...

                            </div>

                        )}


                        {/* ERROR */}

                        {!loading && error && (

                            <div className="error-box">

                                <strong>
                                    Unable to load tasks
                                </strong>

                                <p>
                                    {error}
                                </p>

                                <button
                                    className="retry-button"
                                    onClick={getTasks}
                                >
                                    Try Again
                                </button>

                            </div>

                        )}


                        {/* EMPTY */}

                        {!loading &&
                            !error &&
                            filteredTasks.length === 0 && (

                                <div className="empty-state">

                                    <div className="empty-icon">
                                        ✓
                                    </div>

                                    <h3 className="empty-title">
                                        No completed tasks
                                    </h3>

                                    <p className="empty-text">
                                        Completed tasks will
                                        appear here.
                                    </p>

                                    <button
                                        className="primary-button"
                                        onClick={() =>
                                            goTo("/my-tasks")
                                        }
                                    >
                                        View My Tasks
                                    </button>

                                </div>

                            )}


                        {/* TASK LIST */}

                        {!loading &&
                            !error &&
                            filteredTasks.length > 0 && (

                                <div className="task-list">

                                    {filteredTasks.map(
                                        (task) => (

                                            <CompletedTaskRow
                                                key={task._id}
                                                task={task}
                                                onToggle={
                                                    toggleTask
                                                }
                                                onDelete={
                                                    deleteTask
                                                }
                                            />

                                        )
                                    )}

                                </div>

                            )}

                    </section>


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


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
    number,
    label,
    description,
    icon,
    type,
}) {
    const styles = {
        total: {
            background: "#e7e1f4",
            color: "#67568c",
        },

        completed: {
            background: "#e4eee8",
            color: "#62836d",
        },

        pending: {
            background: "#eceaf0",
            color: "#77717e",
        },

        high: {
            background: "#f1e7e4",
            color: "#966f68",
        },
    };

    const selected =
        styles[type] || styles.total;

    return (
        <div className="stat-card">

            <div className="stat-top">

                <div
                    className="stat-icon"
                    style={{
                        background:
                            selected.background,
                        color:
                            selected.color,
                    }}
                >
                    {icon}
                </div>

            </div>


            <div className="stat-number">
                {number}
            </div>


            <div className="stat-name">
                {label}
            </div>


            <div className="stat-description">
                {description}
            </div>

        </div>
    );
}


// =====================================================
// COMPLETED TASK ROW
// =====================================================

function CompletedTaskRow({
    task,
    onToggle,
    onDelete,
}) {
    let priorityStyle = {
        background: "#e5eee8",
        color: "#62826c",
    };

    if (task.priority === "High") {
        priorityStyle = {
            background: "#f1e5e2",
            color: "#956d66",
        };
    }

    if (task.priority === "Medium") {
        priorityStyle = {
            background: "#efecd9",
            color: "#918553",
        };
    }

    return (
        <div className="task-row">

            {/* CHECK */}

            <button
                className="task-check"
                style={{
                    background:
                        task.completed
                            ? "#e4eee7"
                            : "#f1eff4",

                    borderColor:
                        task.completed
                            ? "#bdd3c4"
                            : "#d8d3df",

                    color:
                        task.completed
                            ? "#60856c"
                            : "#9992a2",
                }}
                onClick={() =>
                    onToggle(task)
                }
                title={
                    task.completed
                        ? "Mark as pending"
                        : "Mark as completed"
                }
            >
                {task.completed ? "✓" : ""}
            </button>


            {/* TASK */}

            <div className="task-main">

                <strong
                    className="task-name"
                    style={{
                        textDecoration:
                            task.completed
                                ? "line-through"
                                : "none",

                        color:
                            task.completed
                                ? "#a19ba7"
                                : "#464052",
                    }}
                >
                    {task.title}
                </strong>


                <div className="task-meta">

                    <span
                        className="priority-badge"
                        style={{
                            background:
                                priorityStyle.background,

                            color:
                                priorityStyle.color,
                        }}
                    >
                        {task.priority || "Low"}
                    </span>


                    <span className="task-dot" />


                    <span className="completed-text">
                        Completed
                    </span>

                </div>

            </div>


            {/* STATUS */}

            <div
                className="task-status"
                style={{
                    background: "#e5eee8",
                    color: "#64816d",
                }}
            >
                Completed
            </div>


            {/* DELETE */}

            <button
                className="delete-button"
                onClick={() =>
                    onDelete(task._id)
                }
            >
                Delete
            </button>

        </div>
    );
}

export default Completed;

