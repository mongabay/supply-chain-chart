import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import range from 'lodash/range';
import axios from 'axios';

import { traseOptions } from 'modules/tool/world-map/trase-options';

const TRASE_API = 'https://trase.earth/api/v3';

const fetchTraseContexts = () => axios.get(`${TRASE_API}/contexts`);
const fetchTraseLocationData = (contextId, columnId, startYear, endYear) =>
  axios.get(
    `${TRASE_API}/contexts/${contextId}/top_nodes?column_id=${columnId}${
      startYear ? `&start_year=${startYear}` : ''
    }${endYear ? `&end_year=${endYear}` : ''}`
  );

const getData = ({ startYear, endYear, commodity, adm0 }) =>
  fetchTraseContexts().then(response => {
    if (response.data && response.data.data) {
      const contextsForLocation = response.data.data.filter(
        d => d.countryName === traseOptions.countries.find(opt => opt.value === adm0).label
      );

      // @ts-ignore
      const allCommodities = uniqBy(contextsForLocation, 'commodityName').map(c => c.commodityName);
      const commoditiesForLocation = sortBy(
        allCommodities.map(c => ({
          label: c,
          value: c,
        })),
        'label'
      );

      const activeCommodity = commodity && allCommodities.find(c => c === commodity);
      const selectedCommodity = activeCommodity || allCommodities[0];

      const selectedContext = contextsForLocation.find(c => c.commodityName === selectedCommodity);

      const minYear = selectedContext.years[0];
      const maxYear = selectedContext.years[selectedContext.years.length - 1];

      return fetchTraseLocationData(
        selectedContext.id,
        selectedContext.worldMap.countryColumnId,
        startYear,
        endYear
      ).then(data => {
        const newStartYear =
          !startYear || Number(startYear) < minYear ? minYear : Number(startYear);
        let newEndYear = !endYear || Number(endYear) > maxYear ? maxYear : Number(endYear);
        newEndYear = newEndYear < newStartYear ? newStartYear : newEndYear;

        return {
          data: {
            context: selectedContext,
            topNodes: data.data.data,
          },
          options: {
            years: range(minYear, maxYear + 1, 1).map(y => ({
              label: y.toString(),
              value: y.toString(),
            })),
            commodity: commoditiesForLocation,
          },
          settings: {
            startYear: newStartYear,
            endYear: newEndYear,
            commodity: selectedCommodity,
          },
        };
      });
    }
    return {};
  });

export default getData;
