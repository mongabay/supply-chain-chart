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
    destination: traseSelectors.getDestinationCountry(state),
    selectedContext: traseSelectors.getSelectedContext(state),
    originCoordinates: traseSelectors.getOriginCoordinates(state),
  }),
  {}
)(Component);
