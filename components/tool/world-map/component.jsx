// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposableMap,
  Geographies,
  Geography,
  // https://github.com/zcreativelabs/react-simple-maps/pull/71
  Lines,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';
import Tooltip, { followCursor } from 'components/tooltip';
import cx from 'classnames';

import { formatNumber } from 'utils/functions';
import Attributions from '../attributions';
import { getOriginCountryName, getDestinationCountryName, getTitleCase } from './helpers';

import WORLD_GEOGRAPHIES from './WORLD.topo.json';
import './style.scss';

class WorldMap extends React.PureComponent {
  static buildCurves(start, end, arc) {
    const x0 = start[0];
    const x1 = end[0];
    const y0 = start[1];
    const y1 = end[1];
    const curve = {
      forceUp: `${x1} ${y0}`,
      forceDown: `${x0} ${y1}`,
    }[arc.curveStyle];

    return `M ${start.join(' ')} Q ${curve} ${end.join(' ')}`;
  }

  static isDestinationCountry(iso, countries) {
    return countries.map(f => f.geoId).includes(iso);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.flows !== prevState.flows) {
      // avoids rendering intermediate states
      return {
        flows: nextProps.flows,
        originGeoId: nextProps.originGeoId,
        destination: nextProps.destination,
        originCoordinates: nextProps.originCoordinates,
      };
    }
    return prevState;
  }

  state = {
    flows: [],
    originGeoId: null,
    destination: null,
    tooltipConfig: null,
    originCoordinates: [],
  };

  onMouseMove = ({ properties }, e) => {
    const { flows } = this.state;
    const { unit } = this.props;
    const geoId = properties?.iso2;

    if (!properties || !WorldMap.isDestinationCountry(geoId, flows)) {
      return;
    }

    const x = e.clientX + 10;
    const y = e.clientY + window.scrollY + 10;

    const flow = flows.find(flow => flow.geoId === geoId);

    const title = 'Trade Volume';
    const text = properties.name;

    const volume = flow?.attribute.value;
    const height = flow?.attribute.height;

    const value = formatNumber({ num: volume, unit });
    const percentage = formatNumber({ num: height * 100, unit: '%' });

    const tooltipConfig = {
      x,
      y,
      text,
      items: [{ title, value, unit, percentage }],
    };

    this.setState(() => ({ tooltipConfig }));
  };

  onMouseLeave = () => {
    this.setState(() => ({ tooltipConfig: null }));
  };

  renderGeographies = (geographies, projection) => {
    const { flows, originGeoId, destination } = this.state;

    return geographies.map(geography => {
      if (geography.properties.iso2 === 'AQ') {
        return;
      }

      let fillColor = '#dedede';
      if (originGeoId === geography.properties.iso2) {
        fillColor = '#f1ba30';
      } else if (
        WorldMap.isDestinationCountry(
          geography.properties.iso2,
          flows.filter(f => !destination || f.geoId === destination)
        )
      ) {
        fillColor = '#03755e';
      }

      return (
        <Geography
          key={geography.properties.cartodb_id}
          className="world-map-geography"
          fill={fillColor}
          stroke="#ffffff"
          strokeWidth="0.2px"
          geography={geography}
          projection={projection}
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
        />
      );
    });
  };

  renderLines = () => {
    const { originCoordinates, flows, destination } = this.state;

    return flows
      .filter(f => !destination || f.geoId === destination)
      .map(flow => {
        const style = {
          fill: 'none',
          stroke: 'rgba(0, 0, 0, 0.7)',
          strokeLinecap: 'round',
          strokeWidth: flow.strokeWidth,
        };

        return (
          <Line
            key={flow.geoId}
            className="world-map-arc"
            {...flow}
            line={{
              coordinates: {
                start: originCoordinates,
                end: flow.coordinates,
              },
              curveStyle: flow.curveStyle,
            }}
            style={{
              default: style,
              hover: style,
              pressed: style,
            }}
            buildPath={WorldMap.buildCurves}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
          />
        );
      });
  };

  render() {
    const { tooltipConfig, flows } = this.state;
    const { exporting, width, height, origin, destination, year, commodity, topNodes } = this.props;
    const { text, items } = tooltipConfig || {};

    return (
      <div className={cx('c-world-map', `${exporting ? 'exporting' : ''}`)}>
        {exporting && <div className="exporting-message">Exporting...</div>}
        <div
          className="container-width js-visualization"
          // We need both width and min-width:
          // - width so that maps smaller than the parent are correctly sized
          // - min-width so that maps bigger than the parent overflow correctly
          style={exporting ? { width: `${width}px`, minWidth: `${width}px` } : undefined}
        >
          <div
            className="container-ratio"
            style={exporting ? { height: `${height}px` } : undefined}
          >
            <div className="title">
              {getTitleCase(commodity)} flow from {getTitleCase(getOriginCountryName(origin))}{' '}
              {getDestinationCountryName(destination, topNodes)
                ? `to ${getTitleCase(getDestinationCountryName(destination, topNodes))}`
                : ''}{' '}
              in {year}
            </div>
            <Tooltip
              visible={!!tooltipConfig}
              content={
                <div className="c-world-map-tooltip">
                  <p>
                    <strong>{text && text.toLowerCase()}</strong>
                  </p>
                  <p>{items && items[0].value}</p>
                  <p>{items && items[0].percentage}</p>
                </div>
              }
              duration={0}
              followCursor
              plugins={[followCursor]}
              interactive={false}
              trigger="mouseenter focus"
            >
              <div
                className="map-container"
                style={
                  exporting
                    ? {
                        width,
                        height: height - 26, // 26px is the height of the attributions
                      }
                    : undefined
                }
              >
                <ComposableMap
                  projection="robinson"
                  style={{ width: '100%', height: '100%' }}
                  projectionConfig={{ scale: 145 }}
                >
                  <ZoomableGroup disablePanning center={[15, 12]}>
                    <Geographies geography={WORLD_GEOGRAPHIES} disableOptimization>
                      {this.renderGeographies}
                    </Geographies>
                    <Lines>{this.renderLines()}</Lines>
                  </ZoomableGroup>
                </ComposableMap>
              </div>
            </Tooltip>
            <Attributions exporting={exporting} />
          </div>
        </div>
      </div>
    );
  }
}

WorldMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  exporting: PropTypes.bool.isRequired,
  className: PropTypes.string,
  flows: PropTypes.any,
  originGeoId: PropTypes.any,
  destination: PropTypes.any,
  origin: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  commodity: PropTypes.string.isRequired,
  topNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  originCoordinates: PropTypes.any,
  changeTraseConfig: PropTypes.func,
  unit: PropTypes.string,
};

WorldMap.defaultProps = {
  unit: 't',
};

export default WorldMap;
