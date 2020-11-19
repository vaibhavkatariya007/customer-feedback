import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { API } from 'config';

import { DELETE_RECORD } from '@/lib/services';
import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';

const endPoint = API.QUESTION;

const QuestionsList = ({ questions }) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    if (!session) {
      router.push('/admin');
    }
  }, []);
  useEffect(() => {
    setQuestionsData(questions);
  }, [questions]);

  const columns = [
    {
      title: 'S.No.',
      dataIndex: 'question',
      key: 'question-serial-no',
      render: (text, record, idx) => <span>{idx + 1}</span>,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Type Of Question',
      dataIndex: 'typeOfQuestion',
      key: 'typeOfQuestion',
    },
    {
      title: 'Is Required',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (text, record, idx) => <span>{text ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => editQuestion(record)} />
          <DeleteOutlined onClick={() => deleteQuestion(record)} />
        </Space>
      ),
    },
  ];

  const editQuestion = ({ _id }) => {
    router.push(`/admin/editquestion/${_id}`);
  };

  const deleteQuestion = ({ _id }) => {
    DELETE_RECORD(`${endPoint}/${_id}`).then((result) => {
      if (result.success) {
        fetch(endPoint)
          .then((res) => res.json())
          .then((result) => {
            setQuestionsData(result);
          });
      }
      // router.reload();
    });
  };

  return (
    (session && (
      <Wrapper pageTitle="Admin - Feedback Questions">
        <SubWrapper
          heading="Questions"
          bottonTxt="Create Question"
          linkTo="/admin/createquestion"
        >
          <Table columns={columns} dataSource={questionsData} />
        </SubWrapper>
      </Wrapper>
    )) || <div>You are Signing Out...</div>
  );
};

QuestionsList.getInitialProps = async (ctx) => {
  const res = await fetch(endPoint);
  const json = await res.json();
  return { questions: json };
};

export default QuestionsList;
