import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import {VscFilterFilled} from 'react-icons/vsc';
const Tasks = () => {
  const [show, setShow] = useState(false);
  const [editTask,setEditTask]=useState(null)
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
          <Task editTask={editTask} setEditTask={setEditTask} setShow={setShow} />
          <AddTask editTask={editTask} setEditTask={setEditTask} show={show} setShow={setShow} />        
      </div>
    </>
    );
}

export default Tasks;
