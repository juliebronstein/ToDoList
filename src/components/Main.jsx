import React, { useContext, useEffect, useState } from 'react';
import Task from './Task/Task';
import {VscFilterFilled} from 'react-icons/vsc';
import AddButton from './Task/AddButton';
import AddTask from './Task/AddTask';
import { TaskContext } from '../context/TasksContext';
import { AuthContext } from '../context/UserContext';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Main = () => {

const { currentUser } = useContext(AuthContext);
const {categories, setTasks, tasks } = useContext(TaskContext);
const [newTasks,setNewTasks]=useState([])
const [forceRender,setForceRender]=useState(0)
const getTasks = async () => {
  console.log("categories",categories)
  try{
    const taskRef = collection(db, 'task');
  const querySnapshot = await getDocs(taskRef);
  const taskData = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    let cate= categories.find(c=>c.catId===data.cateId)
    let newdata={
      cateId: data.cateId,
      taskId: data.taskId,
      title: data.title,
      uId: data.uId,
      cateTitle: cate?.title,
      cateColor: cate?.color,
    }
    taskData.push(newdata)
  });
  
  return taskData
} catch (error) {
  console.error('Error fetching task data:', error);
  throw error; // Handle the error in your component}
}}

  const setCompleteTasksData=()=>{
    // setNewTasks(tasks)
    // setTasks([])
  tasks.map(task=>{
    
    let cate=categories.find(c=>c.catId===task.cateId)
    let newtask={
      cateId: task.cateId,
      taskId: task.taskId,
      title: task.title,
      uId: task.uId,
      cateTitle: cate.title,
      cateColor: cate.color,
    }
   setNewTasks((old)=>{return [...old,newtask]})
    
  })
  setTasks(()=>{return newTasks})
  console.log("newTask:===========:",newTasks)
}

  useEffect(() => {
   
  const data= getTasks(currentUser.uid)
  .then((taskData) => {
    setTasks(()=>{return taskData})
  })
  .catch((error) => {
    console.error('Error:', error);
  })

 setTimeout(() => {
  setCompleteTasksData()
}, "100");
   }, []);


 

    return (
      <>
        <div className='col-12 col-md-10 pt-5 pt-md-0 main d-flex flex-column align-item-center'>
          <div className='col-10 d-flex justify-content-between align-item-center ps-2' >
            <div className='d-none col-6 d-md-flex fs-4'>Tasks</div>
            <div className='d-flex flex-row justify-md-content-center align-item-center col-10 col-md-4'>
              <button className='chips col-3'>All</button>
              <button className='chips col-3'>Done</button>
              <button className='chips col-5 col-md-3'>Not Done</button>
              <button className='chips col-3 col-md-2'><VscFilterFilled/></button>             
            </div>
          </div>
            <Task tasks={tasks}/>
            <AddTask setForceRender={setForceRender} />        
        </div>
      </>
    );
}

export default Main;
