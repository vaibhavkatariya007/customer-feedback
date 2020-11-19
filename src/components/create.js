import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';

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

const User = ({ data, onSubmit }) => {
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      question: data && data.question,
      typeOfQuestion: (data && data.typeOfQuestion) || 'text',
    });
    setChecked(data && data.isRequired);
  }, [data]);

  const onChange = (checked) => {
    setChecked(checked);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="create-question-form"
      onFinish={onSubmit}
      scrollToFirstError
    >
      <Form.Item
        name="question"
        label="Question"
        rules={[{ required: true, message: 'Please input your Question!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="typeOfQuestion"
        label="Type of Question"
        rules={[{ required: true, message: 'Please select type of Question' }]}
      >
        <Select>
          <Option value="text">Text</Option>
          <Option value="longText">LongText</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="rating">Rating</Option>
        </Select>
      </Form.Item>
      <Form.Item name="isRequired" label="Is this Question Mandatory">
        <Switch checked={checked} onChange={onChange} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default User;
