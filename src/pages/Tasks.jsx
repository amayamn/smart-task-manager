import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }, []);

    return (
        <div>

            <Navbar />

            <div className="page-container">

                <h1>My Tasks</h1>

                {tasks.map((task) => (

                    <div className="card" key={task.id}>

                        <h2>{task.title}</h2>

                        <p>
                            Priority: {task.priority}
                        </p>

                        <p>
                            Status: {task.status}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Tasks;