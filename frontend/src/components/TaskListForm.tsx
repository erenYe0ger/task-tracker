type Props = {
    isOpen: boolean;
    editingTaskList: { id: string } | null;
    title: string;
    description: string;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
};

export default function TaskListForm({
    isOpen,
    editingTaskList,
    title,
    description,
    setTitle,
    setDescription,
    onSubmit,
    onCancel,
}: Props) {
    if (!isOpen) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-700 mb-4">
                {editingTaskList ? "Edit list" : "New list"}
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-3 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />

            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />

            <div className="flex gap-2">
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
                >
                    {editingTaskList ? "Save changes" : "Create list"}
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
