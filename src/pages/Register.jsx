import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import backPic from "../img/back.jpg";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Spinner from 'react-bootstrap/Spinner';
import FormikControl from "../components/form/FormikControl";
import { doc, setDoc } from "firebase/firestore";



const initialValues = {
  name: "",
  email: "",
  password: "",
};
const onSubmit =async (values, actions,setErr,setLoading,navigate) => {
    setLoading(true)

  const displayName=values.name
  const email=values.email
  try{
      const res=await createUserWithEmailAndPassword(auth, values.email, values.password)
      await updateProfile(res.user,{
        displayName
      })
      await setDoc(doc(db,"users",res.user.uid),{
        uid:res.user.uid,
        displayName,
        email
      })

      navigate("/")
  }catch(error){
    setErr(true)
  }
 setLoading(false)
};

const validationSchema = Yup.object({
  name: Yup.string().required("Please fill this box"),
  email: Yup.string()
    .required("Please fill this box")
    .email("Please follow the email format, for example: aaa@example.bbb"),
  password: Yup.string()
    .required("Please fill this box")
    .min(6, "Enter at least 6 characters"),
});

const Register = () => {
  const navigate=useNavigate()
    const [err,setErr]=useState(false)
    const [loading,setLoading]=useState(false)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => onSubmit(values, actions,setErr,setLoading,navigate)}
    >
      <div className="col-12 d-flex flex-row image ">
        <div className="d-none d-md-flex col-6">
          <img src={backPic} alth="" className="col-12" />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center align-item-center">
          <h3 className="text-center">Welcome To Tasker</h3>
          <p >
            Please insert your informations to access your tasks
          </p>
          <Form className="row col-10 d-flex justify-content-center ms-5">
            <FormikControl
              control="input"
              type="text"
              name="name"
              label="Name"
              placeholder="insert your name"
            />
            <FormikControl
              control="input"
              type="text"
              name="email"
              label="Email"
              placeholder="insert your email"
            />
            <FormikControl
              control="input"
              type="password"
              name="password"
              label="Password"
              placeholder="insert your password"
            />
            <button type="submit" className="btn submit mt-4 col-10">
              Sign Up {loading&& <Spinner animation="border" role="status" size="sm"/>}
            </button>
          </Form>
          {err&& <p className="mt-4">Something went wrong</p>}
          <p className="mt-4">You have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </Formik>
  );
};

export default Register;
