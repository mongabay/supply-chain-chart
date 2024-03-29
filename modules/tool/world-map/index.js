import { createSlice, createSelector } from '@reduxjs/toolkit';
import capitalize from 'lodash/capitalize';

import { COUNTRIES_COORDINATES, initialState } from 'modules/tool/world-map/trase-options';
import { formatNumber } from 'utils/functions';

export const SLICE_NAME = 'trase';

export const selectSettings = state => state[SLICE_NAME];
export const selectContextsLoading = state => state[SLICE_NAME].contextsLoading;
export const selectContexts = state => state[SLICE_NAME].contexts;
export const selectColumnsLoading = state => state[SLICE_NAME].columnsLoading;
export const selectColumns = state => state[SLICE_NAME].columns;
export const selectCountry = state => state[SLICE_NAME].country;
export const selectCommodity = state => state[SLICE_NAME].commodity;
export const selectYear = state => state[SLICE_NAME].year;
export const selectUnit = state => state[SLICE_NAME].unit;
export const selectRegionsLoading = state => state[SLICE_NAME].regionsLoading;
export const selectRegions = state => state[SLICE_NAME].regions;
export const selectRegion = state => state[SLICE_NAME].region;
export const selectExportersLoading = state => state[SLICE_NAME].exportersLoading;
export const selectExporters = state => state[SLICE_NAME].exporters;
export const selectExporter = state => state[SLICE_NAME].exporter;
export const selectFlowsLoading = state => state[SLICE_NAME].flowsLoading;
export const selectFlows = state => state[SLICE_NAME].flows;
export const selectCountriesLoading = state => state[SLICE_NAME].countriesLoading;
export const selectCountries = state => state[SLICE_NAME].countries;

export const selectSourceCountryOptions = createSelector([selectContexts], contexts =>
  contexts
    .map(context => ({ label: capitalize(context.countryName), value: `${context.countryId}` }))
    .filter((option, index, options) => options.findIndex(o => o.value === option.value) === index)
    .sort((optionA, optionB) => optionA.label.localeCompare(optionB.label))
);

export const selectSourceCountryName = createSelector(
  [selectSourceCountryOptions, selectCountry],
  (sourceCountryOptions, country) =>
    sourceCountryOptions.find(option => option.value === country)?.label ?? null
);

export const selectCommodityOptions = createSelector(
  [selectContexts, selectCountry],
  (contexts, country) => {
    if (!contexts.length || country === null) {
      return [];
    }

    return contexts
      .filter(context => context.countryId === country)
      .map(context => ({
        label: capitalize(context.commodityName),
        value: `${context.commodityId}`,
      }));
  }
);

export const selectCommodityName = createSelector(
  [selectCommodityOptions, selectCommodity],
  (commodityOptions, commodity) =>
    commodityOptions.find(option => option.value === commodity)?.label ?? null
);

export const selectContext = createSelector(
  [selectContexts, selectCountry, selectCommodity],
  (contexts, country, commodity) => {
    if (country === null || commodity === null) {
      return null;
    }

    return contexts.find(
      context => context.countryId === country && context.commodityId === commodity
    );
  }
);

export const selectUnitOptions = createSelector([selectContext], context => {
  if (!context) {
    return [];
  }

  return context.resizeBy.map(({ label, attributeId }) => ({
    label: capitalize(label).replace('Co2', 'CO₂'),
    value: `${attributeId}`,
  }));
});

export const selectYearOptions = createSelector([selectContext, selectUnit], (context, unit) => {
  if (!context || !unit) {
    return [];
  }

  const years = context.resizeBy.find(u => u.attributeId === unit)?.years;

  return (
    [...(years ?? [])]
      .sort()
      .reverse()
      .map(year => ({
        label: `${year}`,
        value: `${year}`,
      })) ?? []
  );
});

export const selectRegionOptions = createSelector([selectRegions], regions => [
  { label: 'All', value: '' },
  ...regions
    .map(region => ({
      label: capitalize(region.name),
      value: `${region.id}`,
    }))
    .sort((optionA, optionB) => optionA.label.localeCompare(optionB.label)),
]);

export const selectRegionName = createSelector(
  [selectRegionOptions, selectRegion],
  (regionOptions, region) =>
    region === '' ? null : regionOptions.find(option => option.value === region)?.label ?? null
);

export const selectExporterOptions = createSelector([selectExporters], exporters => [
  { label: 'All', value: '' },
  ...exporters
    .map(exporter => ({
      label: capitalize(exporter.name),
      value: `${exporter.id}`,
    }))
    .sort((optionA, optionB) => optionA.label.localeCompare(optionB.label)),
]);

export const selectExporterName = createSelector(
  [selectExporterOptions, selectExporter],
  (exporterRegions, exporter) =>
    exporter === ''
      ? null
      : exporterRegions.find(option => option.value === exporter)?.label ?? null
);

