import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    type Task,
    type TaskPriority,
} from "../api/tasks";
import type { TaskList } from "../api/taskLists";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

type Props = {
    taskList: TaskList;
    onBack: () => void;
};

export default function TasksPage({ taskList, onBack }: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [priority, setPriority] = useState<TaskPriority>("MEDIUM");

    const fetchTasks = () => {
        getTasks(taskList.id).then(setTasks).catch(console.error);
    };

    useEffect(() => {
        getTasks(taskList.id).then(setTasks).catch(console.error);
    }, [taskList.id]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("MEDIUM");
        setEditingTask(null);
        setIsFormOpen(false);
    };

    const handleSubmit = async () => {
        if (!title.trim()) return;
        try {
            if (editingTask) {
                await updateTask(taskList.id, editingTask.id, {
                    id: editingTask.id,
                    title: title.trim(),
                    description,
                    dueDate: dueDate
                        ? new Date(dueDate).toISOString()
                        : undefined,
                    status: editingTask.status,
                    priority,
                });
            } else {
                await createTask(taskList.id, {
                    title: title.trim(),
                    description,
                    dueDate: dueDate
                        ? new Date(dueDate).toISOString()
                        : undefined,
                    priority,
                });
            }
            resetForm();
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(task.dueDate || "");
        setPriority(task.priority);
        setIsFormOpen(true);
    };

    const handleDelete = async (taskId: string) => {
        try {
            await deleteTask(taskList.id, taskId);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-slate-50 flex justify-center px-4 py-12">
            <div className="w-full max-w-xl">
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-indigo-600 transition-colors mb-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        All lists
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                                {taskList.title}
                            </h1>
                            {taskList.description && (
                                <p className="text-slate-400 text-sm mt-1">
                                    {taskList.description}
                                </p>
                            )}
                        </div>
                        {!isFormOpen && (
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
                            >
                                <span className="text-lg leading-none">+</span>{" "}
                                New Task
                            </button>
                        )}
                    </div>
                </div>

                {isFormOpen ? (
                    <TaskForm
                        isOpen={isFormOpen}
                        editingTask={editingTask}
                        title={title}
                        description={description}
                        dueDate={dueDate}
                        priority={priority}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setDueDate={setDueDate}
                        setPriority={setPriority}
                        onSubmit={handleSubmit}
                        onCancel={resetForm}
                    />
                ) : null}

                {!isFormOpen && tasks.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <p className="text-4xl mb-3">✅</p>
                        <p className="font-medium">No tasks yet</p>
                        <p className="text-sm mt-1">Add one to get started</p>
                    </div>
                ) : !isFormOpen ? (
                    [...tasks]
                        .reverse()
                        .map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                taskListId={taskList.id}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggle={(updated) =>
                                    setTasks((prev) =>
                                        prev.map((t) =>
                                            t.id === updated.id ? updated : t,
                                        ),
                                    )
                                }
                            />
                        ))
                ) : null}
            </div>
        </div>
    );
}
