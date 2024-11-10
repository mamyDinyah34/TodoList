package com.mamydinyah.TodoList.controller;

import com.mamydinyah.TodoList.entity.Tasks;
import com.mamydinyah.TodoList.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Tasks> AllTasks() {
        return taskService.AllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tasks> TaskById(@PathVariable String id) {
        Tasks task = taskService.findById(id);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Tasks> addTask(@RequestBody Tasks task) {
        taskService.addTask(task);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tasks> updateTask(@PathVariable String id, @RequestBody Tasks task) {
        task.setId(id);
        taskService.updateTask(task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}/completed")
    public ResponseEntity<Tasks> finishTask(@PathVariable String id) {
        Tasks task = taskService.finishTask(id);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<Tasks> progressTask(@PathVariable String id) {
        Tasks task = taskService.progressTask(id);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/status/{status}")
    public List<Tasks> TasksByStatus(@PathVariable String status) {
        if (status.equalsIgnoreCase("completed")) {
            return taskService.statusCompleted();
        } else if (status.equalsIgnoreCase("not completed")) {
            return taskService.statusNotCompleted();
        } else if (status.equalsIgnoreCase("in progress")) {
            return taskService.statusProgress();
        }
        return null;
    }

    @GetMapping("/sort/asc")
    public List<Tasks> TasksAsc() {
        return taskService.trieASC();
    }

    @GetMapping("/sort/desc")
    public List<Tasks> TasksDesc() {
        return taskService.trieDesc();
    }

    @GetMapping("/count")
    public long countTasks() {
        return taskService.count();
    }

    @GetMapping("/count/completed")
    public long countCompletedTasks() {
        return taskService.countCompleted();
    }

    @GetMapping("/count/not-completed")
    public long countNotCompletedTasks() {
        return taskService.countNotCompleted();
    }

    @GetMapping("/count/in-progress")
    public long countInProgressTasks() {
        return taskService.countProgress();
    }
}
