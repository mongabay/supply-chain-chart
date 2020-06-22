import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import range from 'lodash/range';

import { fetchTraseContexts, fetchTraseLocationData } from 'utils/trase';
import traseOptions from 'modules/tool/world-map/trase-options';

export const getData = ({ startYear, endYear, commodity, adm0 }) =>
  fetchTraseContexts().then(response => {
    if (response.data && response.data.data) {
      const contextsForLocation = response.data.data.filter(
        d => d.countryName === traseOptions.find(opt => opt.value === adm0).label
      );

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
        const newStartYear = !startYear || startYear < minYear ? minYear : startYear;
        const newEndYear = !endYear || endYear > maxYear ? maxYear : endYear;

        return {
          data: {
            context: selectedContext,
            topNodes: data.data.data,
          },
          options: {
            years: range(newStartYear, newEndYear + 1, 1).map(y => ({
              label: y,
              value: y,
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
