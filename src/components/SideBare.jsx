import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BsClipboard2Check } from "react-icons/bs";
import picture from "../img/istockphoto-1410607969-612x612.jpg";
import pic from "../img/logo.png";
import Collaps from "./form/Collaps";
import AddCategory from "./AddCategory";
import { AuthContext } from "../context/UserContext";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { TaskContext } from "../context/TasksContext";
import { date } from "yup";

const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { setCatergories, categories } = useContext(TaskContext);
   const category = [
    { id: 1, title: "hame", color: "#ff0000" },
    { id: 2, title: "work", color: "#ff0000" },
    { id: 3, title: "scol", color: "#ff0000" },
    { id: 4, title: "shopping", color: "#ff0000" },
  ];
  const getCategoris = async () => {
    try{
      const categoryRef = collection(db, 'category');
    const querySnapshot = await getDocs(categoryRef);
    const categoryData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      categoryData.push(data);
    });
    return categoryData
  } catch (error) {
    console.error('Error fetching category data:', error);
    throw error; // Handle the error in your component}
  }}
 
    useEffect(() => {
      try{}catch(err){}
    const data= getCategoris(currentUser.uid)
    .then((categoryData) => {
      setCatergories(()=>{return categoryData})
      // return categoryData
    })
    .catch((error) => {
      console.error('Error:', error);
    })
      }, []);





  return (
    <div className="d-none d-md-flex col-2 sidebare ">
      <img className="col-6" src={pic} alt="" />
      <div className="d-flex flex-column sid-content col-9">
        <div className="cursor-pointer mb-1 ps-3 f-sidebare">
          <BsClipboard2Check className="icon" />
          Task
        </div>
        <Collaps title="Categories" options={categories}>
          <AddCategory />
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
