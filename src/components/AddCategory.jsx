import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/form/FormikControl";
import ModalCenter from "./Modal";
import AddButton from "./Task/AddButton";
import { AuthContext } from "../context/UserContext";
import { TaskContext } from "../context/TasksContext";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialValues = {
  title: "",
  color: "",
};
const onSubmit = async (values, actions, setErr, setLoading,setShow,uid,setCatergories) => {
  setLoading(true)
  const title=values.title
  const color=values.color
  try {
    const categoryRef = collection(db, 'category');
    const newDocRef = await addDoc(categoryRef, {
      userId: uid,
      title: title,
      color: color,
    });
    await updateDoc(newDocRef, {
      catId: newDocRef.id,
      userId: uid,
      title: title,
      color: color,
    });
    setCatergories((prevCategories) => {
      return [
        ...prevCategories,
        {
          catId:newDocRef.id,
          userId: uid,
          title: title,
          color: color,
        }
      ];
    });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error; 
  }




  setShow(false)
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please fill this box")
    .min(2, "Enter at least 2 characters"),
  color: Yup.string().required("Please fill this box"),
});

const AddCategory = () => {
  const { currentUser } = useContext(AuthContext);
  const {setCatergories}=useContext(TaskContext)
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
      <ModalCenter title="Add Category" show={show} setShow={setShow}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setErr, setLoading,setShow ,currentUser.uid,setCatergories)
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
                />
                <button type="submit" className="btn submit mt-4 col-10">Add</button>
              </Form>
           
        </Formik>
        {err&&<span>Somthings done wrong </span>}
      </ModalCenter>
    </>
  );
};

export default AddCategory;
