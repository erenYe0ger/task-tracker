const BASE_URL = "http://192.168.2.19:8080";

export type TaskStatus = "OPEN" | "CLOSED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: TaskStatus;
    priority: TaskPriority;
};

export const getTasks = async (taskListId: string): Promise<Task[]> => {
    const res = await fetch(`${BASE_URL}/task-lists/${taskListId}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
};

export const createTask = async (
    taskListId: string,
    task: Omit<Task, "id" | "status">,
): Promise<Task> => {
    const res = await fetch(`${BASE_URL}/task-lists/${taskListId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
};

export const updateTask = async (
    taskListId: string,
    taskId: string,
    task: Task,
): Promise<Task> => {
    const res = await fetch(
        `${BASE_URL}/task-lists/${taskListId}/tasks/${taskId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        },
    );
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
};

export const deleteTask = async (
    taskListId: string,
    taskId: string,
): Promise<void> => {
    const res = await fetch(
        `${BASE_URL}/task-lists/${taskListId}/tasks/${taskId}`,
        {
            method: "DELETE",
        },
    );
    if (!res.ok) throw new Error("Failed to delete task");
};
