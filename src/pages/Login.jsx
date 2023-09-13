import React, { useState } from 'react';
import {  Form, Formik} from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from "react-router-dom";
import backPic from "../img/back.jpg" ;
import FormikControl from '../components/form/FormikControl';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const initialValues ={
    email: '',
    password: '',
}
const onSubmit = async(values, actions,setErr,setLoading,navigate)=>{

  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/")
  } catch (err) {
    setErr(true);
  }
   
}

const validationSchema = Yup.object({
    email:Yup.string().required('Please fill this box').email("Please follow the email format, for example: aaa@example.bbb"),
    password: Yup.string().required('Please fill this box').min(6 , 'Enter at least 6 characters'),
   
})


const Login = () => {
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
              <button className="btn submit mt-4 col-10">
                Sign In
              </button>
            </Form>
            <p className="mt-4">You don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </Formik>
    );
}

export default Login;
