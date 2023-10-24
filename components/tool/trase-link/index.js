import { connect } from 'react-redux';

import { traseSelectors } from 'modules/tool';
import Component from './component';

export default connect(state => ({
  country: traseSelectors.selectCountry(state),
  commodity: traseSelectors.selectCommodity(state),
  unit: traseSelectors.selectUnit(state),
  year: traseSelectors.selectYear(state),
}))(Component);
