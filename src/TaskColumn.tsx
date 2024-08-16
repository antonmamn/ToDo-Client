import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { ItemTypes } from './pages/KanbanBoard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskColumnProps {
  status: string;
  tasks: Task[];
  updateTaskStatus: (taskId: string, newStatus: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  openTaskForm: () => void;
  isAddingTask: boolean;
  newTaskTitle: string;
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  newTaskDescription: string;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  createTask: () => void;
  closeTaskForm: () => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  updateTaskStatus,
  deleteTask,
  openTaskForm,
  isAddingTask,
  newTaskTitle,
  setNewTaskTitle,
  newTaskDescription,
  setNewTaskDescription,
  createTask,
  closeTaskForm,  
}) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: { id: string }) => updateTaskStatus(item.id, status),
  });

  return (
    <div className={`task-column ${status}`} ref={drop}>
      <div className="column-header">
        <h3>{status.toUpperCase()}</h3>
        {status === 'todo' && (
          <button className="add-task-button" onClick={openTaskForm}>
            Add Task
          </button>
        )}
      </div>
      {status === 'todo' && isAddingTask && (
        <div className="task-creation">
          <input
            type="text"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={newTaskDescription}
            onChange={e => setNewTaskDescription(e.target.value)}
          />
          <button onClick={createTask}>Create Task</button>
          <button onClick={closeTaskForm}>Cancel</button>
        </div>
      )}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskColumn;
