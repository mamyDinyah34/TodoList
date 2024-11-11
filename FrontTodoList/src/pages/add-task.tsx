import { useState } from "react";
import Layout from "../components/Layout";
import { addTask } from "../service/axiosService";
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!taskName || !taskDescription) {
      setError("Both Task Name and Task Description are required.");
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      status: "not completed",
    };

    try {
      await addTask(newTask);
      alert("Task added successfully!");
      navigate('/');
      /*setTaskName("");
      setTaskDescription("");
      setError(null);*/
    } catch {
      setError("There was an error adding the task. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="relative overflow-x-auto">
        <h1 className="text-center text-5xl font-semibold mb-4 dark:text-white">
          Add Task
        </h1>
        <div className="flex justify-center">
          <div className="w-3/4 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>

              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="task_name" id="task_name" value={taskName} onChange={(event) => setTaskName(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="task_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Task Name
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="task_description" id="task_description" value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> 
                <label htmlFor="task_description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Task Description
                </label>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button type="submit" className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
