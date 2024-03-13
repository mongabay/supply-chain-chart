import axios from 'axios';

export const TRASE_API = 'https://europe-west1-trase-mongabay-shim.cloudfunctions.net/trase-api-prod';

export const fetchTraseContexts = () =>
  axios.get(`${TRASE_API}-contexts`).then(({ data }) => data?.data ?? []);

export const fetchTraseColumns = contextId =>
  axios.get(`${TRASE_API}-columns/?context_id=${contextId}`).then(({ data }) => data?.data ?? []);

export const fetchTraseRegions = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}-nodes/?context_id=${contextId}&node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);

export const fetchTraseExporters = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}-nodes/?context_id=${contextId}&node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);

export const fetchTraseFlows = (
  countryId,
  commodityId,
  unitId,
  countryColumnId,
  year,
  regionId,
  exporterId,
  regionColumnId,
  exporterColumnId
) =>
  axios
    .get(
      `${TRASE_API}-top-nodes/?country_id=${countryId}&commodity_id=${commodityId}&cont_attribute_id=${unitId}&node_type_id=${countryColumnId}&start_year=${year}&sources_ids=${regionId}&exporters_ids=${exporterId}&source_node_type_id=${regionColumnId}&exporter_node_type_id=${exporterColumnId}&top_n=10`
    )
    .then(({ data }) => data?.data.slice(0, 10) ?? []);

export const fetchTraseDestinationCountries = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}-nodes/?context_id=${contextId}&node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);
