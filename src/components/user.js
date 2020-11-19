import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

const User = ({ onSubmit, data = {} }) => {
  const [form] = Form.useForm();
  const { userName, userEmail, userMobile } = data;

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="user-form"
      onFinish={onSubmit}
      initialValues={{
        prefix: '91',
        userName,
        userEmail,
        userMobile,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="userName"
        label="Name"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="userEmail"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="userMobile"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
          NEXT
        </Button>
      </Form.Item>
    </Form>
  );
};

export default User;
