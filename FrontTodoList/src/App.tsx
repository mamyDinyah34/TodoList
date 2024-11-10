import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTaskPage from './pages/add-task';
import TaskListPage from './pages/tasks-list';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
