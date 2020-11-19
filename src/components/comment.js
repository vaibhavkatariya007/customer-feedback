import React from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

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

const Comment = ({ onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="comment-form"
      onFinish={onSubmit}
      scrollToFirstError
    >
      <Form.Item name="comment" label="Any Comments">
        <TextArea allowClear rows={5} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Comment;
