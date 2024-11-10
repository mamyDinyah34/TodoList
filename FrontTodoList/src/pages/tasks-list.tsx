import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { tasksList, updateTaskStatus, deleteTask, getTasksByStatus, sortTasksAsc, sortTasksDesc } from "../service/axiosService";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await tasksList();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleMarkAsInProgress = async (id:string) => {
    try {
      await updateTaskStatus(id, "progress");
      setSuccessMessage("Task marked as in progress.");
      fetchTasks();
    } catch {
      setError("Failed to update task status.");
    }
  };

  const handleMarkAsCompleted = async (id:string) => {
    try {
      await updateTaskStatus(id, "completed");
      setSuccessMessage("Task marked as completed.");
      fetchTasks();
    } catch {
      setError("Failed to mark task as completed.");
    }
  };

  const handleDelete = async (id:string) => {
    try {
      await deleteTask(id);
      setSuccessMessage("Task deleted.");
      fetchTasks();
    } catch {
      setError("Failed to delete task.");
    }
  };

  const filterTasksByStatus = async (status: string) => {
    setLoading(true);
    try {
      const response = await getTasksByStatus(status);
      setTasks(response.data);
      setError(null);
    } catch {
      setError("Error filtering tasks.");
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = async (order: 'asc' | 'desc') => {
    setLoading(true);
    try {
      const response = order === 'asc' ? await sortTasksAsc() : await sortTasksDesc();
      setTasks(response.data);
      setError(null);
    } catch {
      setError("Error sorting tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="m-4">
        <h1 className="text-center text-5xl font-semibold mb-4">TASK LIST</h1>
        {successMessage && <div className="text-green-600">{successMessage}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <div className="mb-4">
          <div className="flex">
            <button 
              onClick={() => filterTasksByStatus("completed")} 
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
            >
              Completed
            </button>
            <button 
              onClick={() => filterTasksByStatus("not completed")} 
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              Not Completed
            </button>
            <button 
              onClick={() => filterTasksByStatus("in progress")} 
              className="px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700"
            >
              In Progress
            </button>
          </div>

          {/* Section de tri */}
          <div className="mt-4">
            <label className="text-black dark:text-white mr-2">Sort by Name:</label>
            <select 
              onChange={(event) => sortTasks(event.target.value)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border-2 border-blue-500 dark:border-white">
              <thead>
                <tr className="border-b-2 border-blue-500 dark:border-white">
                  {/*
                  <th className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">ID</th>
                  */}
                  <th className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">Task Name</th>
                  <th className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">Description</th>
                  <th className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">Status</th>
                  <th className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr className="border-b-2 border-blue-500 dark:border-white" key={task.id}>
                      {/*
                      <td className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">{task.id}</td>
                      */}
                      <td className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">{task.name}</td>
                      <td className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">{task.description}</td>
                      <td className="border-r-2 border-blue-500 dark:border-white px-4 py-2 text-black dark:text-white">{task.status}</td>
                      <td className="border-r-2 border-blue-500 dark:border-white px-4 py-2">
                        <button onClick={() => handleMarkAsCompleted(task.id)} disabled={task.status === "not completed"} className={`px-4 py-2 ${task.status === "not completed" ? "bg-gray-300" : "bg-green-500 text-white"} rounded mr-2`}>
                          Complete
                        </button>
                        <button onClick={() => handleMarkAsInProgress(task.id)} disabled={task.status === "completed"} className={`px-4 py-2 ${task.status === "completed" ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"} rounded mr-2`}>
                          In Progress
                        </button>
                        <button onClick={() => handleDelete(task.id)} className="px-4 py-2 bg-red-500 text-white rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      No tasks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
