import React from "react";
import Input from "./Input";
import Checkbox from "./CheckBox";
import Select from "./Select";


const FormikControl = (props) => {
  switch (props.control) {
    // case "file":
    //   return <File {...props} />;
    // case "date":
    //   return <Date {...props} />;
    case "input":
      return <Input {...props} />;
    // case "radio":
    //   return <Radio {...props} />;
    case "select":
      return <Select {...props} />;
    // case "switch":
    //   return <Switch {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    // case "ckeditor":
    //   return <Ckeditor {...props} />;
    // case "textarea":
    //   return <Textarea {...props} />;
    // case "inputenter":
    //   return <InputEnter {...props} />;
    // case "multiSelect":
    //   return <MultiSelect {...props} />;
    // case "filterselect":
    //   return <FilterSelect {...props} />;
    // case "searchableselect":
    //   return <SearchableSelect {...props} />;
    default:
      return null;
  }
};

export default FormikControl;