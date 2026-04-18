import type { Task, TaskPriority } from "../api/tasks";

type Props = {
    isOpen: boolean;
    editingTask: Task | null;
    title: string;
    description: string;
    dueDate: string;
    priority: TaskPriority;
    setTitle: (v: string) => void;
    setDescription: (v: string) => void;
    setDueDate: (v: string) => void;
    setPriority: (v: TaskPriority) => void;
    onSubmit: () => void;
    onCancel: () => void;
};

export default function TaskForm({
    isOpen,
    editingTask,
    title,
    description,
    dueDate,
    priority,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    onSubmit,
    onCancel,
}: Props) {
    if (!isOpen) return null;

    const inputClass =
        "w-full mb-3 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-700 mb-4">
                {editingTask ? "Edit task" : "New task"}
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
            />

            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
            />

            <div className="mb-3">
                <label className="block text-xs text-slate-400 mb-1 px-1">
                    Due date (optional)
                </label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
            </div>

            <div className="flex gap-2 mb-3">
                {(["LOW", "MEDIUM", "HIGH"] as TaskPriority[]).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                            priority === p
                                ? p === "LOW"
                                    ? "bg-green-100 border-green-400 text-green-700"
                                    : p === "MEDIUM"
                                      ? "bg-amber-100 border-amber-400 text-amber-700"
                                      : "bg-red-100 border-red-400 text-red-600"
                                : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <div className="flex gap-2 mt-1">
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
                >
                    {editingTask ? "Save changes" : "Create task"}
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 active:scale-95 transition-all"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
