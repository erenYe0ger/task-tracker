import TaskListsPage from "./pages/TaskListsPage";

export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="flex-1">
                <TaskListsPage />
            </div>
            <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-200">
                Made with{" "}
                <span className="text-sky-500 font-medium">React</span> +{" "}
                <span className="text-green-600 font-medium">Spring</span>
            </footer>
        </div>
    );
}
