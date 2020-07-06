import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import { Select } from 'components/forms';
import { Accordion, AccordionItem, AccordionTitle, AccordionPanel } from 'components/accordion';
import Tooltip, { sticky } from 'components/tooltip';
import ExportTooltip from 'components/export-tooltip';
import { traseOptions } from 'modules/tool/world-map/trase-options';
import DownloadSuccessModal from '../download-success-modal';

import './style.scss';

const Sidebar = ({ flows, exporting, settings, changeTraseConfig }) => {
  const [expandedAccordion, setExpandedAccordion] = useState('data-layers');
  const [previousExporting, setPreviousExporting] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const mapSettingsOptions = {
    'Source country': traseOptions.countries,
    'Destination country': [
      { label: 'All', value: '' },
      ...flows.map(f => ({ label: f.name, value: f.geoId })),
    ],
    Commodity: settings.commodities || traseOptions.commodities,
    'Change unit': settings.units || traseOptions.units,
    Year: settings.years || traseOptions.years,
    Municipality: settings.municipalities || traseOptions.municipalities,
    Exporter: settings.exporters || traseOptions.exporters,
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
      <Accordion
        multi={false}
        expanded={[expandedAccordion]}
        onChange={uuids => setExpandedAccordion(uuids[0] ?? null)}
      >
        <AccordionItem
          id="data-layers"
          className={expandedAccordion === 'data-layers' ? '-expanded' : null}
        >
          <AccordionTitle aria-level={1}>
            <span className="h1">Supply Chain</span>
          </AccordionTitle>
          <AccordionPanel>
            <div className="pt-2">
              {Object.entries(mapSettingsOptions).map(([key, options]) => (
                <div
                  key={key}
                  className="mt-4"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <label>{key}</label>
                  <Select
                    id={`data-layers-${key}`}
                    options={
                      options.length
                        ? options.map(opt => ({ ...opt, label: capitalize(opt.label) }))
                        : [{ label: 'All', value: '' }]
                    }
                    disabled={!options.length || options.length < 2}
                    defaultValue={settings[key] ? settings[key] : null}
                    onChange={opt => {
                      changeTraseConfig({ [key]: opt.value });
                    }}
                  />
                </div>
              ))}
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
  flows: PropTypes.arrayOf(PropTypes.object),
  exporting: PropTypes.bool.isRequired,
  settings: PropTypes.object,
  changeTraseConfig: PropTypes.func,
};

export default Sidebar;
