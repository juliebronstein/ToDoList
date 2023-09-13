import React from "react";
import FormikControl from "../form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TaskCart from "../TaskCart";



const Task = ({tasks}) => {
  const initialValues = {
    email: "",
  };
  const onSubmit = async (values, actions) => {
    
  };

  const validationSchema = Yup.object({
    // email: Yup.string()
    //   .required("Please fill this box")
    //   .email("Please follow the email format, for example: aaa@example.bbb"),
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
            <Form className="col-12 d-flex">
              <FormikControl className="" control="checkbox" name="email" formik={formik} value={true} />
              {tasks.map((task)=>(
                <TaskCart key={"index_"+task.id} task={task}/>
              )) }
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Task;
