import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { tasksList, updateTaskStatus, deleteTask, getTasksByStatus, sortTasksAsc, sortTasksDesc, countTasks, countCompletedTasks, countNotCompletedTasks, countInProgressTasks, } from "../service/axiosService";
import { useNavigate } from "react-router-dom";


  interface Task {
    id: string;
    name: string;
    description: string;
    status: string;
  }
  
  export default function Page() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [totalTasks, setTotalTasks] = useState<number>(0);
    const [completedTasks, setCompletedTasks] = useState<number>(0);
    const [notCompletedTasks, setNotCompletedTasks] = useState<number>(0);
    const [inProgressTasks, setInProgressTasks] = useState<number>(0);
  
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await tasksList();
        setTasks(response.data);
      } catch (error) {
        setError("Error fetching tasks.");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchCounts = async () => {
      try {
        const [total, completed, notCompleted, inProgress] = await Promise.all([
          countTasks(),
          countCompletedTasks(),
          countNotCompletedTasks(),
          countInProgressTasks(),
        ]);
  
        setTotalTasks(total.data);
        setCompletedTasks(completed.data);
        setNotCompletedTasks(notCompleted.data);
        setInProgressTasks(inProgress.data);
      } catch {
        setError("Error fetching task counts.");
      }
    };
  
    useEffect(() => {
      fetchTasks();
      fetchCounts();
    }, []);
  
    const handleMarkAsInProgress = async (id: string) => {
      try {
        await updateTaskStatus(id, "progress");
        setSuccessMessage("Task marked as in progress.");
        fetchTasks();
        fetchCounts();
      } catch {
        setError("Failed to update task status.");
      }
    };
  
    const handleMarkAsCompleted = async (id: string) => {
      try {
        await updateTaskStatus(id, "completed");
        setSuccessMessage("Task marked as completed.");
        fetchTasks();
        fetchCounts();
      } catch {
        {/*setError("Failed to mark task as completed.");*/}
        fetchTasks();
        fetchCounts();
      }
    };
  
    const handleDelete = (id: string) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this task?");
      if (isConfirmed) {
        deleteTask(id)
          .then(() => {
            alert("Task deleted successfully");
            setTasks(tasks.filter((task) => task.id !== id));
            fetchCounts();
          })
          .catch(() => {
            alert('Failed to delete task');
          });
      }
    };
  
    const navigate = useNavigate();
  
    const handleUpdate = (id: string) => {
      navigate(`/update/${id}`);
    };
  
    const filterTasksByStatus = async (status: string) => {
      setLoading(true);
      try {
        const response = await getTasksByStatus(status);
        setTasks(response.data);
      } catch {
        setError("Error filtering tasks.");
      } finally {
        setLoading(false);
      }
    };
  
    const sortTasks = async (order: "asc" | "desc") => {
      setLoading(true);
      try {
        const response = order === "asc" ? await sortTasksAsc() : await sortTasksDesc();
        setTasks(response.data);
      } catch {
        setError("Error sorting tasks.");
      } finally {
        setLoading(false);
      }
  };

  return (
    <Layout>
      <div className="mr-10 ml-10 mb-10">
        <h1 className="text-center text-5xl font-semibold mb-4 dark:text-white">TASK LIST</h1>
        <div className="mb-4">
          <div className="flex space-x-2">
            <button onClick={() => fetchTasks()} className="rounded-lg relative px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              All Tasks
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {totalTasks}
              </span>
            </button>
            <button onClick={() => filterTasksByStatus("not completed")} className="rounded-lg relative px-4 py-2 bg-red-600 text-white hover:bg-red-700">
              Not Completed
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {notCompletedTasks}
              </span>
            </button>
            <button onClick={() => filterTasksByStatus("in progress")} className="rounded-lg relative px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700">
              In Progress
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-yellow-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {inProgressTasks}
              </span>
            </button>
            <button onClick={() => filterTasksByStatus("completed")} className="rounded-lg relative px-4 py-2 bg-green-600 text-white hover:bg-green-700">
              Completed
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {completedTasks}
              </span>
            </button>
          </div>
          <div className="mt-4">
            <label className="text-black dark:text-white mr-2">Sort by Name:</label>
            <select onChange={(event) => sortTasks(event.target.value)} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {successMessage && <div className="text-green-600">{successMessage}</div>}
        {error && <div className="text-red-600">{error}</div>}
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
                        <div className="flex flex-col space-y-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleMarkAsInProgress(task.id)}
                              disabled={task.status === "in progress" || task.status === "completed"}
                              className={`px-4 py-2 ${task.status === "in progress" || task.status === "completed" ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"} rounded`}
                            >
                              Mark In Progress
                            </button>
                            <button
                              onClick={() => handleMarkAsCompleted(task.id)}
                              disabled={task.status === "not completed" || task.status === "completed"}
                              className={`px-4 py-2 ${task.status === "not completed" || task.status === "completed" ? "bg-gray-300" : "bg-green-500 text-white"} rounded`}
                            >
                              Mark Complete
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button onClick={() => handleUpdate(task.id)} className="px-4 py-2 bg-yellow-500 text-white rounded">
                              Update
                            </button>
                            <button onClick={() => handleDelete(task.id)} className="px-4 py-2 bg-red-500 text-white rounded">
                              Delete
                            </button>
                          </div>
                        </div>
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
