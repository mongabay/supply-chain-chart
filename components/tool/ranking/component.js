import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Ranking = ({ rankingData }) => (
  <div className="c-tool-ranking">
    <ul>
      {rankingData.map(flow => (
        <li key={flow.country}>
          <span>{flow.country}</span>
          <span>{flow.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

Ranking.propTypes = {
  rankingData: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default Ranking;
