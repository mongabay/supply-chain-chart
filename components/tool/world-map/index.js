import { connect } from 'react-redux';

import { exportSelectors, traseSelectors } from 'modules/tool';
import Component from './component';

export default connect(state => ({
  width: exportSelectors.selectWidth(state),
  height: exportSelectors.selectHeight(state),
  exporting: exportSelectors.selectExporting(state),
  commodityName: traseSelectors.selectCommodityName(state),
  countryName: traseSelectors.selectSourceCountryName(state),
  year: traseSelectors.selectYear(state),
  regionName: traseSelectors.selectRegionName(state),
  exporterName: traseSelectors.selectExporterName(state),
  mapData: traseSelectors.selectMapData(state),
  countryIso: traseSelectors.selectCountryIso(state),
  destinationCountriesIso: traseSelectors.selectDestinationCountriesIso(state),
}))(Component);
