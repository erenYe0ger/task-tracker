import { updateTask } from "../api/tasks";
import type { Task } from "../api/tasks";

type Props = {
    task: Task;
    taskListId: string;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggle: (updated: Task) => void;
};

const priorityStyles: Record<string, string> = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-amber-100 text-amber-700",
    HIGH: "bg-red-100 text-red-600",
};

export default function TaskItem({
    task,
    taskListId,
    onEdit,
    onDelete,
    onToggle,
}: Props) {
    const handleToggle = async () => {
        const newStatus = task.status === "CLOSED" ? "OPEN" : "CLOSED";
        try {
            const updated = await updateTask(taskListId, task.id, {
                ...task,
                status: newStatus,
            });
            onToggle(updated);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-3 hover:border-indigo-300 hover:shadow-sm transition-all duration-150">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <input
                            type="checkbox"
                            checked={task.status === "CLOSED"}
                            onChange={handleToggle}
                            className="w-4 h-4 accent-indigo-600 cursor-pointer"
                        />
                        <h3
                            className={`text-sm font-semibold truncate ${task.status === "CLOSED" ? "line-through text-slate-400" : "text-slate-800"}`}
                        >
                            {task.title}
                        </h3>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}
                        >
                            {task.priority}
                        </span>
                    </div>
                    {task.description && (
                        <p className="text-slate-400 text-xs mb-1">
                            {task.description}
                        </p>
                    )}
                    {task.dueDate && (
                        <p className="text-xs text-slate-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                    )}
                </div>

                <div className="flex gap-1 shrink-0">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15H9v-2z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1m-4 0h10"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
