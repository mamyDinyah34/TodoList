package com.mamydinyah.TodoList.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mamydinyah.TodoList.entity.Tasks;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Tasks, String> {
    long countByStatus(String status);
    long count();
    List<Tasks> findAllByStatus(String status);
    List<Tasks> findAllByOrderByNameAsc();
    List<Tasks> findAllByOrderByNameDesc();
}
