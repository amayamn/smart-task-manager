import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const adminToken = localStorage.getItem("adminToken");

    // =====================================
    // GET USERS
    // =====================================

    const getUsers = async () => {
        if (!adminToken) {
            navigate("/admin-login");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/admin/users",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to load users");
                return;
            }

            setUsers(data.users || []);
        } catch (error) {
            console.error(error);
            setError("Cannot connect to the server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin-login");
    };

    // =====================================
    // FORMAT DATE
    // =====================================

    const formatDate = (date) => {
        if (!date) {
            return "Never";
        }

        return new Date(date).toLocaleString();
    };

    return (
        <div className="admin-page">

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

                    background: #eeedfa;
                }

                button {
                    font-family: inherit;
                }

                /* =====================================
                   PAGE
                ===================================== */

                .admin-page {
                    min-height: 100vh;

                    padding: 28px 5% 60px;

                    color: #25233a;

                    background:
                        radial-gradient(
                            circle at 5% 10%,
                            rgba(178, 168, 225, 0.35),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 95% 85%,
                            rgba(208, 197, 238, 0.4),
                            transparent 30%
                        ),
                        linear-gradient(
                            135deg,
                            #aaaed0 0%,
                            #d9d8ed 48%,
                            #eeedf8 100%
                        );
                }

                .admin-wrapper {
                    width: 100%;
                    max-width: 1250px;
                    margin: 0 auto;
                }

                /* =====================================
                   TOP HEADER
                ===================================== */

                .admin-header {
                    display: flex;

                    align-items: center;
                    justify-content: space-between;

                    gap: 20px;

                    margin-bottom: 28px;

                    padding: 16px 18px;

                    border-radius: 18px;

                    background: rgba(255, 255, 255, 0.88);

                    border:
                        1px solid
                        rgba(255, 255, 255, 0.9);

                    box-shadow:
                        0 10px 35px
                        rgba(64, 56, 100, 0.12);

                    backdrop-filter: blur(12px);
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .header-icon {
                    width: 45px;
                    height: 45px;

                    min-width: 45px;

                    border-radius: 14px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #3d3858,
                            #28243e
                        );

                    color: #ffffff;

                    font-size: 12px;
                    font-weight: 900;

                    box-shadow:
                        0 7px 18px
                        rgba(46, 40, 70, 0.18);
                }

                .header-title {
                    margin: 0;

                    font-size: 21px;
                    font-weight: 850;

                    color: #29263f;

                    letter-spacing: -0.4px;
                }

                .header-subtitle {
                    margin: 4px 0 0;

                    color: #858198;

                    font-size: 10px;
                }

                .logout-button {
                    border: none;

                    padding: 10px 18px;

                    border-radius: 12px;

                    background: #302b48;

                    color: #ffffff;

                    font-size: 11px;
                    font-weight: 800;

                    cursor: pointer;

                    transition: all 0.2s ease;

                    box-shadow:
                        0 7px 18px
                        rgba(48, 43, 72, 0.15);
                }

                .logout-button:hover {
                    transform: translateY(-2px);

                    background: #443d63;

                    box-shadow:
                        0 10px 23px
                        rgba(48, 43, 72, 0.2);
                }

                /* =====================================
                   MAIN
                ===================================== */

                .admin-container {
                    width: 100%;
                }

                /* =====================================
                   ERROR
                ===================================== */

                .error {
                    margin-bottom: 20px;

                    padding: 14px 17px;

                    border-radius: 14px;

                    background: #fff1f3;

                    border: 1px solid #f2c8d0;

                    color: #b65365;

                    font-size: 11px;

                    font-weight: 700;
                }

                /* =====================================
                   HERO
                ===================================== */

                .welcome-card {
                    position: relative;

                    overflow: hidden;

                    min-height: 190px;

                    margin-bottom: 22px;

                    padding: 30px 34px;

                    border-radius: 25px;

                    background:
                        linear-gradient(
                            135deg,
                            #f8f7ff 0%,
                            #eeedfb 55%,
                            #dcd9f2 100%
                        );

                    border:
                        1px solid
                        rgba(255,255,255,0.9);

                    box-shadow:
                        0 16px 40px
                        rgba(71, 64, 111, 0.12);
                }

                .welcome-card::before {
                    content: "";

                    position: absolute;

                    width: 230px;
                    height: 230px;

                    right: -55px;
                    bottom: -100px;

                    border-radius: 50%;

                    background:
                        rgba(145, 132, 207, 0.16);
                }

                .welcome-small {
                    position: relative;

                    margin: 0 0 7px;

                    color: #8983a6;

                    font-size: 9px;

                    font-weight: 800;

                    letter-spacing: 1.5px;

                    text-transform: uppercase;
                }

                .welcome-title {
                    position: relative;

                    margin: 0;

                    color: #292640;

                    font-size: 32px;

                    font-weight: 800;

                    letter-spacing: -1.2px;
                }

                .welcome-text {
                    position: relative;

                    max-width: 510px;

                    margin: 9px 0 0;

                    color: #77728d;

                    font-size: 11px;

                    line-height: 1.6;
                }

                .welcome-pill {
                    position: relative;

                    display: inline-block;

                    margin-top: 17px;

                    padding: 8px 14px;

                    border-radius: 20px;

                    background: #302b48;

                    color: white;

                    font-size: 9px;

                    font-weight: 800;
                }

                /* =====================================
                   STATISTICS
                ===================================== */

                .stats-grid {
                    display: grid;

                    grid-template-columns:
                        repeat(3, 1fr);

                    gap: 16px;

                    margin-bottom: 22px;
                }

                .stat-card {
                    position: relative;

                    overflow: hidden;

                    min-height: 125px;

                    padding: 22px;

                    border-radius: 20px;

                    background: rgba(255,255,255,0.91);

                    border:
                        1px solid
                        rgba(255,255,255,0.95);

                    box-shadow:
                        0 12px 30px
                        rgba(67, 60, 105, 0.09);

                    display: flex;

                    align-items: center;

                    gap: 15px;

                    transition: all 0.25s ease;
                }

                .stat-card:hover {
                    transform: translateY(-3px);

                    box-shadow:
                        0 18px 38px
                        rgba(67, 60, 105, 0.13);
                }

                .stat-card::after {
                    content: "";

                    position: absolute;

                    width: 90px;
                    height: 90px;

                    right: -30px;
                    top: -30px;

                    border-radius: 50%;

                    background:
                        rgba(143, 132, 201, 0.09);
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;

                    min-width: 48px;

                    border-radius: 15px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background:
                        #e8e5f7;

                    color: #4d466e;

                    font-size: 11px;

                    font-weight: 900;
                }

                .stat-label {
                    margin: 0 0 5px;

                    color: #918ca1;

                    font-size: 8px;

                    font-weight: 900;

                    letter-spacing: 1.3px;
                }

                .stat-number {
                    color: #302c45;

                    font-size: 27px;

                    font-weight: 900;
                }

                .active-status {
                    color: #5f6b64;

                    font-size: 15px;

                    font-weight: 800;
                }

                .status-dot {
                    display: inline-block;

                    width: 7px;
                    height: 7px;

                    margin-right: 7px;

                    border-radius: 50%;

                    background: #91b79f;

                    box-shadow:
                        0 0 0 4px
                        rgba(145,183,159,0.12);
                }

                /* =====================================
                   USERS SECTION
                ===================================== */

                .users-section {
                    padding: 25px;

                    border-radius: 24px;

                    background: rgba(255,255,255,0.94);

                    border:
                        1px solid
                        rgba(255,255,255,0.96);

                    box-shadow:
                        0 16px 40px
                        rgba(67, 60, 105, 0.10);
                }

                .users-header {
                    display: flex;

                    align-items: center;
                    justify-content: space-between;

                    gap: 15px;

                    margin-bottom: 20px;
                }

                .users-heading {
                    display: flex;

                    align-items: center;

                    gap: 12px;
                }

                .users-icon {
                    width: 44px;
                    height: 44px;

                    border-radius: 14px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background: #e8e5f7;

                    color: #514a70;

                    font-size: 10px;

                    font-weight: 900;
                }

                .users-title {
                    margin: 0;

                    color: #302c45;

                    font-size: 18px;

                    font-weight: 850;
                }

                .users-subtitle {
                    margin: 4px 0 0;

                    color: #928da0;

                    font-size: 10px;
                }

                .user-count {
                    padding: 8px 13px;

                    border-radius: 20px;

                    background: #eceaf8;

                    color: #5a5377;

                    font-size: 9px;

                    font-weight: 900;

                    white-space: nowrap;
                }

                /* =====================================
                   TABLE
                ===================================== */

                .table-container {
                    overflow-x: auto;

                    border-radius: 16px;

                    border:
                        1px solid
                        #eceaf3;
                }

                table {
                    width: 100%;

                    min-width: 760px;

                    border-collapse: collapse;
                }

                th {
                    padding: 14px 16px;

                    text-align: left;

                    background: #f6f5fb;

                    color: #8a8597;

                    font-size: 8px;

                    font-weight: 900;

                    letter-spacing: 1px;

                    text-transform: uppercase;

                    border-bottom:
                        1px solid
                        #e7e5ef;
                }

                td {
                    padding: 14px 16px;

                    background: #ffffff;

                    border-bottom:
                        1px solid
                        #efedf4;

                    color: #777285;

                    font-size: 11px;
                }

                tbody tr {
                    transition: all 0.2s ease;
                }

                tbody tr:hover td {
                    background: #faf9ff;
                }

                tbody tr:last-child td {
                    border-bottom: none;
                }

                .number-cell {
                    width: 55px;

                    color: #aaa5b4;

                    font-weight: 800;
                }

                .name-cell {
                    color: #403b57;

                    font-weight: 800;
                }

                .email-cell {
                    color: #858092;
                }

                /* =====================================
                   USER AVATAR
                ===================================== */

                .user-name-wrapper {
                    display: flex;

                    align-items: center;

                    gap: 10px;
                }

                .user-avatar {
                    width: 31px;
                    height: 31px;

                    min-width: 31px;

                    border-radius: 10px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background:
                        linear-gradient(
                            135deg,
                            #dcd8f0,
                            #c7c1e5
                        );

                    color: #4b4569;

                    font-size: 11px;

                    font-weight: 900;
                }

                /* =====================================
                   LOGIN STATUS
                ===================================== */

                .online-wrapper {
                    display: inline-flex;

                    align-items: center;

                    gap: 8px;

                    color: #777383;

                    white-space: nowrap;
                }

                .online {
                    width: 7px;
                    height: 7px;

                    border-radius: 50%;

                    background: #91b79f;

                    box-shadow:
                        0 0 0 4px
                        rgba(145,183,159,0.11);
                }

                .never {
                    color: #aaa6b2;

                    font-style: italic;
                }

                /* =====================================
                   LOADING
                ===================================== */

                .loading {
                    padding: 55px 20px;

                    text-align: center;

                    color: #918ca0;

                    font-size: 11px;
                }

                .loading-circle {
                    width: 32px;
                    height: 32px;

                    margin:
                        0 auto 13px;

                    border-radius: 50%;

                    border:
                        3px solid
                        #e5e2f0;

                    border-top-color:
                        #71699a;

                    animation:
                        spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* =====================================
                   BOTTOM INFORMATION
                ===================================== */

                .motivation {
                    margin-top: 20px;

                    padding: 18px 20px;

                    border-radius: 19px;

                    background:
                        linear-gradient(
                            135deg,
                            #f8f7fd,
                            #eae8f7
                        );

                    border:
                        1px solid
                        rgba(255,255,255,0.95);

                    display: flex;

                    align-items: center;

                    gap: 13px;

                    box-shadow:
                        0 10px 25px
                        rgba(67,60,105,0.07);
                }

                .motivation-icon {
                    width: 42px;
                    height: 42px;

                    min-width: 42px;

                    border-radius: 13px;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    background: #dcd8f0;

                    color: #514a70;

                    font-size: 10px;

                    font-weight: 900;
                }

                .motivation-title {
                    margin: 0;

                    color: #514b67;

                    font-size: 12px;

                    font-weight: 850;
                }

                .motivation-text {
                    margin: 4px 0 0;

                    color: #928d9d;

                    font-size: 9px;
                }

                /* =====================================
                   RESPONSIVE
                ===================================== */

                @media (max-width: 850px) {

                    .admin-page {
                        padding: 22px 4% 45px;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .welcome-title {
                        font-size: 27px;
                    }
                }

                @media (max-width: 600px) {

                    .admin-page {
                        padding: 15px 4% 35px;
                    }

                    .admin-header {
                        padding: 15px;

                        flex-direction: column;

                        align-items: stretch;
                    }

                    .header-left {
                        align-items: flex-start;
                    }

                    .logout-button {
                        width: 100%;
                    }

                    .welcome-card {
                        padding: 25px 22px;
                    }

                    .welcome-title {
                        font-size: 25px;
                    }

                    .users-section {
                        padding: 17px;
                    }

                    .users-header {
                        align-items: flex-start;

                        flex-direction: column;
                    }

                    .user-count {
                        align-self: flex-start;
                    }

                    .motivation {
                        align-items: flex-start;
                    }
                }

            `}</style>

            <div className="admin-wrapper">

                {/* =====================================
                    HEADER
                ===================================== */}

                <header className="admin-header">

                    <div className="header-left">

                        <div className="header-icon">
                            AD
                        </div>

                        <div>

                            <h1 className="header-title">
                                Admin Dashboard
                            </h1>

                            <p className="header-subtitle">
                                Smart Task Manager · Administration Panel
                            </p>

                        </div>

                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>

                </header>


                <main className="admin-container">

                    {/* =====================================
                        ERROR
                    ===================================== */}

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}


                    {/* =====================================
                        WELCOME
                    ===================================== */}

                    <section className="welcome-card">

                        <p className="welcome-small">
                            SMART TASK MANAGER
                        </p>

                        <h2 className="welcome-title">
                            Manage everything<br />
                            in one place.
                        </h2>

                        <p className="welcome-text">
                            Monitor registered users, account activity
                            and keep your productivity platform organized.
                        </p>

                        <span className="welcome-pill">
                            Administration Panel
                        </span>

                    </section>


                    {/* =====================================
                        STATISTICS
                    ===================================== */}

                    <div className="stats-grid">

                        <div className="stat-card">

                            <div className="stat-icon">
                                US
                            </div>

                            <div>

                                <p className="stat-label">
                                    TOTAL USERS
                                </p>

                                <div className="stat-number">
                                    {users.length}
                                </div>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon">
                                DB
                            </div>

                            <div>

                                <p className="stat-label">
                                    USER RECORDS
                                </p>

                                <div className="stat-number">
                                    {users.length}
                                </div>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon">
                                OK
                            </div>

                            <div>

                                <p className="stat-label">
                                    ADMIN STATUS
                                </p>

                                <div className="active-status">

                                    <span className="status-dot"></span>

                                    Active

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =====================================
                        USERS
                    ===================================== */}

                    <section className="users-section">

                        <div className="users-header">

                            <div className="users-heading">

                                <div className="users-icon">
                                    US
                                </div>

                                <div>

                                    <h2 className="users-title">
                                        User Activity
                                    </h2>

                                    <p className="users-subtitle">
                                        View registered users and their account activity.
                                    </p>

                                </div>

                            </div>

                            <div className="user-count">
                                {users.length} Users
                            </div>

                        </div>


                        {/* =====================================
                            LOADING
                        ===================================== */}

                        {loading ? (

                            <div className="loading">

                                <div className="loading-circle"></div>

                                Loading users...

                            </div>

                        ) : users.length === 0 ? (

                            <div className="loading">
                                No users found.
                            </div>

                        ) : (

                            <div className="table-container">

                                <table>

                                    <thead>

                                        <tr>

                                            <th>#</th>

                                            <th>User</th>

                                            <th>Email</th>

                                            <th>Last Login</th>

                                            <th>Registered</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {users.map(
                                            (user, index) => (

                                                <tr
                                                    key={user._id}
                                                >

                                                    <td className="number-cell">

                                                        {String(
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}

                                                    </td>


                                                    <td className="name-cell">

                                                        <div className="user-name-wrapper">

                                                            <div className="user-avatar">

                                                                {user.name
                                                                    ? user.name
                                                                        .charAt(0)
                                                                        .toUpperCase()
                                                                    : "U"}

                                                            </div>

                                                            <span>
                                                                {user.name}
                                                            </span>

                                                        </div>

                                                    </td>


                                                    <td className="email-cell">

                                                        {user.email}

                                                    </td>


                                                    <td>

                                                        {user.lastLogin ? (

                                                            <span className="online-wrapper">

                                                                <span className="online"></span>

                                                                {formatDate(
                                                                    user.lastLogin
                                                                )}

                                                            </span>

                                                        ) : (

                                                            <span className="never">
                                                                Never logged in
                                                            </span>

                                                        )}

                                                    </td>


                                                    <td>

                                                        {formatDate(
                                                            user.createdAt
                                                        )}

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </section>


                    {/* =====================================
                        INFORMATION
                    ===================================== */}

                    <div className="motivation">

                        <div className="motivation-icon">
                            ST
                        </div>

                        <div>

                            <h3 className="motivation-title">
                                Smart Task Administration
                            </h3>

                            <p className="motivation-text">
                                Monitor registered users and keep your
                                productivity platform organized.
                            </p>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default AdminDashboard;