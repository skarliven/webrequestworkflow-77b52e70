import { useState, useEffect } from "react";
import { Plus, Trash2, Check, Circle, ListTodo, CalendarIcon, Flag } from "lucide-react";
import { format, isPast, isToday } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Priority = "low" | "medium" | "high";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: Priority;
  dueDate?: string;
}

interface TasksSectionProps {
  searchQuery: string;
}

const priorityConfig: Record<Priority, { label: string; className: string; badgeClass: string }> = {
  low: { 
    label: "Low", 
    className: "border-l-4 border-l-muted-foreground/30",
    badgeClass: "bg-muted text-muted-foreground"
  },
  medium: { 
    label: "Medium", 
    className: "border-l-4 border-l-primary",
    badgeClass: "bg-primary/20 text-primary"
  },
  high: { 
    label: "High", 
    className: "border-l-4 border-l-destructive",
    badgeClass: "bg-destructive/20 text-destructive"
  },
};

export const TasksSection = ({ searchQuery }: TasksSectionProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>();

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
      priority: newPriority,
      dueDate: newDueDate ? format(newDueDate, "yyyy-MM-dd") : undefined,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
    setNewPriority("medium");
    setNewDueDate(undefined);
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

  const getDueDateDisplay = (dueDate?: string) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const overdue = isPast(date) && !isToday(date);
    const today = isToday(date);
    
    return (
      <span className={cn(
        "text-xs flex items-center gap-1",
        overdue && "text-destructive",
        today && "text-primary",
        !overdue && !today && "text-muted-foreground"
      )}>
        <CalendarIcon className="h-3 w-3" />
        {today ? "Today" : format(date, "MMM d")}
        {overdue && " (overdue)"}
      </span>
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by priority (high first) then by due date
  const sortedPendingTasks = filteredTasks
    .filter(t => !t.completed)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0;
    });

  const completedTasks = filteredTasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="To-Do / Pending Tasks"
        icon={<ListTodo className="h-5 w-5" />}
        count={sortedPendingTasks.length}
      />

      {/* Add Task Input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 bg-card border-border/50 focus:border-primary"
          />
          <Button onClick={addTask} className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        
        {/* Priority and Due Date selectors */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-muted-foreground" />
            <Select value={newPriority} onValueChange={(v: Priority) => setNewPriority(v)}>
              <SelectTrigger className="w-[120px] h-8 text-xs bg-card border-border/50">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 text-xs bg-card border-border/50 gap-2",
                  !newDueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-3 w-3" />
                {newDueDate ? format(newDueDate, "MMM d, yyyy") : "Due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={newDueDate}
                onSelect={setNewDueDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          {newDueDate && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground"
              onClick={() => setNewDueDate(undefined)}
            >
              Clear date
            </Button>
          )}
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Circle className="h-4 w-4 text-primary" />
          Pending ({sortedPendingTasks.length})
        </h3>
        {sortedPendingTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground/60 py-4 text-center border border-dashed border-border/50 rounded-lg">
            No pending tasks. Add one above!
          </p>
        ) : (
          <div className="space-y-2">
            {sortedPendingTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 hover:border-primary/30 transition-colors group",
                  priorityConfig[task.priority].className
                )}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="h-5 w-5 rounded-full border-2 border-muted-foreground/50 hover:border-primary flex items-center justify-center transition-colors shrink-0"
                >
                  <span className="sr-only">Complete task</span>
                </button>
                <div className="flex-1 min-w-0">
                  <span className="text-sm block">{task.text}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={cn("text-xs px-1.5 py-0", priorityConfig[task.priority].badgeClass)}>
                      {priorityConfig[task.priority].label}
                    </Badge>
                    {getDueDateDisplay(task.dueDate)}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
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
                  className="h-5 w-5 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center shrink-0"
                >
                  <Check className="h-3 w-3 text-accent" />
                </button>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-muted-foreground line-through block">
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
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
