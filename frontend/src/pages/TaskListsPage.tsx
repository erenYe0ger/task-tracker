import {
    getTaskLists,
    createTaskList,
    updateTaskList,
    deleteTaskList,
    type TaskList,
} from "../api/taskLists";

import TaskListForm from "../components/TaskListForm";
import TasksPage from "./TasksPage";

import { useEffect, useState } from "react";
import TaskListItem from "../components/TaskListItem";

export default function TaskListsPage() {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>(
        null,
    );

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTaskList, setEditingTaskList] = useState<TaskList | null>(
        null,
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchTaskLists = () => {
        getTaskLists()
            .then((data) => setTaskLists(data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchTaskLists();
    }, []);

    // ✅ CREATE + UPDATE combined
    const handleSubmit = async () => {
        if (!title.trim()) return;

        try {
            if (editingTaskList) {
                await updateTaskList(editingTaskList.id, {
                    id: editingTaskList.id, // ✅ REQUIRED
                    title: title.trim(),
                    description: description || "",
                });
            } else {
                await createTaskList({ title, description });
            }

            // reset
            setTitle("");
            setDescription("");
            setEditingTaskList(null);
            setIsFormOpen(false);

            fetchTaskLists();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ DELETE
    const handleDelete = async (id: string) => {
        try {
            await deleteTaskList(id);
            fetchTaskLists();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ EDIT (prefill form)
    const handleEdit = (taskList: TaskList) => {
        setEditingTaskList(taskList);
        setTitle(taskList.title);
        setDescription(taskList.description || "");
        setIsFormOpen(true);
    };

    if (selectedTaskList) {
        return (
            <TasksPage
                taskList={selectedTaskList}
                onBack={() => setSelectedTaskList(null)}
            />
        );
    }

    return (
        <div className="bg-slate-50 flex justify-center px-4 py-12">
            <div className="w-full max-w-xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                            Task Lists
                        </h1>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => {
                            setEditingTaskList(null);
                            setTitle("");
                            setDescription("");
                            setIsFormOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
                    >
                        <span className="text-lg leading-none">+</span> New List
                    </button>
                </div>

                {/* Form */}
                {isFormOpen ? (
                    <TaskListForm
                        isOpen={isFormOpen}
                        editingTaskList={editingTaskList}
                        title={title}
                        description={description}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingTaskList(null);
                        }}
                    />
                ) : (
                    <>
                        {/* List */}
                        {taskLists.length === 0 ? (
                            <div className="text-center py-20 text-slate-400">
                                <p className="text-4xl mb-3">📋</p>
                                <p className="font-medium">No task lists yet</p>
                                <p className="text-sm mt-1">
                                    Create one to get started
                                </p>
                            </div>
                        ) : (
                            [...taskLists]
                                .reverse()
                                .map((taskList) => (
                                    <TaskListItem
                                        key={taskList.id}
                                        taskList={taskList}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onSelect={setSelectedTaskList}
                                    />
                                ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
