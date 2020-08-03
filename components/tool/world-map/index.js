import { connect } from 'react-redux';

import { exportSelectors, traseSelectors } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    width: exportSelectors.selectWidth(state),
    height: exportSelectors.selectHeight(state),
    exporting: exportSelectors.selectExporting(state),
    flows: traseSelectors.getWorldMapFlows(state),
    originGeoId: traseSelectors.getOriginGeoId(state),
    origin: traseSelectors.getOriginCountry(state),
    destination: traseSelectors.getDestinationCountry(state),
    year: traseSelectors.selectYear(state),
    commodity: traseSelectors.selectCommodity(state),
    topNodes: traseSelectors.getTopNodes(state),
    selectedContext: traseSelectors.getSelectedContext(state),
    originCoordinates: traseSelectors.getOriginCoordinates(state),
  }),
  {}
)(Component);
