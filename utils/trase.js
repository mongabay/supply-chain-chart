import axios from 'axios';

const { TRASE_API } = process.env;

export const fetchTraseContexts = () => axios.get(`${TRASE_API}/contexts`);

export const fetchTraseLocationData = (contextId, columnId, startYear, endYear) =>
  axios.get(
    `${TRASE_API}/contexts/${contextId}/top_nodes?column_id=${columnId}${
      startYear ? `&start_year=${startYear}` : ''
    }${endYear ? `&end_year=${endYear}` : ''}`
  );
