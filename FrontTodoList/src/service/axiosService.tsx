import axios from "axios";
import { ObjectId } from "bson";

const REST_API_BASE_URL = 'http://localhost:8082/api/tasks';

export const tasksList = () => axios.get(REST_API_BASE_URL);

export const addTask = (newTask: { name: string; description: string; status: string }) => 
  axios.post(REST_API_BASE_URL, newTask);

export const updateTaskStatus = (taskId: string | ObjectId, status: string) => 
  axios.put(`${REST_API_BASE_URL}/${taskId}/${status}`);

export const deleteTask = (taskId: string | ObjectId) => 
  axios.delete(`${REST_API_BASE_URL}/${taskId}`);

export const getTasksByStatus = (status: string) => 
  axios.get(`${REST_API_BASE_URL}/status/${status}`);

export const sortTasksAsc = () => 
  axios.get(`${REST_API_BASE_URL}/sort/asc`);

export const sortTasksDesc = () => 
  axios.get(`${REST_API_BASE_URL}/sort/desc`);

export const updateTask = (taskId: string | ObjectId, updatedTask: { name: string; description: string }) => 
  axios.put(`${REST_API_BASE_URL}/${taskId}`, updatedTask);
