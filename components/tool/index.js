import { connect } from 'react-redux';

import { toolSelectors, toolActions, traseSelectors, traseActions } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    serializedState: toolSelectors.selectSerializedState(state),
    commodity: traseSelectors.selectCommodity(state),
    adm0: traseSelectors.selectCountry(state),
    year: traseSelectors.selectYear(state),
  }),
  {
    restoreState: toolActions.restoreState,
    changeTraseConfig: traseActions.changeTraseConfig,
  }
)(Component);
