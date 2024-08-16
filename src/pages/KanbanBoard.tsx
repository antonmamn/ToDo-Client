import React, { useEffect, useState } from 'react';
import api from '../axios'; // Import the consolidated Axios instance
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from '../TaskColumn';
import '../../styles.css';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string; 
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchTasks();
  }, [userId]); 

  const fetchTasks = async () => {
    
    try {
      const response = await api.get('/todolist/todo', {
        params: { userId } 
      });
   
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    try {
      await api.post('/todolist/todo', {
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'todo',
        userId,
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await api.put(`/todolist/todo/${taskId}`, {
        status: newStatus,       
      });
      setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.delete(`/todolist/todo/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openTaskForm = () => setIsAddingTask(true);
  const closeTaskForm = () => {
    setIsAddingTask(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="columns">
          {['todo', 'in progress', 'done'].map(status => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              openTaskForm={openTaskForm}
              isAddingTask={isAddingTask && status === 'todo'}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              newTaskDescription={newTaskDescription}
              setNewTaskDescription={setNewTaskDescription}
              createTask={createTask}
              closeTaskForm={closeTaskForm}
              setTasks={setTasks}
              setIsAddingTask={setIsAddingTask}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default KanbanBoard;

export const ItemTypes = {
  TASK: 'task',
};
