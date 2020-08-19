import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from 'utils/functions';

import './style.scss';

const Ranking = ({ flows }) => {
  const topFlows = useMemo(
    () =>
      flows.slice(0, 5).map(flow => ({
        id: flow.id,
        country: flow.name.toLowerCase(),
        value: formatNumber({ num: flow.attribute.value, unit: flow.attribute.unit }),
      })),
    [flows]
  );

  return (
    <div className="c-tool-ranking">
      <ul>
        {topFlows.map(flow => (
          <li key={flow.id}>
            <span>{flow.country}</span>
            <span>{flow.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

Ranking.propTypes = {
  flows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ranking;
