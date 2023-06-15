import {Task} from "@/pages/tasks";
import {create} from "zustand";


interface TaskStore {
  tasks: Task[],
  searchTask: (title: string) => void,
  addTask: (task: Task) => void,
  updateTask: (id: number, task: { title: string }) => void,
  deleteTask: (task: number) => void,
}

const useTaskManager = create<TaskStore>((set) => ({
  tasks: [],
  searchTask: (title) => {
    // Logique de recherche de tâche
    set((state) => ({
      tasks: state.tasks.filter((task) => task.title.includes(title ? title: '')),
    }));
  },

  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task]
    }));  },

  updateTask: (id, newTitle) => {
    // Logique de mise à jour de tâche
    set((state) => ({
      tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle.title } : task
      ),
    }));
  },

  deleteTask: (id) => {
    // Logique de suppression de tâche
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

export {
  useTaskManager
}
