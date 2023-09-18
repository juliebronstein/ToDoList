import React from 'react';
import {MdDelete} from 'react-icons/md'
import {MdModeEdit} from 'react-icons/md'
import { ConvertColor } from '../form/ConvertColor';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const TaskCart = ({task,className,state,setEditTask,setShow}) => {
  
  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'task', taskId); // Reference to the task document with taskId
      await deleteDoc(taskDocRef);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error; // Handle the error in your component
    }
  }
  const handelDalete=(id)=>{

deleteTask(id)
  .then(() => {
    
  })
  .catch((error) => {
  });

  }
    return (
        <div className={`${className} task-cart`}>
        <div className="col-8 d-flex flex-column">
          <div className={`${state?"task-deactive":"task-active"} d-flex fs-4-`}>{task.title}</div>
          <div className="d-flex "><ConvertColor className={`d-flex color-box`}  item={task.cateColor} />
           <span className={`${state?"task-deactive":"task-active"}`} > {task.cateTitle}</span></div>
        </div>
        <div className="d-flex flex-row icon col-4 justify-content-end fs-3">
          <MdModeEdit onClick={()=>{
            setShow(true)
            setEditTask(task)
            }}
             className="col-2"/>
          <MdDelete onClick={()=>handelDalete(task.taskId)} className="col-2"/>
        </div>
        </div>
    );
}

export default TaskCart;




