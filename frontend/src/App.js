import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Alert } from "antd";
import axios from "axios";
import "./app.css";

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 20,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const App = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const onFinish = (values) => {
    console.log(values);

    axios
      .post(" http://127.0.0.1:5000/submit-form", values)
      .then((response) => {
        console.log("Server response:", response.data);
        setAlertMessage("Form data saved successfully");
        setAlertType("success");
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setAlertMessage("Failed to save form data");
        setAlertType("error");
        setShowAlert(true);
      });
  };

  return (
    <div className="form-container">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "employee name"]}
          label="Employee Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "employee email"]}
          label="Employee Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "phone number"]}
          label="Phone number"
          rules={[
            {
              //required: true,
              pattern: new RegExp(/^[0-9]{10}$/),
              message: "Phone number must be 10 digits",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "designation"]} label="Designation">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "address"]} label="Address">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {showAlert && (
            <Alert
              message={alertMessage}
              type={alertType}
              showIcon
              closable
              onClose={() => setShowAlert(false)}
              style={{ marginBottom: 20, marginTop: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
