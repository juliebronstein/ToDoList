import React from "react";
import FormikControl from "../form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TaskCart from "../TaskCart";

  const initialValues = {
    email: "",
  };
  const onSubmit = async (values, actions) => {
    
  };

const Task = ({tasks}) => {

  // const {categories,setTasks}=useContext(TaskContext)


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
            <Form className="col-12 d-flex flex-column">
              
              {tasks.map((task)=>(
             <div key={task.taskId+"=="} className="d-flex flex-row mb-2">
              <FormikControl className="col-2" control="checkbox" name="email" formik={formik} value={true} />
                <TaskCart className="col-10" key={"index_"+task.taskId+"id"} task={task}/>
             </div>
              )) }
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Task;
