import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

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
    const value = rankingData?.[0]?.unit;
    return value;
  }, [rankingData]);

  const getVolume = value => {
    const volume = value;
    console.log((volume * 100) / MAX_VOLUME.value);

    return (volume * 100) / MAX_VOLUME.value;
  };

  return (
    <div className="c-tool-ranking">
      {title && <span className="title">{title}</span>}
      <ul>
        {rankingData.map(flow => {
          const volume = getVolume(flow.value);
          return (
            <li className="" key={flow.country}>
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
        <span className="max text-right">{MAX_VOLUME.formattedValue}</span>
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
