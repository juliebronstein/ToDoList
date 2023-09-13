import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import { AuthContextProvider } from './context/UserContext';
import { TaskContextProvider } from './context/TasksContext';


const root = document.getElementById('root');

ReactDOM.render(
  <AuthContextProvider>
     <TaskContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </TaskContextProvider>
  </AuthContextProvider>
  ,root
);



