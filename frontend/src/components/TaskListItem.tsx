import type { TaskList } from "../api/taskLists";

type Props = {
    taskList: TaskList;
    onEdit: (taskList: TaskList) => void;
    onDelete: (id: string) => void;
    onSelect: (taskList: TaskList) => void;
};
export default function TaskListItem({
    taskList,
    onEdit,
    onDelete,
    onSelect,
}: Props) {
    return (
        <div
            className="group bg-white border border-slate-200 rounded-xl p-4 mb-3 hover:border-indigo-300 hover:shadow-sm transition-all duration-150 cursor-pointer"
            onClick={() => onSelect(taskList)}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                        {taskList.title}
                    </h3>
                    {taskList.description && (
                        <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">
                            {taskList.description}
                        </p>
                    )}
                    {!!taskList.count && taskList.count > 0 && (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>
                                    {taskList.count} task
                                    {taskList.count !== 1 ? "s" : ""}
                                </span>
                                <span>
                                    {Math.round((taskList.progress ?? 0) * 100)}
                                    %
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 rounded-full transition-all"
                                    style={{
                                        width: `${Math.round((taskList.progress ?? 0) * 100)}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-1 shrink-0">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(taskList);
                        }}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(taskList.id);
                        }}
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
