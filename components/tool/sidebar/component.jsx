import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DATA_LAYERS } from 'components/map';
import { Select } from 'components/forms';
import { Accordion, AccordionItem, AccordionTitle, AccordionPanel } from 'components/accordion';
import Tooltip, { sticky } from 'components/tooltip';
import ExportTooltip from 'components/export-tooltip';
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
              {Object.keys(DATA_LAYERS)
                .sort((a, b) => DATA_LAYERS[a].label.localeCompare(DATA_LAYERS[b].label))
                .map(key => (
                  <div
                    key={key}
                    style={{ display: 'flex', flexDirection: 'column', margin: '20px 0' }}
                  >
                    <label>Some text goes here</label>
                    <Select
                      id={`data-layers-${key}`}
                      options={[{ label: DATA_LAYERS[key].label, value: 'test', disabled: false }]}
                      defaultValue="test"
                      onChange={() => {
                        if (activeLayers.indexOf(key) !== -1) {
                          removeLayer(key);
                        } else {
                          addLayer(key);
                        }
                      }}
                    />
                  </div>
                ))}
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <div className="mt-8">
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
