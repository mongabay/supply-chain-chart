import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Router } from 'lib/routes';
import Sidebar from './sidebar';
import WorldMap from './world-map';
import getData from './world-map/helpers';

import './style.scss';

const Tool = ({ serializedState, restoreState, commodity, year, adm0, changeTraseConfig }) => {
  // When the component is mounted, we restore its state from the URL
  useEffect(() => {
    restoreState();
  }, [restoreState]);

  // Each time the serialized state of the component changes, we update the URL
  useEffect(() => {
    Router.replaceRoute('home', { state: serializedState });
  }, [serializedState]);

  useEffect(() => {
    // console.log(year, commodity, adm0);
    getData({
      startYear: year || '2003',
      endYear: year || '2017',
      commodity: commodity || 'SOY',
      adm0: adm0 || 'BRA',
    }).then(response => {
      // @ts-ignore
      const { data, options } = response;
      changeTraseConfig({
        ...data,
        commodities: options.commodity,
        Commodity: options.commodity.some(el => el.value === commodity)
          ? commodity
          : options.commodity[0].value,
        years:
          data &&
          data.context &&
          data.context.years &&
          data.context.years.map(n => ({ label: n.toString(), value: n.toString() })),
      });
    });
  }, [year, commodity, adm0, changeTraseConfig]);

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
  commodity: PropTypes.string,
  year: PropTypes.string,
  adm0: PropTypes.string,
};

export default Tool;
