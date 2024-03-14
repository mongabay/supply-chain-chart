import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TRASE_API } from 'modules/tool/world-map/trase-api.js';
import './style.scss';

const TraseLink = ({ country, commodity, unit, year }) => {
  const href = useMemo(() => {
    const newTraseSiteURL = 'https://trase.earth';
    // https://trase.earth/explore/supply-chain/brazil/soy?year=2004&indicator=volume
    return `${newTraseSiteURL}/explore/supply-chain/${country}/${commodity}?year=${year}&indicator=${unit}`;
  }, [commodity, country, unit, year]);

  return (
    <div className="c-tool-trase-link">
      <a href={href} target="_blank" rel="noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
        >
          <path
            d="M9.29762 3.83333H3.125C2.56142 3.83333 2.02091 4.05722 1.6224 4.45573C1.22388 4.85425 1 5.39475 1 5.95833V15.875C1 16.4386 1.22388 16.9791 1.6224 17.3776C2.02091 17.7761 2.56142 18 3.125 18H13.0417C13.6053 18 14.1458 17.7761 14.5443 17.3776C14.9428 16.9791 15.1667 16.4386 15.1667 15.875V9.70238M5.25 13.75L18 1M18 1H13.0417M18 1V5.95833"
            stroke="#444242"
            strokeWidth="1.61905"
            strokeLinecap="square"
          />
        </svg>
        <span>Check data on Trase</span>
      </a>
    </div>
  );
};

TraseLink.propTypes = {
  country: PropTypes.string,
  commodity: PropTypes.string,
  unit: PropTypes.string,
  year: PropTypes.number,
  region: PropTypes.string,
};

export default TraseLink;
