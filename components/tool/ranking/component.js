import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Ranking = ({ rankingData }) => (
  <div className="c-tool-ranking">
    <ul>
      {rankingData.map((flow, index) => (
        <li key={flow.country}>
          {/* The position number of the flow can be rendered using a pseudo-element and a CSS
          counter because html2canvas has issues to render them in Safari:
          https://github.com/niklasvh/html2canvas/issues/2256 */}
          <span>{index + 1}</span>
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
