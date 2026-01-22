import { useState, useEffect } from "react";
import { Plus, Trash2, Check, Circle, ListTodo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TasksSectionProps {
  searchQuery: string;
}

export const TasksSection = ({ searchQuery }: TasksSectionProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("workflowhub-tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("workflowhub-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="To-Do / Pending Tasks"
        icon={<ListTodo className="h-5 w-5" />}
        count={pendingTasks.length}
      />

      {/* Add Task Input */}
      <div className="flex gap-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task... (e.g., Add new page to quick links on all bureau homepage pages)"
          className="flex-1 bg-card border-border/50 focus:border-primary"
        />
        <Button onClick={addTask} className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Circle className="h-4 w-4 text-primary" />
          Pending ({pendingTasks.length})
        </h3>
        {pendingTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground/60 py-4 text-center border border-dashed border-border/50 rounded-lg">
            No pending tasks. Add one above!
          </p>
        ) : (
          <div className="space-y-2">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="h-5 w-5 rounded-full border-2 border-muted-foreground/50 hover:border-primary flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Complete task</span>
                </button>
                <span className="flex-1 text-sm">{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" />
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/30 group"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="h-5 w-5 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center"
                >
                  <Check className="h-3 w-3 text-accent" />
                </button>
                <span className="flex-1 text-sm text-muted-foreground line-through">
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
