import axios from 'axios';

const TRASE_API = 'https://trase.earth/api/v3';

export const fetchTraseContexts = () =>
  axios.get(`${TRASE_API}/contexts`).then(({ data }) => data?.data ?? []);

export const fetchTraseRegions = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}/contexts/${contextId}/nodes?node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);

export const fetchTraseExporters = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}/contexts/${contextId}/nodes?node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);

export const fetchTraseRanking = (countryId, commodityId, unitId, year, regionId, exporterId) =>
  axios
    .get(
      `${TRASE_API}/dashboards/charts/single_year_no_ncont_node_type_view?country_id=${countryId}&commodity_id=${commodityId}&cont_attribute_id=${unitId}&node_type_id=33&start_year=${year}&sources_ids=${regionId}&exporters_ids=${exporterId}&top_n=5`
    )
    .then(({ data }) => data?.data.slice(0, 5) ?? []);

export const fetchTraseDestinationCountries = (contextId, columnId) =>
  axios
    .get(`${TRASE_API}/contexts/${contextId}/nodes?node_types_ids=${columnId}`)
    .then(({ data }) => data?.data ?? []);
