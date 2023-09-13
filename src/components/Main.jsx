import React, { useState } from 'react';
import Task from './Task/Task';
import {VscFilterFilled} from 'react-icons/vsc';
import AddButton from './Task/AddButton';
import AddTask from './Task/AddTask';

const Main = () => {
const tasks=[
  {id:"1",title:"TaskExample",category:"Home",}
]

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
            <AddTask/>        
        </div>
      </>
    );
}

export default Main;
