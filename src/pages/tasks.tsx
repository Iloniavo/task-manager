import React, { ChangeEvent, useRef } from 'react';
import {useTaskManager} from "@/store/useTaskManager";
import {useEffect} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
    const createTaskRef = useRef<HTMLInputElement>();
    const { setStorageItem, getStorageItem } = useLocalStorage('tasks')
    const {
     tasks,
    searchTask,
       addTask,
     updateTask,
     deleteTask,
     setSearchTask,
   } = useTaskManager();

  const handleAddTask = () => {
      const title = createTaskRef.current?.value ?? '';
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
     addTask(newTask);
      console.log("Tasks added ", tasks)
  };

  const handleUpdateTask = (taskId: number, updatedTask: { title: string }) => {
     updateTask(taskId, updatedTask);
     console.log("task updated ", tasks)
  };

  const handleDeleteTask = (taskId: number) => {
     deleteTask(taskId);
      console.log("task deleted ",tasks)
  };


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
     searchTask(e.target.value);
    };


    useEffect(() => {
        setStorageItem(tasks)
    }, [tasks])

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef}/>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { title: e.target.value })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
        }
      </ul>
    </div>
  );
};

export default TaskManager;
