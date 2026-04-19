# Task Tracker

A backend-focused REST API built with Spring Boot for managing task lists and tasks.

## Live Demo

- **Frontend:** https://task-tracker-ui-vmur.onrender.com
- **API:** https://task-tracker-api-iulh.onrender.com

## Features

- Create, read, update, and delete task lists
- Create, read, update, and delete tasks within a list
- Task priority levels: LOW, MEDIUM, HIGH
- Task status: OPEN, CLOSED
- Task due dates
- Auto-calculated task count and completion progress per list

## Tech Stack

- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** PostgreSQL
- **Frontend:** React, TypeScript, Tailwind CSS (minimal UI for testing)

## API Endpoints

### Task Lists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/task-lists` | Get all task lists |
| POST | `/task-lists` | Create a task list |
| GET | `/task-lists/{id}` | Get a task list |
| PUT | `/task-lists/{id}` | Update a task list |
| DELETE | `/task-lists/{id}` | Delete a task list |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/task-lists/{id}/tasks` | Get all tasks in a list |
| POST | `/task-lists/{id}/tasks` | Create a task in a list |
| GET | `/task-lists/{id}/tasks/{taskId}` | Get a task |
| PUT | `/task-lists/{id}/tasks/{taskId}` | Update a task |
| DELETE | `/task-lists/{id}/tasks/{taskId}` | Delete a task |

## Request Body Examples

### Create Task List
```json
{
  "title": "My List",
  "description": "Optional description"
}
```

### Create Task
```json
{
  "title": "My Task",
  "description": "Optional",
  "priority": "HIGH",
  "dueDate": "2025-12-31T00:00:00.000Z"
}
```

### Update Task
```json
{
  "id": "uuid-here",
  "title": "Updated Task",
  "priority": "LOW",
  "status": "CLOSED",
  "dueDate": "2025-12-31T00:00:00.000Z"
}
```