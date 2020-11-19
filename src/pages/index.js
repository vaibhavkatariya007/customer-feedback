import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

import { POST_DATA } from '@/lib/services';

import { API } from 'config';

import Wrapper from '@/components/wrapper';
import UserForm from '@/components/user';
import QuestionForm from '@/components/question';
import CommentForm from '@/components/comment';

const Home = ({ questions }) => {
  const [postData, setPostData] = useState({ qna: [] });
  const [totalSteps, setTotalSteps] = useState(2);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const onUserSubmit = (values) => {
    setPostData({
      ...postData,
      ...values,
    });
    nextStep();
  };

  const onQuestionSubmit = (values) => {
    let qna;
    if (postData && postData.qna) {
      qna = postData.qna;
    }
    qna[currentStep] = values;

    postData &&
      setPostData({
        ...postData,
        qna,
      });
    nextStep();
  };

  const onCommentSubmit = (value) => {
    const bodyData = Object.assign({}, postData, value);
    POST_DATA(bodyData, API.FEEDBACK)
      .then((result) => {
        if (result.success) {
          Modal.success({
            content: 'Thanks For Sharing Your Feedback',
            onOk: () => {
              setCurrentStep(0);
              setPostData({ qna: [] });
            },
          });
        }
      })
      .catch((err) => console.log('ERROR::>>', err));
  };

  useEffect(() => {
    setTotalSteps(totalSteps + questions.length);
  }, [questions]);

  return (
    <Wrapper customBack={currentStep > 0 ? prevStep : null}>
      {currentStep === 0 && (
        <UserForm onSubmit={onUserSubmit} data={postData} />
      )}
      {currentStep === totalSteps - 1 && (
        <CommentForm onSubmit={onCommentSubmit} data={postData} />
      )}
      {questions &&
        questions.length &&
        currentStep > 0 &&
        currentStep <= totalSteps - 2 && (
          <QuestionForm
            currentStep={currentStep}
            renderdata={questions[currentStep - 1]}
            onSubmit={onQuestionSubmit}
            data={postData}
          />
        )}
    </Wrapper>
  );
};

Home.getInitialProps = async (ctx) => {
  const res = await fetch(API.QUESTION);
  const json = await res.json();
  return { questions: json };
};

export default Home;
