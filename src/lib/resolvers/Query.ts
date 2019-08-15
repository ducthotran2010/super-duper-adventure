import { GET_INFO } from '../../pages/index';

const Query = {
  me: (
    _,
    __,
    { cache } //cache.readQuery({ query: GET_INFO }),
  ) => ({
    name: '^^',
    email: 'hi',
    __typename: 'User',
  }),

  // logout: (_, __, { cache }) => cache.writeQuery({ query: GET_INFO, data: {} }),
};

export { Query as default };
