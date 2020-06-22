import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Router } from 'lib/routes';
import Sidebar from './sidebar';
import WorldMap from './world-map';

import './style.scss';

const Tool = ({ serializedState, restoreState }) => {
  // When the component is mounted, we restore its state from the URL
  useEffect(() => {
    restoreState();
  }, [restoreState]);

  // Each time the serialized state of the component changes, we update the URL
  useEffect(() => {
    Router.replaceRoute('home', { state: serializedState });
  }, [serializedState]);

  return (
    <div className="c-tool">
      <Sidebar />
      <WorldMap />
    </div>
  );
};

Tool.propTypes = {
  serializedState: PropTypes.string.isRequired,
  restoreState: PropTypes.func.isRequired,
};

export default Tool;
