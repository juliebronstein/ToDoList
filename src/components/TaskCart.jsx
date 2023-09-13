import React from 'react';
import {MdDelete} from 'react-icons/md'
import {MdModeEdit} from 'react-icons/md'

const TaskCart = ({task}) => {

    return (
        <div className="col-10 task-cart">
        <div className="col-8 d-flex flex-column">
          <div className="d-flex fs-4-">{task.title}</div>
          <div className="d-flex ">{task.category}</div>
        </div>
        <div className="d-flex flex-row icon col-4 justify-content-end fs-3">
          <MdModeEdit className="col-2"/>
          <MdDelete className="col-2"/>
        </div>
        </div>
    );
}

export default TaskCart;




