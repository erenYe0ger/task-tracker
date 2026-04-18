package com.example.tasks.services.impl;

import com.example.tasks.domain.entities.Task;
import com.example.tasks.domain.entities.TaskList;
import com.example.tasks.domain.entities.TaskPriority;
import com.example.tasks.domain.entities.TaskStatus;
import com.example.tasks.repositories.TaskListRepository;
import com.example.tasks.repositories.TaskRepository;
import com.example.tasks.services.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

    @Override
    public Task createTask(UUID taskListId, Task task) {

        if(task.getId() != null) {
            throw new IllegalArgumentException("Task already has an ID!");
        }

        if(task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("No title provided!");
        }

        TaskPriority priority = Optional.ofNullable(task.getPriority())
                .orElse(TaskPriority.MEDIUM);

        TaskStatus status = TaskStatus.OPEN;

        TaskList existingTaskList = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid taskList ID!"));

        LocalDateTime now = LocalDateTime.now();

        Task createdTask = new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                status,
                priority,
                existingTaskList,
                now,
                now
        );

        return taskRepository.save(createdTask);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Task> getTask(UUID taskListId, UUID taskId) {
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    @Override
    public Task updateTask(UUID taskListId, UUID taskId, Task task) {

        if(task.getId() == null) {
            throw new IllegalArgumentException("No ID provided!");
        }

        if(!taskId.equals(task.getId())) {
            throw new IllegalArgumentException("IDs not matching!");
        }

        if(task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("No title provided!");
        }

        if(task.getPriority() == null) {
            throw new IllegalArgumentException("No priority provided!");
        }

        if(task.getStatus() == null) {
            throw new IllegalArgumentException("No status provided!");
        }

        Task existingTask = taskRepository.findByTaskListIdAndId(taskListId, taskId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found!")
                );

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setStatus(task.getStatus());
        existingTask.setPriority(task.getPriority());
        existingTask.setUpdated(LocalDateTime.now());

        return taskRepository.save(existingTask);

    }

    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }
}
