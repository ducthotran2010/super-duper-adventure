import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { isNil } from 'lodash';
import React from 'react';
import Login from '../components/login';

export const GET_INFO = gql`
  query {
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
  const [handleLogout, { loading, error }] = useMutation(LOGOUT, {});

  if (!(!isNil(data) && !isNil(data.me))) {
    return <Login />;
  }

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
      <button autoFocus onClick={() => handleLogout()}>
        Logout
      </button>
    </>
  );
};
export default HomePage;
