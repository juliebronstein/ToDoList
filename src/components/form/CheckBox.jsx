import { ErrorMessage, FastField, Field } from "formik";
import React, { useState } from "react";
import FormikError from "./FormikError";

const Checkbox = (props) => {
  const { name, className, formik, value,handler,task } = props;
  const [checked, setCheck] = useState(value);
  const handleOptionChange = (e) => {
    const newValue = !checked;
    setCheck(newValue);
    formik.setValues({
      ...formik.values,
      [name]: newValue,
    });
   handler(task)
  };
  return (
<div className="col-2 d-flex checkcontainer">
      <div id={name} name={name} >
        <FastField>
          {({ form }) => {
            return (
              <div onClick={handleOptionChange} className="checkfield ">
                <div className={`ring ${checked ? "blue" : "waith"}`}></div>{" "}
              </div>
            );
          }}
        </FastField>
    </div></div>
  );
};

export default Checkbox;
