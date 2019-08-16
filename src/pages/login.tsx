import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';

export const LOGIN = gql`
  mutation login($name: String!, $email: String!) {
    login(name: $name, email: $email) @client
  }
`;

export default function Login() {
  const [name, setName] = useState<string>('Administrator');
  const [email, setEmail] = useState<string>('admin@gmail.com');
  const [handleLogin, { loading, error }] = useMutation(LOGIN, {
    variables: {
      name,
      email,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An error occurred</p>;
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('handle login void trigged');
    handleLogin();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
