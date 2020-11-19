import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Modal } from 'antd';

import { API } from 'config';

import { POST_DATA } from '@/lib/services';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import CreateForm from '@/components/create';

const endPoint = API.QUESTION;

const CreateQuestion = () => {
  const [session, loading] = useSession();
  const { push, back, pathname } = useRouter();
  useEffect(() => {
    if (!session) {
      push('/admin');
    }
  }, []);

  const onSubmit = (values) => {
    POST_DATA(values, endPoint)
      .then((result) => {
        Modal.success({
          content: 'Created Successfully!',
          onOk: () => push('/admin/questions'),
        });
      })
      .catch((err) => console.log('ERROR::>>', err));
  };

  return (
    (session && (
      <Wrapper pageTitle="Admin - Create Feedback Question">
        <SubWrapper heading="Create Question">
          <CreateForm onSubmit={onSubmit} />
        </SubWrapper>
      </Wrapper>
    )) || <div>You are Signing Out...</div>
  );
};

export default CreateQuestion;
