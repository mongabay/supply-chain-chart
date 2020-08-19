import axios from 'axios';

const TRASE_API = 'https://trase.earth/api/v3';

export const fetchTraseContexts = () => axios.get(`${TRASE_API}/contexts`);

// eslint-disable-next-line no-unused-vars
export const fetchTraseLocationData = (contextId, columnId, startYear, endYear) =>
  // Each target node will have (example values)
  // geo_id: "BR"
  // height: 0.2681804825734442
  // id: 57
  // name: "BRAZIL"
  // value: 13288328.3572326
  axios.get(
    `${TRASE_API}/contexts/${contextId}/top_nodes?column_id=${columnId}${
      startYear ? `&start_year=${startYear}` : ''
    }${endYear ? `&end_year=${endYear}` : ''}`
  );

// eslint-disable-next-line no-unused-vars
export const fetchTraseNodeStats = (contextId, columnId, startYear, endYear, attributeId) =>
  // Each target node will have (example values)
  // "id":57,
  // "name":"BRAZIL",
  // "geo_id":"BR",
  // "attribute":{
  //   "id":31,
  //   "indicator":"Trade volume",
  //   "unit":"t",
  //   "value":13288328.3572326,
  //   "height":0.268180482573444
  // },
  // "other_attributes":[]
  axios.get(
    `${TRASE_API}/nodes_stats?column_id=${columnId}${
      contextId ? `&contexts_ids=${contextId}` : ''
    }${startYear ? `&start_year=${startYear}` : ''}${endYear ? `&end_year=${endYear}` : ''}${
      attributeId ? `&attribute_id=${attributeId}` : ''
    }`
  );

// eslint-disable-next-line no-unused-vars
export const fetchTraseChart = (
  contextId,
  columnId,
  commodityId,
  startYear,
  endYear,
  attributeId
) =>
  // Other params:
  // &exporters_ids=30576
  // &importers_ids=
  // &companies_ids= ??
  // &sources_ids=11113 municipality?
  axios.get(
    `${TRASE_API}/dashboards/charts/single_year_no_ncont_node_type_view?
commodity_id=${commodityId}
&cont_attribute_id=${attributeId}
&country_id=${contextId}
&destinations_ids=
&start_year=${startYear}
&end_year=${endYear}
&node_type_id=${columnId}
&type=horizontal_bar_chart
&x=node_type
&top_n=12`
  );
