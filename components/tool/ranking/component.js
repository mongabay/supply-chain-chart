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

  return (
    <div className="c-tool-ranking">
      {title && <span className="title">{title}</span>}
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
      value: PropTypes.string,
    })
  ).isRequired,
};

Ranking.defaultProps = {
  unit: null,
};

export default Ranking;
