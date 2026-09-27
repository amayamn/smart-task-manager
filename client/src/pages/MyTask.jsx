
import React, { useEffect, useState } from "react";

function MyTasks() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

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
            const token = localStorage.getItem("token");

            if (!savedUser) {
                window.location.href = "/login";
                return;
            }

            const currentUser = JSON.parse(savedUser);
            const userId = currentUser?._id || currentUser?.id;

            if (!userId) {
                setError("User information is missing. Please login again.");
                return;
            }

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            try {
                const response = await fetch(
                    `http://localhost:5000/api/tasks?userId=${encodeURIComponent(userId)}`,
                    {
                        method: "GET",
                        headers: {
                            ...(token
                                ? { Authorization: `Bearer ${token}` }
                                : {}),
                        },
                        signal: controller.signal,
                    }
                );

                const text = await response.text();
                let data = [];

                try {
                    data = text ? JSON.parse(text) : [];
                } catch (parseError) {
                    console.error("Invalid server response:", text);
                    setError("Server returned an invalid response.");
                    return;
                }

                if (!response.ok) {
                    setError(data?.message || "Failed to load tasks");
                    return;
                }

                const taskList = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.tasks)
                        ? data.tasks
                        : [];

                setTasks(
                    taskList.map((task) => ({
                        ...task,
                        completed:
                            typeof task.completed === "boolean"
                                ? task.completed
                                : task.status === "Completed",
                    }))
                );
            } finally {
                clearTimeout(timeout);
            }
        } catch (err) {
            console.error(err);

            if (err.name === "AbortError") {
                setError("Server is taking too long to respond. Please check that the backend is running.");
            } else {
                setError("Cannot connect to server. Make sure the backend is running on port 5000.");
            }
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // LOAD TASKS
    // =====================================================

    useEffect(() => {
        if (user?._id || user?.id) {
            getTasks();
        }
    }, [user]);

    // =====================================================
    // TOGGLE TASK
    // =====================================================

    const toggleTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
            const newStatus = task.completed ? "Pending" : "Completed";

            const response = await fetch(
                `http://localhost:5000/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token
                            ? { Authorization: `Bearer ${token}` }
                            : {}),
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            const text = await response.text();
            let data = {};

            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                alert("Server returned an invalid response.");
                return;
            }

            if (!response.ok) {
                alert(data.message || "Failed to update task");
                return;
            }

            const updatedTask = data?.task || data;

            setTasks((previousTasks) =>
                previousTasks.map((item) =>
                    item._id === task._id
                        ? {
                              ...item,
                              ...updatedTask,
                              completed:
                                  typeof updatedTask.completed === "boolean"
                                      ? updatedTask.completed
                                      : updatedTask.status === "Completed",
                          }
                        : item
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
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        ...(token
                            ? { Authorization: `Bearer ${token}` }
                            : {}),
                    },
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
    // FILTER
    // =====================================================

    const filteredTasks = tasks.filter((task) => {
        const title = task.title || "";

        const matchesSearch = title
            .toLowerCase()
            .includes(search.toLowerCase());

        if (!matchesSearch) {
            return false;
        }

        if (filter === "All") {
            return true;
        }

        if (filter === "Completed") {
            return task.completed;
        }

        if (filter === "Pending") {
            return !task.completed;
        }

        if (filter === "High") {
            return task.priority === "High" && !task.completed;
        }

        if (filter === "Medium") {
            return task.priority === "Medium" && !task.completed;
        }

        if (filter === "Low") {
            return task.priority === "Low" && !task.completed;
        }

        return true;
    });

    // =====================================================
    // COUNTS
    // =====================================================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    const highPriority = tasks.filter(
        (task) =>
            task.priority === "High" &&
            !task.completed
    ).length;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                  (completedTasks / totalTasks) * 100
              );

    // =====================================================
    // USER INITIAL
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

                button,
                input,
                select {
                    font-family: inherit;
                }

                /* =================================================
                   APP
                ================================================= */

                .mytasks-app {
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
                   EXACT SAME AS DASHBOARD
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
                   SAME DASHBOARD SIZE
                ================================================= */

                .mytasks-main {
                    margin-left: 235px;

                    min-height: 100vh;

                    padding:
                        28px 5% 50px;
                }

                /* =================================================
                   TOP BAR
                   SAME DASHBOARD
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
                   MY TASKS HERO
                   SAME DASHBOARD HERO
                ================================================= */

                .hero-card {
                    position: relative;

                    overflow: hidden;

                    min-height: 190px;

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

                    margin-bottom: 32px;
                }

                .hero-card::before {
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

                .hero-card::after {
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

                    max-width: 650px;
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

                    font-size: 32px;

                    line-height: 1.1;

                    letter-spacing: -1.4px;
                }

                .hero-title span {
                    color: #76649d;
                }

                .hero-description {
                    max-width: 540px;

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
                   SECTION HEADER
                   SAME DASHBOARD
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

                /* =================================================
                   STATS
                   SAME DASHBOARD
                ================================================= */

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
                   TASK CARD
                ================================================= */

                .tasks-card {
                    padding: 23px;

                    border-radius: 16px;

                    background:
                        rgba(255,255,255,0.94);

                    border:
                        1px solid #dedbe8;

                    box-shadow:
                        0 8px 25px
                        rgba(75, 67, 99, 0.07);

                    margin-bottom: 30px;
                }

                .tasks-card-header {
                    display: flex;

                    align-items: center;

                    justify-content: space-between;

                    margin-bottom: 20px;
                }

                .tasks-card-title {
                    margin: 0;

                    color: #29243b;

                    font-size: 18px;
                }

                .tasks-card-description {
                    margin: 5px 0 0;

                    color: #9c96a5;

                    font-size: 8px;
                }

                /* =================================================
                   SEARCH + FILTER
                ================================================= */

                .task-controls {
                    display: flex;

                    align-items: center;

                    gap: 9px;

                    margin-bottom: 17px;
                }

                .search-container {
                    flex: 1;

                    height: 40px;

                    display: flex;

                    align-items: center;

                    gap: 8px;

                    padding:
                        0 12px;

                    border:
                        1px solid #e2dfe9;

                    border-radius: 9px;

                    background: #faf9fc;
                }

                .search-icon {
                    color: #8f889d;

                    font-size: 15px;
                }

                .search-input {
                    width: 100%;

                    height: 100%;

                    border: none;

                    outline: none;

                    background: transparent;

                    color: #4d4758;

                    font-size: 9px;
                }

                .search-input::placeholder {
                    color: #aaa4b0;
                }

                .filter-select {
                    width: 155px;

                    height: 40px;

                    border:
                        1px solid #e2dfe9;

                    border-radius: 9px;

                    background: #faf9fc;

                    color: #706979;

                    padding:
                        0 10px;

                    outline: none;

                    font-size: 9px;

                    font-weight: 800;

                    cursor: pointer;
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

                    padding:
                        11px 12px;

                    min-height: 58px;

                    border:
                        1px solid #e6e3eb;

                    border-radius: 10px;

                    background: #faf9fc;

                    transition: 0.2s ease;
                }

                .task-row:hover {
                    background: #f5f2f9;

                    transform:
                        translateY(-1px);
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
                    padding:
                        3px 7px;

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

                .task-status-text {
                    color: #9b95a2;

                    font-size: 7px;
                }

                .task-status {
                    padding:
                        5px 8px;

                    border-radius: 6px;

                    font-size: 7px;

                    font-weight: 800;

                    white-space: nowrap;
                }

                .delete-button {
                    border:
                        1px solid #e5d9dc;

                    border-radius: 6px;

                    padding:
                        6px 8px;

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
                   EMPTY STATE
                ================================================= */

                .empty-state {
                    padding:
                        45px 20px;

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
                    margin:
                        0 0 5px;

                    color: #4b4456;

                    font-size: 14px;
                }

                .empty-text {
                    margin:
                        0 0 17px;

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
                    transform:
                        translateY(-2px);

                    box-shadow:
                        0 10px 22px
                        rgba(73, 61, 104, 0.22);
                }

                /* =================================================
                   LOADING
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

                /* =================================================
                   ERROR
                ================================================= */

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
                    margin-bottom: 10px;
                }

                .retry-button {
                    border: none;

                    border-radius: 7px;

                    padding:
                        7px 12px;

                    background:
                        #706095;

                    color: white;

                    font-size: 8px;

                    font-weight: 800;

                    cursor: pointer;
                }

                /* =================================================
                   FOOTER
                   SAME DASHBOARD
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
                   SAME DASHBOARD
                ================================================= */

                @media (max-width: 1050px) {

                    .dashboard-sidebar {
                        width: 210px;
                    }

                    .mytasks-main {
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
                   SAME DASHBOARD
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

                    .mytasks-main {
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

                    .hero-card {
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

                    .task-controls {
                        flex-direction: column;

                        align-items: stretch;
                    }

                    .filter-select {
                        width: 100%;
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

                    .tasks-card {
                        padding: 17px;
                    }

                    .task-row {
                        gap: 8px;
                    }

                    .task-status {
                        margin-left: 39px;
                    }
                }

            `}</style>

            <div className="mytasks-app">

                {/* =================================================
                    SIDEBAR
                    SAME AS DASHBOARD
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
                                className="nav-item active"
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

                <main className="mytasks-main">

                    {/* TOP BAR */}

                    <header className="topbar">

                        <div>

                            <div className="top-label">
                                YOUR WORKSPACE
                            </div>

                            <h1 className="top-title">
                                My Tasks
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

                    <section className="hero-card">

                        <div className="hero-content">

                            <span className="hero-label">
                                TASK MANAGEMENT
                            </span>

                            <h2 className="hero-title">

                                Your tasks,
                                <br />

                                <span>
                                    all in one place.
                                </span>

                            </h2>

                            <p className="hero-description">
                                View, organize and manage your
                                tasks. Stay focused on your work
                                and keep track of everything you
                                need to complete.
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
                        TASK OVERVIEW
                    ================================================= */}

                    <section>

                        <div className="section-header">

                            <span className="section-label">
                                PERFORMANCE
                            </span>

                            <h2 className="section-title">
                                Task Overview
                            </h2>

                        </div>

                        <div className="stats-grid">

                            <StatCard
                                number={totalTasks}
                                label="Total Tasks"
                                description="All tasks"
                                icon="01"
                                type="total"
                            />

                            <StatCard
                                number={completedTasks}
                                label="Completed"
                                description="Finished tasks"
                                icon="02"
                                type="completed"
                            />

                            <StatCard
                                number={pendingTasks}
                                label="Pending"
                                description="Tasks remaining"
                                icon="03"
                                type="pending"
                            />

                            <StatCard
                                number={highPriority}
                                label="High Priority"
                                description="Important tasks"
                                icon="04"
                                type="high"
                            />

                        </div>

                    </section>

                    {/* =================================================
                        TASK LIST
                    ================================================= */}

                    <section className="tasks-card">

                        <div className="tasks-card-header">

                            <div>

                                <span className="section-label">
                                    TASK ACTIVITY
                                </span>

                                <h2 className="tasks-card-title">
                                    All Tasks
                                </h2>

                                <p className="tasks-card-description">
                                    Search, filter and manage your
                                    complete task list.
                                </p>

                            </div>

                            <button
                                className="view-all"
                                style={{
                                    border:
                                        "1px solid #d8d1e6",
                                    borderRadius: "8px",
                                    padding:
                                        "8px 12px",
                                    background: "#f2eff8",
                                    color: "#645583",
                                    fontSize: "9px",
                                    fontWeight: 800,
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    goTo("/add-task")
                                }
                            >
                                + Add Task
                            </button>

                        </div>

                        {/* SEARCH */}

                        <div className="task-controls">

                            <div className="search-container">

                                <span className="search-icon">
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search your tasks..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <select
                                className="filter-select"
                                value={filter}
                                onChange={(e) =>
                                    setFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="All">
                                    All Tasks
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                                <option value="High">
                                    High Priority
                                </option>

                                <option value="Medium">
                                    Medium Priority
                                </option>

                                <option value="Low">
                                    Low Priority
                                </option>

                            </select>

                        </div>

                        {/* LOADING */}

                        {loading && (

                            <div className="state-box">

                                <div className="loading-line" />

                                Loading your tasks...

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
                            tasks.length === 0 && (

                                <div className="empty-state">

                                    <div className="empty-icon">
                                        +
                                    </div>

                                    <h3 className="empty-title">
                                        No tasks created yet
                                    </h3>

                                    <p className="empty-text">
                                        Start by creating
                                        your first task.
                                    </p>

                                    <button
                                        className="primary-button"
                                        onClick={() =>
                                            goTo(
                                                "/add-task"
                                            )
                                        }
                                    >
                                        Create Task
                                    </button>

                                </div>

                            )}

                        {/* NO RESULTS */}

                        {!loading &&
                            !error &&
                            tasks.length > 0 &&
                            filteredTasks.length === 0 && (

                                <div className="empty-state">

                                    <div className="empty-icon">
                                        ⌕
                                    </div>

                                    <h3 className="empty-title">
                                        No matching tasks
                                    </h3>

                                    <p className="empty-text">
                                        Try changing your
                                        search or filter.
                                    </p>

                                </div>

                            )}

                        {/* TASK LIST */}

                        {!loading &&
                            !error &&
                            filteredTasks.length > 0 && (

                                <div className="task-list">

                                    {filteredTasks.map(
                                        (task) => (
                                            <TaskRow
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
// TASK ROW
// =====================================================

function TaskRow({
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
        <div
            className="task-row"
            style={{
                opacity:
                    task.completed
                        ? 0.72
                        : 1,
            }}
        >

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

                    <span className="task-status-text">
                        {task.completed
                            ? "Completed"
                            : "In progress"}
                    </span>

                </div>

            </div>

            {/* STATUS */}

            <div
                className="task-status"
                style={{
                    background:
                        task.completed
                            ? "#e5eee8"
                            : "#eeecf1",

                    color:
                        task.completed
                            ? "#64816d"
                            : "#817b88",
                }}
            >
                {task.completed
                    ? "Completed"
                    : "Pending"}
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

export default MyTasks;

