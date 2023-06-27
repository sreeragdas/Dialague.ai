import React from "react";
import { Form } from "react-bootstrap";

const AppFormLabel = ({ htmlFor, label, required }) => {
  return (
    <Form.Label htmlFor={htmlFor}>
      <span>{label}</span>
      {required && <span className="text-danger ms-1">*</span>}
    </Form.Label>
  );
};

export default AppFormLabel;
