import { connect } from 'react-redux';

import { selectRankingFlows } from 'modules/tool/world-map';
import Component from './component';

export default connect(state => ({
  flows: selectRankingFlows(state),
}))(Component);
