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
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialValues = {
  taskId: "",
  title: "",
  cateId: "",
  uId: "",
};
const onSubmit = async (
  values,
  actions,
  setErr,
  setLoading,
  setShow,
  setTasks,
  uid,
  categories,
  editTask,
  setEditTask,
  setReinitialValues
) => {
  setLoading(true);
  const title = values.title;
  const cateId = values.cateId;
  const cate = categories.find((c) => c.catId === values.cateId);
  try {
     
    if(editTask){
      const taskDocRef = doc(db, "task", editTask.taskId);
      if (editTask.taskId !== undefined) {
        const updatedData = {
          taskId: editTask.taskId,
          title: title,
          cateId: cateId,
          uId: editTask.uId,
          state: editTask.state
        };        
          await updateDoc(taskDocRef, updatedData);
          const newTask={
            taskId: editTask.taskId,
          title: title,
          cateId: cateId,
          uId: editTask.uId,
          state: editTask.state,
          cateTitle:cate?.title ,
          cateColor: cate?.color,
          }
  
          setTasks((old) => {
            const newData = [...old];
            const index = newData.findIndex((i) => i.taskId === editTask.taskId);
            newData[index] = newTask;
            return newData;
          });
        }

        setEditTask(null)
        setReinitialValues(null)






    }else{
     const categoryRef = collection(db, "task")
    const newDocRef = await addDoc(categoryRef, {
      title: title,
      cateId: cateId,
      uId: uid,
      state: "notDone",
    });
    await updateDoc(newDocRef, {
      taskId: newDocRef.id,
      title: title,
      cateId: cateId,
      uId: uid,
      state: "notDone",
    });
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          taskId: newDocRef.id,
          title: title,
          cateId: cateId,
          uId: uid,
          state: "notDone",
          cateTitle: cate?.title,
          cateColor: cate?.color,
        },
      ];
    });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    setErr(true);
    throw error;
  }

  actions.resetForm();
  setShow(false);
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please fill this box")
    .min(3, "Enter at least 3 characters"),
  cateId: Yup.string().required("Please fill this box"),
});

const AddTask = ({ editTask, setEditTask, show, setShow }) => {
   const [reinitialValues, setReinitialValues] = useState(null);
  useEffect(() => {
    if (editTask) {
      setReinitialValues({
        title: editTask.title,
        cateId: editTask.cateId,
      });
    } else setReinitialValues(null);
  }, [editTask]);
  const { currentUser } = useContext(AuthContext);
  const { categories, setTasks } = useContext(TaskContext);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleGetCategoriesOptions = async () => {
    try {
      setOptions(
        categories.map((p) => {
          return { id: p.catId, value: p.title };
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    handleGetCategoriesOptions();
  }, [categories]);

  return (
    <>
      
        <AddButton
          onClick={() => {setShow(true)
          setReinitialValues(null)}
          }
          title="Add new"
          className="col-10 text-center mt-2 pointer add-cate add"
        />
     
      <ModalCenter title={reinitialValues?`Edit: ${editTask?.title}`:"Add Task"} show={show} setShow={setShow}>
        <Formik
          initialValues={reinitialValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            onSubmit(
              values,
              actions,
              setErr,
              setLoading,
              setShow,
              setTasks,
              currentUser.uid,
              categories,
              editTask,
              setEditTask,
              setReinitialValues
            )
          }
          enableReinitialize
        >
          <Form className="row col-10 d-flex justify-content-center ms-5">
            <FormikControl
              control="select"
              options={options}
              name="cateId"
              firstItem="please choice category"
              additionalField={<AddCategory />}
            />
            <FormikControl
              control="input"
              type="text"
              name="title"
              placeholder="insert category title"
            />
            <button
              type="submit"
              className="btn submit mt-4 col-10 color-white"
            >
              Add{" "}
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
            </button>
          </Form>
        </Formik>
        {err && <span className="color-war">Somthings done wrong </span>}
      </ModalCenter>
    </>
  );
};

export default AddTask;
