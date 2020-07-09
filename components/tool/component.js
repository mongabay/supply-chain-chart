import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { Router } from 'lib/routes';
import Sidebar from './sidebar';
import WorldMap from './world-map';
import getData from 'modules/tool/world-map/helpers';

import './style.scss';

const Tool = ({
  serializedState,
  restoreState,
  commodity,
  year,
  adm0,
  unit,
  changeTraseConfig,
}) => {
  // When the component is mounted, we restore its state from the URL
  useEffect(() => {
    restoreState();
  }, [restoreState]);

  // Each time the serialized state of the component changes, we update the URL
  useEffect(() => {
    Router.replaceRoute('home', { state: serializedState });
  }, [serializedState]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevYear = usePrevious(year);
  const prevCommodity = usePrevious(commodity);
  const prevAdm0 = usePrevious(adm0);
  const prevUnit = usePrevious(unit);

  useEffect(() => {
    if (
      !isEqual(prevYear, year) ||
      !isEqual(prevCommodity, commodity) ||
      !isEqual(prevAdm0, adm0) ||
      !isEqual(prevUnit, unit)
    ) {
      getData({
        startYear: year || '2003',
        endYear: year || '2017',
        commodity: commodity || 'SOY',
        adm0: adm0 || 'BRA',
        indicator: unit || '31', // Trade volume
      }).then(response => {
        // TODO: add loader
        // @ts-ignore
        const { data, options } = response;
        changeTraseConfig({
          ...data,
          commodities: options.commodities,
          Commodity: options.commodities.some(el => el.value === commodity)
            ? commodity
            : options.commodities[0].value,
          years: options.years,
          Year: options.years.includes(year) ? year : options.years[0].value,
          units: options.units,
        });
      });
    }
    // 1. load on start (deps: changeTraseConfig)
    // 2. then load on change (year, commodity, country)
    // prevYear with usePrevious exists because of object comparison in JS
  }, [year, prevYear, commodity, prevCommodity, adm0, prevAdm0, unit, prevUnit, changeTraseConfig]);

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
  unit: PropTypes.string,
};

export default Tool;
