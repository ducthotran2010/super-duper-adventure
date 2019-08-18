import { GET_INFO } from '../../pages/index';

const Mutation = {
  login: (_, { name, email }, { cache }) => {
    cache.writeQuery({
      query: GET_INFO,
      data: { me: { name, email, __typename: 'User' } },
    });
  },

  logout: (_, __, { cache }) =>
    cache.writeQuery({ query: GET_INFO, data: { me: null } }),
};

export { Mutation as default };
