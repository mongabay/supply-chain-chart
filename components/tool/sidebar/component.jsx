import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import sortBy from 'lodash/sortBy';

import { slugify } from 'utils/functions';
import { Select } from 'components/forms';
import Tooltip, { sticky } from 'components/tooltip';
import ExportTooltip from 'components/export-tooltip';
import { traseOptions } from 'modules/tool/world-map/trase-options';
import DownloadSuccessModal from '../download-success-modal';

import './style.scss';

const Sidebar = ({ topNodes, exporting, settings, changeTraseConfig }) => {
  const [previousExporting, setPreviousExporting] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const mapSettingsOptions = {
    'Source country': traseOptions.countries,
    Commodity: settings.commodities || traseOptions.commodities,
    'Change unit': settings.units || traseOptions.units,
    Year: settings.years || traseOptions.years,
    Municipality: settings.municipalities || traseOptions.municipalities,
    Exporter: settings.exporters || traseOptions.exporters,
    'Destination country': [
      { label: 'All', value: '' },
      ...sortBy(
        topNodes.map(f => ({ label: f.name, value: f.geo_id })),
        'label'
      ),
    ],
  };

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
        <h1>Supply Chain</h1>
        <div className="scrollable-container pt-2">
          {Object.entries(mapSettingsOptions).map(([key, options]) => (
            <div key={key} className="form-group">
              <label htmlFor={`setting-${slugify(key)}`}>{key}</label>
              <div className="input-group">
                <Select
                  id={`setting-${slugify(key)}`}
                  value={settings[key] ?? ''}
                  options={
                    options.length
                      ? options.map(opt => ({
                          ...opt,
                          label: capitalize(opt.label).replace('Co2', 'CO₂'),
                        }))
                      : [{ label: 'All', value: '' }]
                  }
                  disabled={!options.length || options.length < 2}
                  onChange={opt => {
                    changeTraseConfig({ [key]: opt.value });
                  }}
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Tooltip sticky="popper" plugins={[sticky]} content={<ExportTooltip />}>
          <button type="button" className="btn btn-primary mr-2">
            Export
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  topNodes: PropTypes.arrayOf(PropTypes.object),
  exporting: PropTypes.bool.isRequired,
  settings: PropTypes.object,
  changeTraseConfig: PropTypes.func,
};

export default Sidebar;
