import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCatergories] = useState([]);
  return (
    <TaskContext.Provider value={{setTasks, tasks,setCatergories, categories }}>
      {children}
    </TaskContext.Provider>
  );
};