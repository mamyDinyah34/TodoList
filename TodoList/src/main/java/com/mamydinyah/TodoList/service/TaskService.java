package com.mamydinyah.TodoList.service;

import com.mamydinyah.TodoList.entity.Tasks;
import com.mamydinyah.TodoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public void addTask(Tasks tasks){
        taskRepository.save(tasks);
    }
    
    public List<Tasks> AllTasks(){
        return taskRepository.findAll();
    }

    public Tasks findById(String id){
        return taskRepository.findById(id).orElse(null);
    }

    public void updateTask(Tasks tasks){
        Tasks existTask = taskRepository.findById(tasks.getId()).orElse(null);
        if (existTask != null) {
            existTask.setName(tasks.getName());
            existTask.setDescription(tasks.getDescription());
            existTask.setStatus(tasks.getStatus());
            taskRepository.save(existTask);
        }
    }

    public Tasks finishTask(String id){
        Tasks tasks = taskRepository.findById(id).orElse(null);
        if (tasks != null) {
            tasks.setStatus("completed");
            taskRepository.save(tasks);
        }
        return null;
    }

    public Tasks progressTask(String id) {
        Tasks tasks = taskRepository.findById(id).orElse(null);
        if (tasks != null) {
            tasks.setStatus("in progress");
            return taskRepository.save(tasks);
        }
        return null;
    }

    public void deleteTask(String id){
        taskRepository.deleteById(id);
    }

    public List<Tasks> statusCompleted(){
        return taskRepository.findAllByStatus("completed");
    }

    public List<Tasks> statusNotCompleted(){
        return taskRepository.findAllByStatus("not completed");
    }

    public List<Tasks> statusProgress(){
        return taskRepository.findAllByStatus("in progress");
    }

    public List<Tasks> trieASC(){
        return taskRepository.findAllByOrderByNameAsc();
    }

    public List<Tasks> trieDesc(){
        return taskRepository.findAllByOrderByNameDesc();
    }

    public long count(){
        return taskRepository.count();
    }

    public long countCompleted(){
        return taskRepository.countByStatus("completed");
    }

    public long countNotCompleted(){
        return taskRepository.countByStatus("not completed");
    }

    public long countProgress(){
        return taskRepository.countByStatus("in progress");
    }
}
