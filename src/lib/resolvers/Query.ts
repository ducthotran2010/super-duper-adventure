import { GET_INFO } from '../../pages/index';

const Query = {
  me: (_, __, { cache }) => cache.readQuery({ query: GET_INFO }),
};

export { Query as default };
