import { connect } from 'react-redux';

import { traseSelectors } from 'modules/tool';
import Component from './component';

export default connect(state => ({
  unit: traseSelectors.selectUnit(state),
  unitOptions: traseSelectors.selectUnitOptions(state),
  rankingData: traseSelectors.selectRankingData(state),
}))(Component);
