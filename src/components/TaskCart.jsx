import React from 'react';
import {MdDelete} from 'react-icons/md'
import {MdModeEdit} from 'react-icons/md'
import { ConvertColor } from './form/ConvertColor';

const TaskCart = ({task,className}) => {
// console.log("task in taskcard",task)
    return (
        <div className={`${className} task-cart`}>
          
        <div className="col-8 d-flex flex-column">
          <div className="d-flex fs-4-">{task.title}</div>
          <div className="d-flex "><ConvertColor className="d-flex color-box"  item={task.cateColor} /> {task.cateTitle}</div>
        </div>
        <div className="d-flex flex-row icon col-4 justify-content-end fs-3">
          <MdModeEdit className="col-2"/>
          <MdDelete className="col-2"/>
        </div>
        </div>
    );
}

export default TaskCart;



