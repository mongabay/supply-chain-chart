import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const HeadComponent = ({ title, description }) => (
  <Head>
    <title key="title">{title ? `${title} | Trade Flow Map` : 'Trade Flow Map'}</title>
    <meta
      key="description"
      name="description"
      content={
        description
          ? description
          : 'Create images of maps with flows representing the exchange of a variety of commodities across the world.'
      }
    />
  </Head>
);

HeadComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

HeadComponent.defaultProps = {
  title: null,
  description: null,
};

export default HeadComponent;
