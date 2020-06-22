import { connect } from 'react-redux';
// TODO: move selectors to modules
import { getWorldMapProps } from './selectors';
import Component from './component';

export default connect(getWorldMapProps)(Component);
