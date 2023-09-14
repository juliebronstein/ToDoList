import React, { useContext } from "react";
import FormikControl from "../form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TaskCart from "../TaskCart";
import { TaskContext } from "../../context/TasksContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialValues = {
  email: "",
};
const onSubmit = async (values, actions) => {};


  // const {tasks,setTask}=useContext(TaskContext)
const setDoneTask = async (task) => {

  const state = task.state === "notDone" ? "done" : "notDone";
  const taskDocRef = doc(db, "task", task.taskId);
  if (task.taskId !== undefined) {
    const updatedData = {
      taskId: task.taskId,
      title: task.title,
      cateId: task.cateId,
      uId: task.uId,
      state: state,
    };

    try {
      await updateDoc(taskDocRef, updatedData);
      // const index=tasks.findIndex(t=>t.taskId===task.taskId)
      // const newTask={
      //   taskId:task.taskId,
      //   title: task.title,
      //   cateId: task.cateId,
      //   uId:task.uid,
      //   state:state,
      //   cateTitle: task.cateTitle,
      //   cateColor: task.cateColor,
      // }
      // console.log(newTask)
      // console.log(index)
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } else {
    console.error("task.taskId is undefined or does not exist.");
  }
};

const Task = () => {
  const { tasks } = useContext(TaskContext);
  const validationSchema = Yup.object({
  });
  return (
    <div className="task col-10 ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {(formik) => {
          return (
            <Form className="col-12 d-flex flex-column">
              {tasks.map((task) => (
                <div key={task.taskId + "=="} className="d-flex flex-row mb-2">
                  <FormikControl
                    className="col-2"
                    control="checkbox"
                    handler={setDoneTask}
                    task={task}
                    formik={formik}
                    value={task.state === "notDone" ? false : true}
                  />
                  <TaskCart
                    className="col-10"
                    key={"index_" + task.taskId + "id"}
                    task={task}
                  />
                </div>
              ))}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Task;
