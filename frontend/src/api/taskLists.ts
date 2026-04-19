export type TaskList = {
    id: string;
    title: string;
    description?: string;
    count?: number;
    progress?: number;
};

const BASE_URL = import.meta.env.VITE_API_URL;

export const getTaskList = async (id: string): Promise<TaskList> => {
    const res = await fetch(`${BASE_URL}/task-lists/${id}`);
    if (!res.ok) throw new Error("Failed to fetch task list");
    return res.json();
};

export const getTaskLists = async (): Promise<TaskList[]> => {
    const res = await fetch(`${BASE_URL}/task-lists`);

    if (!res.ok) {
        throw new Error("Failed to fetch task lists");
    }

    return res.json();
};

export async function createTaskList(data: {
    title: string;
    description?: string;
}): Promise<TaskList> {
    const res = await fetch(`${BASE_URL}/task-lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to create task list");
    }

    return res.json();
}

export async function deleteTaskList(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/task-lists/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete");
    }
}

export async function updateTaskList(
    id: string,
    data: { id: string; title: string; description?: string },
): Promise<TaskList> {
    const res = await fetch(`${BASE_URL}/task-lists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to update");
    }

    return res.json();
}
