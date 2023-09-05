import React from "react";
import { Form } from "react-bootstrap";
import "./InputBox.css";
interface InputFieldProps {
  value?: string;
  Handler?: (event: any) => void;
  disabled?: boolean;
}
const InputBox = (props: InputFieldProps) => {
  const { value, Handler, disabled } = props;
  return (
    <div className="d-flex justify-content-center">
      <div className="Input-box">
        <Form>
          <div className="d-flex justify-content-center">
            <Form.Control
              size="lg"
              type="number"
              defaultValue={value}
              className="w-2"
              name="percentage"
              onChange={Handler}
              disabled={disabled}
            />
            <p className="ms-3">%</p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InputBox;