export const selectRankingData = createSelector(
  [selectFlows, selectContext, selectUnit],
  (flows, context, unit) =>
    flows.slice(0, 5).map(({ x0, y }) => ({
      country: capitalize(y),
      value: x0,
      formattedValue: formatNumber({
        num: x0,
        unit: context?.resizeBy.find(u => u.attributeId === unit)?.unit ?? '−',
      }),
      unit: context?.resizeBy.find(u => u.attributeId === unit)?.unit ?? '−',
    }))
);

export const selectCountriesISODict = createSelector([selectCountries], countries =>
  countries
    .map(({ name, geoId }) => ({ name: name.toLowerCase(), iso: geoId }))
    .filter(country => !!country.iso)
    .reduce((res, country) => ({ ...res, [country.name]: country.iso }), {})
);

export const selectFlowScale = createSelector([selectFlows], flows => {
  const valueExtent = [
    Math.min(...flows.map(({ x0 }) => x0)),
    Math.max(...flows.map(({ x0 }) => x0)),
  ];

  return value => ((value - valueExtent[0]) / (valueExtent[1] - valueExtent[0])) * 9 + 1;
});

export const selectCountryIso = createSelector([selectContext], context => {
  if (!context) {
    return null;
  }

  return context.worldMap.geoId;
});

export const selectDestinationCountriesIso = createSelector(
  [selectFlows, selectCountriesISODict],
  (flows, isoDict) => flows.map(({ y }) => isoDict[y.toLowerCase()] ?? null)
);

export const selectMapData = createSelector(
  [
    selectFlows,
    selectCountriesISODict,
    selectFlowScale,
    selectContext,
    selectUnit,
    selectCountryIso,
  ],
  (flows, isoDict, flowScale, context, unit, countryIso) => {
    if (!Object.keys(isoDict).length || !countryIso) {
      return [];
    }

    return flows
      .map(({ x0, y }) => {
        // The dictionary might not have had the time to update yet (we're making a request) or some
        // countries may be returned as “OTHER” by the Trase API so some ISOs may be missing
        // We may also not have the coordinates for some countries (e.g. Channel islands)
        if (!isoDict[y.toLowerCase()] || !COUNTRIES_COORDINATES[isoDict[y.toLowerCase()]]) {
          return null;
        }

        return {
          country: capitalize(y),
          iso: isoDict[y.toLowerCase()],
          sourceCoordinates: COUNTRIES_COORDINATES[countryIso],
          destinationCoordinates: COUNTRIES_COORDINATES[isoDict[y.toLowerCase()]],
          strokeWidth: flowScale(x0),
          value: formatNumber({
            num: x0,
            unit: context?.resizeBy.find(u => u.attributeId === +unit)?.unit ?? '−',
          }),
        };
      })
      .filter(data => data !== null);
  }
);

export const selectLoading = createSelector(
  [
    selectContextsLoading,
    selectColumnsLoading,
    selectFlowsLoading,
    selectCountriesLoading,
    selectRegionsLoading,
    selectExportersLoading,
  ],
  (
    contextsLoading,
    columnsLoading,
    flowsLoading,
    countriesLoading,
    regionsLoading,
    exportersLoading
  ) =>
    contextsLoading ||
    columnsLoading ||
    flowsLoading ||
    countriesLoading ||
    regionsLoading ||
    exportersLoading
);

export const selectSerializedState = createSelector(
  [selectCountry, selectCommodity, selectUnit, selectYear, selectRegion, selectExporter],
  (country, commodity, unit, year, region, exporter) => ({
    country,
    commodity,
    unit,
    year,
    region,
    exporter,
  })
);

