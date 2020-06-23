import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Router } from 'lib/routes';
import Sidebar from './sidebar';
import WorldMap from './world-map';
import getData from './world-map/helpers';

import './style.scss';

const Tool = ({ serializedState, restoreState, changeTraseConfig }) => {
  // When the component is mounted, we restore its state from the URL
  useEffect(() => {
    restoreState();
  }, [restoreState]);

  // Each time the serialized state of the component changes, we update the URL
  useEffect(() => {
    Router.replaceRoute('home', { state: serializedState });
  }, [serializedState]);

  useEffect(
    () => {
      getData({ startYear: '2003', endYear: '2017', commodity: 'SOY', adm0: 'BRA' }).then(
        response => {
          // @ts-ignore
          const { data, options } = response;
          changeTraseConfig({ ...data, commodities: options.commodity });
        }
      );
    },
    [
      // startYear, endYear, commodity, adm0
    ]
  );

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
  changeTraseConfig: PropTypes.func,
};

export default Tool;
