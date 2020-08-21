import { connect } from 'react-redux';

import { selectRankingData } from 'modules/tool/world-map';
import Component from './component';

export default connect(state => ({
  rankingData: selectRankingData(state),
}))(Component);
