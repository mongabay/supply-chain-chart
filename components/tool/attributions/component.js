import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Attributions = ({ exporting }) => (
  <div className="c-tool-attributions">
    {exporting && (
      <img src={`${process.env.BASE_PATH ?? ''}/images/mongabay-horizontal.jpg`} alt="Mongabay" />
    )}
    {!exporting && <div />}
    <div className="d-flex align-items-center">
      {/* TODO: add the attributions in the following span element */}
      <span>
        Data provided by{' '}
        <a href="https://trase.earth/" target="_blank" rel="noopener noreferrer">
          Trase
        </a>
      </span>
    </div>
  </div>
);

Attributions.propTypes = {
  exporting: PropTypes.bool.isRequired,
};

export default Attributions;
