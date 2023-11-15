import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

import './style.scss';

// The units are sent only abbreviated, so we need to map them to their full names
const units = {
  ha: 'hectares',
  t: 'metric tons',
  't CO2': 'tonnes of CO₂',
};

const Ranking = ({ unit, unitOptions, rankingData }) => {
  const title = useMemo(() => {
    if (!unit) {
      return null;
    }

    return unitOptions.find(option => option.value === unit)?.label;
  }, [unit, unitOptions]);

  const MAX_VOLUME = useMemo(
    () =>
      rankingData.reduce(
        (acc, flow) => {
          return acc.value < flow.value
            ? { value: flow.value, formattedValue: flow.formattedValue }
            : acc;
        },
        {
          value: 0,
          formattedValue: '',
        }
      ),
    [rankingData]
  );

  const unitSymbol = useMemo(() => {
    const value = units[rankingData?.[0]?.unit];
    return value || rankingData?.[0]?.unit;
  }, [rankingData]);

  const getVolume = value => {
    const volume = value;
    return MAX_VOLUME.value === 0 ? 0 : (volume * 100) / MAX_VOLUME.value;
  };

  return (
    <div className="c-tool-ranking">
      {title && <span className="title">{title}</span>}
      <ul>
        {rankingData.map(flow => {
          const volume = getVolume(flow.value);
          return (
            <li key={flow.country}>
              <div className="c-tool-ranking__title">
                <span className="flex-grow-3">{flow.country}</span>
                <span className="text-right flex-grow-1">{flow.formattedValue}</span>
              </div>
              <div className="c-tool-ranking__volume progress bg-white shadow-none rounded-0">
                <div
                  className="progress-bar shadow-none bg-primary"
                  style={{ width: `${volume}%` }}
                  aria-valuenow={volume}
                  aria-valuemin={0}
                  aria-valuemax={MAX_VOLUME.value}
                ></div>
                <div className="c-tool-ranking__volume__line"></div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="c-tool-ranking__legend">
        <span className="min">0 {unitSymbol}</span>
        <span className="max text-right">
          {format('.3s')(Number(MAX_VOLUME.value))} {unitSymbol}
        </span>
      </div>
    </div>
  );
};

Ranking.propTypes = {
  unit: PropTypes.string,
  unitOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  rankingData: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      value: PropTypes.number,
      formattedValue: PropTypes.string,
      unit: PropTypes.string,
    })
  ).isRequired,
};

Ranking.defaultProps = {
  unit: null,
};

export default Ranking;
