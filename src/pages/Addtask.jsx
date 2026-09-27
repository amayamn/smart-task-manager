import Navbar from "../components/Navbar";

function AddTask() {
  return (
    <div>

      <Navbar />

      <div className="form-container">

        <h1>Add New Task</h1>

        <form>

          <label>Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
          />

          <label>Description</label>

          <textarea
            placeholder="Enter task description"
            rows="5"
          ></textarea>

          <label>Priority</label>

          <select>

            <option>Low</option>
            <option>Medium</option>
            <option>High</option>

          </select>

          <label>Category</label>

          <select>

            <option>College</option>
            <option>Personal</option>
            <option>Project</option>
            <option>Work</option>
            <option>Other</option>

          </select>

          <label>Deadline</label>

          <input type="date" />

          <button type="submit">
            Add Task
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddTask;