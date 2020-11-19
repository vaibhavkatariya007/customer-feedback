import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Modal } from 'antd';

import { API } from 'config';

import { POST_DATA } from '@/lib/services';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import CreateForm from '@/components/create';

const endPoint = API.QUESTION;

const EditQuestion = () => {
  const [session, loading] = useSession();
  const [data, setData] = useState(null);
  const {
    push,
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (!session) {
      push('/admin');
      return;
    }
    fetch(`${endPoint}/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (values) => {
    POST_DATA(values, `${endPoint}/${id}`, 'PUT')
      .then((result) => {
        if (result) {
          Modal.success({
            content: 'Updated Successfully!',
            onOk: () => push('/admin/questions'),
          });
        }
      })
      .catch((err) => console.log('ERROR::>>', err));
  };

  return (
    (session && (
      <Wrapper pageTitle="Admin - Edit Feedback Question">
        <SubWrapper heading="Edit Question">
          <CreateForm data={data} onSubmit={onSubmit} />
        </SubWrapper>
      </Wrapper>
    )) || <div>You are Signing Out...</div>
  );
};

export default EditQuestion;
