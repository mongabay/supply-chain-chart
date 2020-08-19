import { connect } from 'react-redux';

import { exportSelectors, traseSelectors, traseActions } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    topNodes: traseSelectors.getTopNodes(state),
    exporting: exportSelectors.selectExporting(state),
    settings: traseSelectors.selectSettings(state),
  }),
  {
    changeTraseConfig: traseActions.changeTraseConfig,
  }
)(Component);