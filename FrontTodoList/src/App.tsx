import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddTaskPage from "./pages/add-task";
import TaskListPage from "./pages/tasks-list";
import UpdateTaskPage from "./pages/update-task";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/update/:id" element={<UpdateTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
