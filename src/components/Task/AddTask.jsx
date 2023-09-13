// {/*  */}

// import React, { useState } from 'react';

// import AddButton from './AddButton';

// const AddTask = () => {

//     return (
//       <>
//       <AddButton
//         onClick={() => setShow(true)}
//         title="Add a task"
//         className="col-10 text-center mt-2 pointer add"
//       />
//       </>
//     );
// }

// export default AddTask;


import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/UserContext";
import AddButton from "./AddButton";
import ModalCenter from "../Modal";
import FormikControl from "../form/FormikControl";
import { TaskContext } from "../../context/TasksContext";
import { Spinner } from "react-bootstrap";
import AddCategory from "../AddCategory";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialValues = {
 taskId:"",
 title: "",
 cateId: "",
 uId:""
};
const onSubmit = async (values, actions, setErr, setLoading,setShow,setTasks,uid,setForceRender) => {
    setLoading(true)
    console.log("values in add task:",values)
    const title=values.title
    const cateId=values.cateId
    try {
      const categoryRef = collection(db, 'task');
      const newDocRef = await addDoc(categoryRef, {
        title: title,
        cateId: cateId,
        uId:uid
      });
      await updateDoc(newDocRef, {
        taskId: newDocRef.id,
        title: title,
        cateId: cateId,
        uId:uid
      });
      setTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            taskId:newDocRef.id,
            title: title,
            cateId: cateId,
            uId:uid
          }
        ];
      });
      setForceRender(last=>last+1)
    } catch (error) {
      console.error('Error adding document: ', error);
      setErr(true)
      throw error; 
    }
  
  actions.resetForm()

    setShow(false)
  };

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please fill this box")
    .min(3, "Enter at least 3 characters"),
    cateId:Yup.string().required("Please fill this box")
});

const AddTask = ({setForceRender}) => {
  const { currentUser } = useContext(AuthContext);
  const {categories,setTasks}=useContext(TaskContext)
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options,setOptions]=useState([])
  const handleGetCategoriesOptions = async () => {
    try {
        setOptions(
          categories.map((p) => {
            return { id: p.catId, value: p.title };
          }))
    } catch (error) {
     
    }
  };
  useEffect(() => {
    handleGetCategoriesOptions();
  }, [categories]);

  return (
    <>
      <AddButton
        onClick={() => setShow(true)}
        title="Add new"
        className="col-10 text-center mt-2 pointer add-cate add"
      />
      <ModalCenter title="Add Task" show={show} setShow={setShow}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setErr, setLoading,setShow,setTasks,currentUser.uid,setForceRender)
          }
        >
             
              <Form className="row col-10 d-flex justify-content-center ms-5">

              <FormikControl
                    control="select"
                    options={options}
                    name="cateId"
                    firstItem="please choice category"
                    additionalField={<AddCategory/>}
                    />
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  placeholder="insert category title"
                />
                <button type="submit" className="btn submit mt-4 col-10 color-white">Add {loading&& <Spinner animation="border" role="status" size="sm"/>}</button>
              </Form>
           
        </Formik>
        {err&&<span className="color-war">Somthings done wrong </span>}
      </ModalCenter>
    </>
  );
};

export default AddTask;
