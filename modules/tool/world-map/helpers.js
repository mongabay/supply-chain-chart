import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import range from 'lodash/range';

import { traseOptions } from './trase-options';
import { fetchTraseContexts, fetchTraseNodeStats } from './trase-api';

const getData = ({ startYear, endYear, commodity, adm0, indicator }) =>
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

      return fetchTraseNodeStats(
        selectedContext.countryId, // context Id
        selectedContext.worldMap.countryColumnId, // column Id
        selectedContext.commodityId, // commodity Id
        startYear,
        endYear,
        indicator
      ).then(data => {
        const newStartYear =
          !startYear || Number(startYear) < minYear ? minYear : Number(startYear);
        let newEndYear = !endYear || Number(endYear) > maxYear ? maxYear : Number(endYear);
        newEndYear = newEndYear < newStartYear ? newStartYear : newEndYear;
        const selectedIndicator = selectedContext.resizeBy.find(unit => unit.name === indicator);
        const selectedYears = selectedIndicator
          ? selectedIndicator.years
          : range(minYear, maxYear + 1, 1);

        return {
          data: {
            context: selectedContext,
            topNodes: uniqBy(data.data.data[0].top_nodes, 'name'),
          },
          options: {
            years: selectedYears.map(y => ({
              label: y.toString(),
              value: y.toString(),
            })),
            commodities: commoditiesForLocation,
            units: selectedContext.resizeBy.map(u => ({
              label: u.label,
              value: u.attributeId.toString(),
            })),
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
