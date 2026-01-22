import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Check, Circle, ListTodo, CalendarIcon, Flag, Pencil, LogIn, LogOut, Cloud } from "lucide-react";
import { format, isPast, isToday, parseISO } from "date-fns";
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
import { useAuth } from "@/contexts/AuthContext";
import { useTasks, Priority, Task } from "@/hooks/useTasks";
import { AuthModal } from "@/components/AuthModal";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { user, loading: authLoading, signOut } = useAuth();
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [newDueDate, setNewDueDate] = useState<Date | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Focus edit input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    createTask.mutate({
      text: newTask.trim(),
      priority: newPriority,
      due_date: newDueDate ? format(newDueDate, "yyyy-MM-dd") : null,
    });
    setNewTask("");
    setNewPriority("medium");
    setNewDueDate(undefined);
  };

  const handleToggleTask = (task: Task) => {
    updateTask.mutate({
      id: task.id,
      updates: { completed: !task.completed },
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask.mutate(id);
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) {
      setEditingId(null);
      return;
    }
    updateTask.mutate({
      id: editingId,
      updates: { text: editText.trim() },
    });
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const getDueDateDisplay = (dueDate?: string | null) => {
    if (!dueDate) return null;
    const date = parseISO(dueDate);
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
      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }
      if (a.due_date) return -1;
      if (b.due_date) return 1;
      return 0;
    });

  const completedTasks = filteredTasks.filter(t => t.completed);

  // Show sign-in prompt if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="space-y-6">
        <SectionHeader
          title="To-Do / Pending Tasks"
          icon={<ListTodo className="h-5 w-5" />}
        />
        <div className="text-center py-12 border border-dashed border-border/50 rounded-lg">
          <Cloud className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">Sync Tasks Across Devices</h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
            Sign in to save your tasks to the cloud and access them from any device or browser.
          </p>
          <Button onClick={() => setAuthModalOpen(true)} className="gap-2">
            <LogIn className="h-4 w-4" />
            Sign In to Continue
          </Button>
        </div>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="To-Do / Pending Tasks"
          icon={<ListTodo className="h-5 w-5" />}
          count={sortedPendingTasks.length}
        />
        {user && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <Cloud className="h-3 w-3" />
              Synced
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

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
          <Button onClick={handleAddTask} className="gap-2" disabled={createTask.isPending}>
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

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}

      {/* Pending Tasks */}
      {!isLoading && (
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
                    onClick={() => handleToggleTask(task)}
                    className="h-5 w-5 rounded-full border-2 border-muted-foreground/50 hover:border-primary flex items-center justify-center transition-colors shrink-0"
                  >
                    <span className="sr-only">Complete task</span>
                  </button>
                  <div className="flex-1 min-w-0">
                    {editingId === task.id ? (
                      <Input
                        ref={editInputRef}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        onBlur={saveEdit}
                        className="text-sm h-7 bg-background border-primary"
                        maxLength={500}
                      />
                    ) : (
                      <span 
                        className="text-sm block cursor-pointer hover:text-primary transition-colors"
                        onClick={() => startEditing(task)}
                        title="Click to edit"
                      >
                        {task.text}
                      </span>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={cn("text-xs px-1.5 py-0", priorityConfig[task.priority].badgeClass)}>
                        {priorityConfig[task.priority].label}
                      </Badge>
                      {getDueDateDisplay(task.due_date)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {editingId !== task.id && (
                      <button
                        onClick={() => startEditing(task)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all p-1"
                        title="Edit task"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Completed Tasks */}
      {!isLoading && completedTasks.length > 0 && (
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
                  onClick={() => handleToggleTask(task)}
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
                  onClick={() => handleDeleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};
