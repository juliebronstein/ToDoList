import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import FormikError from './FormikError';

const Input = ({type, name, label, className, placeholder,additionalField,...others}) => {
    return (
        <div id={name} className={` ${className}`}>
            <div className="mb-3">
                {label?<span className="bold ms-1"> {label} </span>:null}
                <FastField type={type} name={name} className="form-control input" placeholder={placeholder} {...others} />
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
    );
}

export default Input;