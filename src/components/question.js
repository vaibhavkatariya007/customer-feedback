import React, { useEffect } from 'react';
import { Form, Input, Button, Radio, Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

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

const Question = ({ currentStep, renderdata = {}, onSubmit, data = {} }) => {
  const [form] = Form.useForm();
  const { qna } = data;

  const { _id, question, isRequired, typeOfQuestion } = renderdata;

  useEffect(() => {
    form.setFieldsValue({
      answer: qna[currentStep] && qna[currentStep].answer,
    });
  }, [currentStep]);

  const onFormSubmit = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  const renderFeild = (type) => {
    switch (type) {
      case 'text':
        return <Input />;
        break;
      case 'longText':
        return <TextArea rows={4} />;
        break;
      case 'boolean':
        return (
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        );
        break;
      case 'rating':
        return (
          <Rate
            character={({ index }) => {
              return customIcons[index + 1];
            }}
          />
        );
        break;
      default:
        return <Input />;
        break;
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="question-form"
      onFinish={onFormSubmit}
      initialValues={{
        question_id: _id,
        question,
        answer: '',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="question_id"
        label={question}
        style={{ display: 'none' }}
      >
        <Input />
      </Form.Item>

      <Form.Item name="question" label={question} style={{ display: 'none' }}>
        <Input />
      </Form.Item>

      <Form.Item
        name="answer"
        label={question}
        rules={[
          {
            required: isRequired,
            message: 'Feild cannot be empty.',
          },
        ]}
      >
        {renderFeild(typeOfQuestion)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
          NEXT
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Question;
