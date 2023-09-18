import React, { useContext, useEffect, useState } from "react";
import FormikControl from "../form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TaskCart from "./TaskCart";
import { TaskContext } from "../../context/TasksContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialValues = {};
const onSubmit = async (values, actions) => {};
const validationSchema = Yup.object({ });


const Task = ({editTask,setEditTask,setShow}) => {
const { tasks, setTasks} = useContext(TaskContext);

const setDoneTask = async (task) => {

    let newState = task.state === "notDone" ? "done" : "notDone";
    const taskDocRef = doc(db, "task", task.taskId);
    if (task.taskId !== undefined) {
      const updatedData = {
        taskId: task.taskId,
        title: task.title,
        cateId: task.cateId,
        uId: task.uId,
        state: newState,
      };
  
      try {
        await updateDoc(taskDocRef, updatedData);
        const newTask={
          taskId:task.taskId,
          title: task.title,
          cateId: task.cateId,
          uId:task.uId,
          state:newState,
          cateTitle:task.cateTitle ,
          cateColor: task.cateColor,
        }

        setTasks((old) => {
          const newData = [...old];
          const index = newData.findIndex((i) => i.taskId === task.taskId);
          newData[index] = newTask;
          return newData;
        });

      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      console.error("task.taskId is undefined or does not exist.");
    }
  };
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
                    state={task.state === "notDone" ? false : true}
                    setEditTask={setEditTask}
                    setShow={setShow}
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
