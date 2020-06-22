import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DATA_LAYERS } from 'components/map';
import { Select } from 'components/forms';
import { Accordion, AccordionItem, AccordionTitle, AccordionPanel } from 'components/accordion';
import Tooltip, { sticky } from 'components/tooltip';
import ExportTooltip from 'components/export-tooltip';
import traseOptions from 'modules/tool/world-map/trase-options';
import DownloadSuccessModal from '../download-success-modal';

import './style.scss';

const Sidebar = ({ activeLayers, exporting, addLayer, removeLayer }) => {
  const [expandedAccordion, setExpandedAccordion] = useState('data-layers');
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
              {Object.entries(traseOptions)
                .map(([key, val]) => (
                  <div
                    key={key}
                    className="mt-4"
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <label>{key}</label>
                    <Select
                      id={`data-layers-${key}`}
                      options={val}
                      defaultValue={val[0]?.value}
                      onChange={() => {}}
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
  activeLayers: PropTypes.arrayOf(PropTypes.string).isRequired,
  exporting: PropTypes.bool.isRequired,
  addLayer: PropTypes.func.isRequired,
  removeLayer: PropTypes.func.isRequired,
};

export default Sidebar;