export default traseActions =>
  createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {
      updateContextsLoading(state, action) {
        state.contextsLoading = action.payload;
      },
      updateContexts(state, action) {
        state.contexts = action.payload;

        // We set the default options
        let newState = { [SLICE_NAME]: state };
        const countryOptions = selectSourceCountryOptions(newState);
        const country = selectCountry(newState);

        if (countryOptions.length && !countryOptions.find(({ value }) => value === country)) {
          state.country = countryOptions[0].value;
        }

        newState = { [SLICE_NAME]: state };
        const commodityOptions = selectCommodityOptions(newState);
        const commodity = selectCommodity(newState);

        if (commodityOptions.length && !commodityOptions.find(({ value }) => value === commodity)) {
          state.commodity = commodityOptions[0].value;
        }

        newState = { [SLICE_NAME]: state };
        const unitOptions = selectUnitOptions(newState);
        const unit = selectUnit(newState);

        if (unitOptions.length && !unitOptions.find(({ value }) => value === unit)) {
          state.unit = unitOptions[0].value;
        }

        newState = { [SLICE_NAME]: state };
        const yearOptions = selectYearOptions(newState);
        const year = selectYear(newState);

        if (yearOptions.length && !yearOptions.find(({ value }) => value === year)) {
          state.year = yearOptions[0].value;
        }
      },
      updateColumnsLoading(state, action) {
        state.columnsLoading = action.payload;
      },
      updateColumns(state, action) {
        state.columns = {
          // for the regions, the id of the column is sometimes region_production_1, sometimes region_production_2 - depending on number of subnational levels supported
          // so the get the state or province, we must depend on the name rather than id to get the right column
          regions: action.payload.find(({ name }) => name.toUpperCase().indexOf('PROVINCE') >= 0 || name.toUpperCase().indexOf('STATE') >= 0)?.id,
          exporters: action.payload.find(({ id }) => id === 'exporter_group')?.id,
          // The order of these columns is important. We only fallback if we can't find the most
          // relevant one.
          countries: (
            action.payload.find(({ id }) => id === 'country_of_destination') ||
            action.payload.find(({ id }) => id === 'country_of_import') ||
            // As much as possible we'd want countries instead of economic blocs because the
            // implementation of the map expects countries. Unfortunately, there is at least one
            // known case where we don't have country-level information: Colombia / Cocoa.
            // Update: Colombia / Cocoa now has country of destination
            action.payload.find(({ id }) => id === 'economic_bloc')
          )?.id,
        };
      },
      updateCountry(state, action) {
        state.country = action.payload;

        // We also update the default commodity as it depends on the source country
        let newState = { [SLICE_NAME]: state };
        const commodityOptions = selectCommodityOptions(newState);
        const commodity = selectCommodity(newState);

        if (commodityOptions.length && !commodityOptions.find(({ value }) => value === commodity)) {
          state.commodity = commodityOptions[0].value;
        }

        // We also update the default unit as it depends on the context (country + commodity)
        newState = { [SLICE_NAME]: state };
        const unitOptions = selectUnitOptions(newState);
        const unit = selectUnit(newState);

        if (unitOptions.length && !unitOptions.find(({ value }) => value === unit)) {
          state.unit = unitOptions[0].value;
        }

        // We also update the default year as it depends on the context (country + commodity) and
        // the unit
        newState = { [SLICE_NAME]: state };
        const yearOptions = selectYearOptions(newState);
        const year = selectYear(newState);

        if (yearOptions.length && !yearOptions.find(({ value }) => value === year)) {
          state.year = yearOptions[0].value;
        }
      },
      updateCommodity(state, action) {
        state.commodity = action.payload;

        // We also update the default unit as it depends on the context (country + commodity)
        let newState = { [SLICE_NAME]: state };
        const unitOptions = selectUnitOptions(newState);
        const unit = selectUnit(newState);

        if (unitOptions.length && !unitOptions.find(({ value }) => value === unit)) {
          state.unit = unitOptions[0].value;
        }

        // We also update the default year as it depends on the context (country + commodity) and
        // the unit
        newState = { [SLICE_NAME]: state };
        const yearOptions = selectYearOptions(newState);
        const year = selectYear(newState);

        if (yearOptions.length && !yearOptions.find(({ value }) => value === year)) {
          state.year = yearOptions[0].value;
        }
      },
      updateUnit(state, action) {
        state.unit = action.payload;

        // We also update the default year as it depends on the context (country + commodity) and
        // the unit
        const newState = { [SLICE_NAME]: state };
        const yearOptions = selectYearOptions(newState);
        const year = selectYear(newState);

        if (yearOptions.length && !yearOptions.find(({ value }) => value === year)) {
          state.year = yearOptions[0].value;
        }
      },
      updateYear(state, action) {
        state.year = action.payload;
      },
      updateRegionsLoading(state, action) {
        state.regionsLoading = action.payload;
      },
      updateRegions(state, action) {
        state.regions = action.payload;

        const newState = { [SLICE_NAME]: state };
        const regionOptions = selectRegionOptions(newState);
        const region = selectRegion(newState);
        if (regionOptions.length && !regionOptions.find(({ value }) => value === region)) {
          state.region = regionOptions[0].value;
        }
      },
      updateRegion(state, action) {
        state.region = action.payload;
      },
      updateExportersLoading(state, action) {
        state.exportersLoading = action.payload;
      },
      updateExporters(state, action) {
        state.exporters = action.payload;

        const newState = { [SLICE_NAME]: state };
        const exporterOptions = selectExporterOptions(newState);
        const exporter = selectExporter(newState);
        if (exporterOptions.length && !exporterOptions.find(({ value }) => value === exporter)) {
          state.exporter = exporterOptions[0].value;
        }
      },
      updateExporter(state, action) {
        state.exporter = action.payload;
      },
      updateFlowsLoading(state, action) {
        state.flowsLoading = action.payload;
      },
      updateFlows(state, action) {
        state.flows = action.payload;
      },
      updateCountriesLoading(state, action) {
        state.countriesLoading = action.payload;
      },
      updateCountries(state, action) {
        state.countries = action.payload;
      },
    },
    extraReducers: {
      [traseActions.restoreState.fulfilled]: (state, action) => {
        const stateToRestore = action.payload[SLICE_NAME] || {};

        return {
          ...state,
          ...stateToRestore,
        };
      },
    },
  });
