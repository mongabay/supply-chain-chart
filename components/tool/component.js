import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Router } from 'lib/routes';
import Sidebar from './sidebar';
import WorldMap from './world-map';
import {
  fetchTraseContexts,
  fetchTraseColumns,
  fetchTraseRegions,
  fetchTraseExporters,
  fetchTraseFlows,
  fetchTraseDestinationCountries,
} from 'modules/tool/world-map/trase-api';

import './style.scss';

const Tool = ({
  serializedState,
  context,
  columns,
  country,
  commodity,
  unit,
  year,
  region,
  exporter,
  restoreState,
  updateContextsLoading,
  updateContexts,
  updateColumnsLoading,
  updateColumns,
  updateRegionsLoading,
  updateRegions,
  updateExportersLoading,
  updateExporters,
  updateFlowsLoading,
  updateFlows,
  updateCountriesLoading,
  updateCountries,
}) => {
  // When the component is mounted, we restore its state from the URL
  useEffect(() => {
    restoreState();
  }, [restoreState]);

  // Each time the serialized state of the component changes, we update the URL
  useEffect(() => {
    Router.replaceRoute('home', { state: serializedState });
  }, [serializedState]);

  // Load the contexts on mount
  useEffect(() => {
    const fetchContexts = async () => {
      updateContextsLoading(true);
      const contexts = await fetchTraseContexts();
      updateContexts(contexts);
      updateContextsLoading(false);
    };

    fetchContexts();
  }, [updateContextsLoading, updateContexts]);

  // When the context changes, we fetch the columns
  useEffect(() => {
    if (context) {
      const fetchColumns = async () => {
        updateColumnsLoading(true);
        const columns = await fetchTraseColumns(context.id);
        updateColumns(columns);
        updateColumnsLoading(false);
      };

      fetchColumns();
    }
  }, [context, updateColumnsLoading, updateColumns]);

  // When the context changes, we fetch the new regions
  useEffect(() => {
    if (context && columns.regions !== undefined) {
      const fetchRegions = async () => {
        updateRegionsLoading(true);
        const regions = await fetchTraseRegions(context.id, columns.regions);
        updateRegions(regions);
        updateRegionsLoading(false);
      };

      fetchRegions();
    }
  }, [context, columns, updateRegionsLoading, updateRegions]);

  // When the context changes, we fetch the new exporters
  useEffect(() => {
    if (context && columns.exporters !== undefined) {
      const fetchExporters = async () => {
        updateExportersLoading(true);
        const exporters = await fetchTraseExporters(context.id, columns.exporters);
        updateExporters(exporters);
        updateExportersLoading(false);
      };

      fetchExporters();
    }
  }, [context, columns, updateExportersLoading, updateExporters]);

  // Fetch the flows data when a setting is updated
  useEffect(() => {
    if (
      country !== null &&
      commodity !== null &&
      unit !== null &&
      year !== null &&
      columns.countries !== undefined
    ) {
      const fetchFlows = async () => {
        updateFlowsLoading(true);
        const flows = await fetchTraseFlows(
          country,
          commodity,
          unit,
          columns.countries,
          year,
          region,
          exporter
        );
        updateFlows(flows);
        updateFlowsLoading(false);
      };

      fetchFlows();
    }
  }, [country, commodity, unit, year, columns, region, exporter, updateFlowsLoading, updateFlows]);

  // Fetch the list of destination countries when the countext is updated
  useEffect(() => {
    if (context && columns.countries !== undefined) {
      const fetchCountries = async () => {
        updateCountriesLoading(true);
        const countries = await fetchTraseDestinationCountries(context.id, columns.countries);
        updateCountries(countries);
        updateCountriesLoading(false);
      };

      fetchCountries();
    }
  }, [context, columns, updateCountriesLoading, updateCountries]);

  return (
    <div className="c-tool">
      <Sidebar />
      <WorldMap />
    </div>
  );
};

Tool.propTypes = {
  serializedState: PropTypes.string.isRequired,
  context: PropTypes.object,
  columns: PropTypes.object,
  country: PropTypes.string,
  commodity: PropTypes.string,
  unit: PropTypes.string,
  year: PropTypes.string,
  region: PropTypes.string.isRequired,
  exporter: PropTypes.string.isRequired,
  restoreState: PropTypes.func.isRequired,
  updateContextsLoading: PropTypes.func.isRequired,
  updateContexts: PropTypes.func.isRequired,
  updateColumnsLoading: PropTypes.func.isRequired,
  updateColumns: PropTypes.func.isRequired,
  updateRegionsLoading: PropTypes.func.isRequired,
  updateRegions: PropTypes.func.isRequired,
  updateExportersLoading: PropTypes.func.isRequired,
  updateExporters: PropTypes.func.isRequired,
  updateFlowsLoading: PropTypes.func.isRequired,
  updateFlows: PropTypes.func.isRequired,
  updateCountriesLoading: PropTypes.func.isRequired,
  updateCountries: PropTypes.func.isRequired,
};

Tool.defaultProps = {
  context: null,
  columns: {},
  country: null,
  commodity: null,
  unit: null,
  year: null,
};

export default Tool;
