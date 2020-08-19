import { connect } from 'react-redux';

import { getWorldMapFlows } from 'modules/tool/world-map';
import Component from './component';

export default connect(state => ({
  flows: getWorldMapFlows(state),
}))(Component);
