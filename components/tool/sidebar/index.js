import { connect } from 'react-redux';

import { mapSelectors, mapActions, exportSelectors, traseSelectors } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    activeLayers: mapSelectors.selectActiveDataLayers(state),
    exporting: exportSelectors.selectExporting(state),
    settings: traseSelectors.selectSettings(state),
  }),
  {
    addLayer: mapActions.addLayer,
    removeLayer: mapActions.removeLayer,
  }
)(Component);
