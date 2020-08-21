import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Router } from 'lib/routes';
import Sidebar from './sidebar';
import WorldMap from './world-map';
import {
  fetchTraseContexts,
  fetchTraseRegions,
  fetchTraseExporters,
  fetchTraseRanking,
  fetchTraseDestinationCountries,
} from 'modules/tool/world-map/trase-api';

import './style.scss';

const Tool = ({
  serializedState,
  context,
  country,
  commodity,
  unit,
  year,
  region,
  exporter,
  restoreState,
  updateContextsLoading,
  updateContexts,
  updateRegionsLoading,
  updateRegions,
  updateExportersLoading,
  updateExporters,
  updateRankingLoading,
  updateRanking,
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

  // When the context changes, we fetch the new regions
  useEffect(() => {
    if (context) {
      const fetchRegions = async () => {
        updateRegionsLoading(true);
        const regions = await fetchTraseRegions(context.id, context.defaultColumns[0].id);
        updateRegions(regions);
        updateRegionsLoading(false);
      };

      fetchRegions();
    }
  }, [context, updateRegionsLoading, updateRegions]);

  // When the context changes, we fetch the new exporters
  useEffect(() => {
    if (context) {
      const fetchExporters = async () => {
        updateExportersLoading(true);
        const exporters = await fetchTraseExporters(context.id, context.defaultColumns[1].id);
        updateExporters(exporters);
        updateExportersLoading(false);
      };

      fetchExporters();
    }
  }, [context, updateExportersLoading, updateExporters]);

  // Fetch the ranking data when a setting is updated
  useEffect(() => {
    if (country !== null && commodity !== null && unit !== null && year !== null) {
      const fetchRanking = async () => {
        updateRankingLoading(true);
        const ranking = await fetchTraseRanking(country, commodity, unit, year, region, exporter);
        updateRanking(ranking);
        updateRankingLoading(false);
      };

      fetchRanking();
    }
  }, [country, commodity, unit, year, region, exporter, updateRankingLoading, updateRanking]);

  // Fetch the list of destination countries when the countext is updated
  useEffect(() => {
    if (context) {
      const fetchCountries = async () => {
        updateCountriesLoading(true);
        const countries = await fetchTraseDestinationCountries(
          context.id,
          context.defaultColumns[3].id
        );
        updateCountries(countries);
        updateCountriesLoading(false);
      };

      fetchCountries();
    }
  }, [context, updateCountriesLoading, updateCountries]);

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
  country: PropTypes.string,
  commodity: PropTypes.string,
  unit: PropTypes.string,
  year: PropTypes.string,
  region: PropTypes.string.isRequired,
  exporter: PropTypes.string.isRequired,
  restoreState: PropTypes.func.isRequired,
  updateContextsLoading: PropTypes.func.isRequired,
  updateContexts: PropTypes.func.isRequired,
  updateRegionsLoading: PropTypes.func.isRequired,
  updateRegions: PropTypes.func.isRequired,
  updateExportersLoading: PropTypes.func.isRequired,
  updateExporters: PropTypes.func.isRequired,
  updateRankingLoading: PropTypes.func.isRequired,
  updateRanking: PropTypes.func.isRequired,
  updateCountriesLoading: PropTypes.func.isRequired,
  updateCountries: PropTypes.func.isRequired,
};

Tool.defaultProps = {
  context: null,
  country: null,
  commodity: null,
  unit: null,
  year: null,
};

export default Tool;
