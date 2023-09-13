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


import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/UserContext";
import AddButton from "./AddButton";
import ModalCenter from "../Modal";
import FormikControl from "../form/FormikControl";
import { TaskContext } from "../../context/TasksContext";

const initialValues = {
  title: "",
  color: "",
};
const onSubmit = async (values, actions, setErr, setLoading,setShow) => {
    try{

       
    }catch(err){setErr(true)}
  setShow(false)
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please fill this box")
    .min(6, "Enter at least 6 characters"),
  color: Yup.string().required("Please fill this box"),
});

const AddTask = () => {
  const { currentUser } = useContext(AuthContext);
  const {categories,tasks}=useContext(TaskContext)

  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
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
            onSubmit(values, actions, setErr, setLoading,setShow)
          }
        >
              <Form className="row col-10 d-flex justify-content-center ms-5">
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  placeholder="insert category title"
                />
                <FormikControl
                  control="input"
                  type="color"
                  name="color"
                  // placeholder="choice category color "
                />
                <button className="btn submit mt-4 col-10">Add</button>
              </Form>
           
        </Formik>
        {err&&<span>Somthings done wrong </span>}
      </ModalCenter>
    </>
  );
};

export default AddTask;
