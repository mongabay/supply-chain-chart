import { connect } from 'react-redux';
// TODO: move selectors to modules
// import { traseActions } from 'modules/tool/world-map';
import { traseSelectors, traseActions } from 'modules/tool';
// import { getWorldMapProps } from './selectors';
import Component from './component';

export default connect(
  state => ({
    flows: traseSelectors.getWorldMapFlows(state),
    originGeoId: traseSelectors.getOriginGeoId(state),
    selectedContext: traseSelectors.getSelectedContext(state),
    originCoordinates: traseSelectors.getOriginCoordinates(state),
  }),
  {
    changeTraseConfig: traseActions.changeTraseConfig,
  }
)(Component);
