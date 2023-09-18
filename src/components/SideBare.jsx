import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";
import pic from "../img/logo.png";
import Collaps from "./form/Collaps";
import AddCategory from "./AddCategory";
import { TaskContext } from "../context/TasksContext";

const SideBar = () => {
  const { categories } = useContext(TaskContext);
  return (
    <div className="d-none d-md-flex col-2 sidebare ">
      <img className="col-6" src={pic} alt="" />
      <div className="d-flex flex-column sid-content col-9">
        <div className="cursor-pointer mb-1 ps-3 f-sidebare">
          <BsClipboard2Check className="icon" />
          Task
        </div>
        <Collaps title="Categories" options={categories}>
          <AddCategory className="col-10 text-center mt-2 add" />
        </Collaps>
        <div className="cursor-pointer mt-1 ps-3 f-sidebare">
          <IoSettingsOutline className="icon" />
          Setting
        </div>
      </div>
      <span
        className="logout ps-3"
        onClick={() => {
          signOut(auth);
        }}
      >
        {" "}
        Logout <MdLogout className="CiLogout" />
      </span>
    </div>
  );
};

export default SideBar;
