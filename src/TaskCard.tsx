import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './pages/KanbanBoard';



interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
  deleteTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, deleteTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{task.title}</h4>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      {isExpanded && <p>{task.description}</p>}
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
