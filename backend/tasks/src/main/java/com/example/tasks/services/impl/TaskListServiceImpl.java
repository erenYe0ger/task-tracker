package com.example.tasks.services.impl;

import com.example.tasks.domain.entities.TaskList;
import com.example.tasks.repositories.TaskListRepository;
import com.example.tasks.services.TaskListService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }


    @Override
    public List<TaskList> listTaskLists() {
        return taskListRepository.findAll();
    }

    @Override
    public TaskList createTaskList(TaskList taskList) {

        if(taskList.getId() != null) {
            throw new IllegalArgumentException("TaskList already has an ID!");
        }

        if(taskList.getTitle() == null || taskList.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("No title provided!");
        }


        LocalDateTime now = LocalDateTime.now();

        TaskList createdTaskList = new TaskList(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                null,
                now,
                now
        );

        return taskListRepository.save(createdTaskList);
    }

    @Override
    public Optional<TaskList> getTaskList(UUID taskListId) {
        return taskListRepository.findById(taskListId);
    }

    @Override
    public TaskList updateTaskList(UUID taskListId, TaskList taskList) {

        if(taskList.getId() == null) {
            throw new IllegalArgumentException("No ID provided!");
        }

        if(!taskListId.equals(taskList.getId())) {
            throw new IllegalArgumentException("IDs not matching!");
        }

        if(taskList.getTitle() == null || taskList.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("No title provided!");
        }

        TaskList existingTaskList = taskListRepository.findById(taskListId)
                .orElseThrow(() ->
                        new IllegalArgumentException("TaskList not found!")
                );

        existingTaskList.setTitle(taskList.getTitle());
        existingTaskList.setDescription(taskList.getDescription());
        existingTaskList.setUpdated(LocalDateTime.now());

        return taskListRepository.save(existingTaskList);
    }

    @Override
    public void deleteTaskList(UUID taskListId) {
        taskListRepository.deleteById(taskListId);
    }

}
