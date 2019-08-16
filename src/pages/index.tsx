import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { isNil } from 'lodash';
import React from 'react';
import Login from './login';

export const GET_INFO = gql`
  query getInfo {
    me @client {
      name
      email
    }
  }
`;

const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;

const HomePage = () => {
  const { data } = useQuery(GET_INFO);
  if (!(!isNil(data) && !isNil(data.me))) {
    return <Login />;
  }

  const [handleLogout, { loading, error }] = useMutation(LOGOUT, {});

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An error occurred</p>;
  }

  const { email, name } = data.me;
  return (
    <>
      <h1>
        Hi {name}({email})!
      </h1>
      <button
        onClick={() => {
          console.log('invoked');
          handleLogout();
        }}
      >
        Logout
      </button>
    </>
  );
};
export default HomePage;
