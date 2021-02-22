import { connect } from 'react-redux';

import { toolSelectors, toolActions, traseSelectors, traseActions } from 'modules/tool';
import Component from './component';

export default connect(
  state => ({
    serializedState: toolSelectors.selectSerializedState(state),
    context: traseSelectors.selectContext(state),
    columns: traseSelectors.selectColumns(state),
    country: traseSelectors.selectCountry(state),
    commodity: traseSelectors.selectCommodity(state),
    unit: traseSelectors.selectUnit(state),
    year: traseSelectors.selectYear(state),
    region: traseSelectors.selectRegion(state),
    exporter: traseSelectors.selectExporter(state),
  }),
  {
    restoreState: toolActions.restoreState,
    updateContextsLoading: traseActions.updateContextsLoading,
    updateContexts: traseActions.updateContexts,
    updateColumnsLoading: traseActions.updateColumnsLoading,
    updateColumns: traseActions.updateColumns,
    updateRegionsLoading: traseActions.updateRegionsLoading,
    updateRegions: traseActions.updateRegions,
    updateExportersLoading: traseActions.updateExportersLoading,
    updateExporters: traseActions.updateExporters,
    updateFlowsLoading: traseActions.updateFlowsLoading,
    updateFlows: traseActions.updateFlows,
    updateCountriesLoading: traseActions.updateCountriesLoading,
    updateCountries: traseActions.updateCountries,
  }
)(Component);
