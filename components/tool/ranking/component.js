import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Ranking = ({ flows }) => (
  <div className="c-tool-ranking">
    <ul>
      {flows.map(flow => (
        <li key={flow.id}>
          <span>{flow.country}</span>
          <span>{flow.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

Ranking.propTypes = {
  flows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ranking;
