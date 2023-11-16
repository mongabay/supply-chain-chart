import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'components/forms';
import Tooltip, { sticky } from 'components/tooltip';
import ExportTooltip from 'components/export-tooltip';
import LoadingSpinner from 'components/loading-spinner';
import DownloadSuccessModal from '../download-success-modal';

import './style.scss';

const Sidebar = ({
  loading,
  countryOptions,
  country,
  commodityOptions,
  commodity,
  unitOptions,
  unit,
  yearOptions,
  year,
  regionsLoading,
  regionOptions,
  region,
  exportersLoading,
  exporterOptions,
  exporter,
  updateCountry,
  updateCommodity,
  updateUnit,
  updateYear,
  updateRegion,
  updateExporter,
  exporting,
}) => {
  const [previousExporting, setPreviousExporting] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  useEffect(() => {
    if (previousExporting !== exporting) {
      if (!exporting) {
        setDownloadModalOpen(true);
      }

      setPreviousExporting(exporting);
    }
  }, [exporting, previousExporting, setDownloadModalOpen, setPreviousExporting]);

  return (
    <aside className="c-tool-sidebar">
      <DownloadSuccessModal open={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
      <div className="content">
        <h1>Supply Chain Data Tool</h1>
        <p>
          Create images of maps with flows representing the exchange of a variety of commodities
          across the world.
        </p>
        <h2>Data Layers</h2>
        <div className="scrollable-container pt-2">
          <div className="form-group">
            <label htmlFor="setting-country">Source country</label>
            <div className="input-group">
              <Select
                id="setting-country"
                options={countryOptions}
                value={country ?? ''}
                onChange={({ value }) => updateCountry(value)}
                disabled={countryOptions.length === 0}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="setting-commodity">Commodity</label>
            <div className="input-group">
              <Select
                id="setting-commodity"
                options={commodityOptions}
                value={commodity ?? ''}
                onChange={({ value }) => updateCommodity(value)}
                disabled={commodityOptions.length === 0}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="setting-unit">Change unit</label>
            <div className="input-group">
              <Select
                id="setting-unit"
                options={unitOptions}
                value={unit ?? ''}
                onChange={({ value }) => updateUnit(value)}
                disabled={unitOptions.length === 0}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="setting-year">Year</label>
            <div className="input-group">
              <Select
                id="setting-year"
                options={yearOptions}
                value={year ?? ''}
                onChange={({ value }) => updateYear(value)}
                disabled={yearOptions.length === 0}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="setting-region">
              Region (optional) {regionsLoading && <LoadingSpinner inline mini />}
            </label>
            <div className="input-group">
              <Select
                id="setting-region"
                aria-describedby="setting-region-note"
                options={regionOptions}
                value={region}
                onChange={({ value }) => updateRegion(value)}
                disabled={regionOptions.length === 0}
              />
            </div>
            <div id="setting-region-note" className="note">
              This {"setting's"} options are not filtered by change unit nor year.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="setting-exporter">
              Exporter (optional) {exportersLoading && <LoadingSpinner inline mini />}
            </label>
            <div className="input-group">
              <Select
                id="setting-exporter"
                aria-describedby="setting-exporter-note"
                options={exporterOptions}
                value={exporter}
                onChange={({ value }) => updateExporter(value)}
                disabled={exporterOptions.length === 0}
              />
            </div>
            <div id="setting-exporter-note" className="note">
              This {"setting's"} options are not filtered by change unit, year nor region.
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center mt-4">
        <Tooltip sticky="popper" plugins={[sticky]} content={<ExportTooltip />}>
          <button type="button" className="btn btn-primary py-2" disabled={loading}>
            Export
          </button>
        </Tooltip>
        {loading && (
          <div className="loading-text ml-3">
            <LoadingSpinner inline mini /> Loading...
          </div>
        )}
      </div>
    </aside>
  );
};

const OptionsPropType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

Sidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  countryOptions: PropTypes.arrayOf(OptionsPropType).isRequired,
  country: PropTypes.string,
  commodityOptions: PropTypes.arrayOf(OptionsPropType).isRequired,
  commodity: PropTypes.string,
  unitOptions: PropTypes.arrayOf(OptionsPropType).isRequired,
  unit: PropTypes.string,
  yearOptions: PropTypes.arrayOf(OptionsPropType).isRequired,
  year: PropTypes.string,
  regionsLoading: PropTypes.bool.isRequired,
  regionOptions: PropTypes.arrayOf(OptionsPropType).isRequired,
  region: PropTypes.string.isRequired,
  exportersLoading: PropTypes.bool.isRequired,
  exporterOptions: PropTypes.arrayOf(OptionsPropType).isRequired,
  exporter: PropTypes.string.isRequired,
  updateCountry: PropTypes.func.isRequired,
  updateCommodity: PropTypes.func.isRequired,
  updateUnit: PropTypes.func.isRequired,
  updateYear: PropTypes.func.isRequired,
  updateRegion: PropTypes.func.isRequired,
  updateExporter: PropTypes.func.isRequired,
  exporting: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
  country: null,
  commodity: null,
  unit: null,
  year: null,
};

export default Sidebar;
