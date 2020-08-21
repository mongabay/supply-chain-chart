import { connect } from 'react-redux';

import { exportSelectors, traseSelectors, traseActions } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    loading: traseSelectors.selectLoading(state),
    countryOptions: traseSelectors.selectSourceCountryOptions(state),
    country: traseSelectors.selectCountry(state),
    commodityOptions: traseSelectors.selectCommodityOptions(state),
    commodity: traseSelectors.selectCommodity(state),
    unitOptions: traseSelectors.selectUnitOptions(state),
    unit: traseSelectors.selectUnit(state),
    yearOptions: traseSelectors.selectYearOptions(state),
    year: traseSelectors.selectYear(state),
    regionsLoading: traseSelectors.selectRegionsLoading(state),
    regionOptions: traseSelectors.selectRegionOptions(state),
    region: traseSelectors.selectRegion(state),
    exportersLoading: traseSelectors.selectExportersLoading(state),
    exporterOptions: traseSelectors.selectExporterOptions(state),
    exporter: traseSelectors.selectExporter(state),
    exporting: exportSelectors.selectExporting(state),
  }),
  {
    updateCountry: traseActions.updateCountry,
    updateCommodity: traseActions.updateCommodity,
    updateUnit: traseActions.updateUnit,
    updateYear: traseActions.updateYear,
    updateRegion: traseActions.updateRegion,
    updateExporter: traseActions.updateExporter,
  }
)(Component);
