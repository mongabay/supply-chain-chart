import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from 'lib/store';

import 'css/index.scss';

const SupplyChainApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

SupplyChainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any,
};

SupplyChainApp.defaultProps = {
  pageProps: {},
};

export default SupplyChainApp;
