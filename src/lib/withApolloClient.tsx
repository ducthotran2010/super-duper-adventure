import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import initApollo from './init-apollo';

export default App => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)';
    static async getInitialProps(ctx) {
      const { AppTree } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo();
      if (typeof window === 'undefined') {
        try {
          await getDataFromTree(
            <AppTree {...appProps} apolloClient={apollo} />
          );
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    apolloClient: any;
    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />;
    }
  };
};
