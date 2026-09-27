// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// function App() {

//     const path = window.location.pathname;

//     if (path === "/register") {
//         return <Register />;
//     }

//     if (path === "/dashboard") {
//         return <Dashboard />;
//     }

//     return <Login />;
// }

// export default App;import React from "react";
// import React from "react";

import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTask";
import HighPriority from "./pages/HighPriority";
import Completed from "./pages/Completed";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* HOME */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* USER LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* USER REGISTER */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* USER DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* ADD TASK */}
                <Route
                    path="/add-task"
                    element={<AddTask />}
                />

                {/* MY TASKS */}
                <Route
                    path="/my-tasks"
                    element={<MyTasks />}
                />

                {/* HIGH PRIORITY */}
                <Route
                    path="/high-priority"
                    element={<HighPriority />}
                />

                {/* COMPLETED */}
                <Route
                    path="/completed"
                    element={<Completed />}
                />

                {/* ADMIN LOGIN */}
                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                {/* ADMIN DASHBOARD */}
                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

                {/* INVALID URL */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;