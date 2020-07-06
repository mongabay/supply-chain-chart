import { connect } from 'react-redux';
import { traseSelectors } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    flows: traseSelectors.getWorldMapFlows(state),
    originGeoId: traseSelectors.getOriginGeoId(state),
    destination: traseSelectors.getDestinationCountry(state),
    selectedContext: traseSelectors.getSelectedContext(state),
    originCoordinates: traseSelectors.getOriginCoordinates(state),
  }),
  {}
)(Component);
