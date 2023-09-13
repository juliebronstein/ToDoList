import React from "react";
import {MdOutlineAddBox} from 'react-icons/md'
const AddButton = ({title,className,onClick}) => {
  return (
    <>
      <div className={className} onClick={onClick} ><MdOutlineAddBox/> {title}</div>
    </>
  );
};

export default AddButton;
