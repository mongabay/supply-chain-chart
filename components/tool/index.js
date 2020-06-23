import { connect } from 'react-redux';

import { toolSelectors, toolActions, traseActions } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    serializedState: toolSelectors.selectSerializedState(state),
  }),
  {
    restoreState: toolActions.restoreState,
    changeTraseConfig: traseActions.changeTraseConfig,
  }
)(Component);
