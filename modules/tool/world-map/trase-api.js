import axios from 'axios';

export const TRASE_API = 'https://supplychains.trase.earth/api/v3';

export const fetchTraseContexts = () =>
  axios.get(`${TRASE_API}/contexts`).then(({ data }) => data?.data ?? []);

export const fetchTraseColumns = contextId =>
  axios.get(`${TRASE_API}/contexts/${contextId}/columns`).then(({ data }) => data?.data ?? []);

export const fetchTraseRegions = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}/contexts/${contextId}/nodes?node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);

export const fetchTraseExporters = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}/contexts/${contextId}/nodes?node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);

export const fetchTraseFlows = (
  countryId,
  commodityId,
  unitId,
  countryColumnId,
  year,
  regionId,
  exporterId
) =>
  axios
    .get(
      `${TRASE_API}/dashboards/charts/single_year_no_ncont_node_type_view?country_id=${countryId}&commodity_id=${commodityId}&cont_attribute_id=${unitId}&node_type_id=${countryColumnId}&start_year=${year}&sources_ids=${regionId}&exporters_ids=${exporterId}&top_n=10`
    )
    .then(({ data }) => data?.data.slice(0, 10) ?? []);

export const fetchTraseDestinationCountries = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}/contexts/${contextId}/nodes?node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);
