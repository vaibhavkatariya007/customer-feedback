import React, { useState } from 'react';
import { useSession } from 'next-auth/client';

import { API } from 'config';

import Wrapper from '@/components/wrapper';
import SubWrapper from '@/components/subwrapper';
import Dashboard from '@/components/dashboard';
import Auth from '@/components/auth';

const endPoint = API.FEEDBACK;

const AdminHome = (props) => {
  const [session, loading] = useSession();
  const { feedbacks } = props;

  const [isAuthorised, setIsAuthorised] = useState(true);
  return (
    <Wrapper pageTitle="Admin">
      {session ? (
        <Dashboard data={feedbacks} />
      ) : (
        <SubWrapper heading="Login">
          <Auth />
        </SubWrapper>
      )}
    </Wrapper>
  );
};

AdminHome.getInitialProps = async (ctx) => {
  const res = await fetch(endPoint);
  const json = await res.json();
  return { feedbacks: json };
};

export default AdminHome;
