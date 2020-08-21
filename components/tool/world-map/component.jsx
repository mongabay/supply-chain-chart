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
import bbox from '@turf/bbox';
import lineString from 'turf-linestring';
import cx from 'classnames';

import Tooltip, { followCursor } from 'components/tooltip';
import Ranking from 'components/tool/ranking';
import Attributions from '../attributions';

import WORLD_GEOGRAPHIES from './WORLD.topo.json';
import './style.scss';

class WorldMap extends React.PureComponent {
  state = {
    tooltipContent: null,
  };

  onMouseMove = ({ properties }) => {
    const { mapData } = this.props;

    const { iso2 } = properties;
    const flow = mapData.find(flow => flow.iso === iso2);

    if (!iso2 || !flow) {
      this.setState({ tooltipContent: null });
      return;
    }

    // We avoid useless re-renders
    if (this.state.tooltipContent?.country === flow.country) {
      return;
    }

    this.setState({
      tooltipContent: {
        country: flow.country,
        value: flow.value,
      },
    });
  };

  onMouseLeave = () => {
    this.setState({ tooltipContent: null });
  };

  renderGeographies = (geographies, projection) => {
    const { countryIso, destinationCountriesIso } = this.props;

    return geographies.map(geography => {
      const iso = geography.properties.iso2;
      let fillColor = '#dedede';
      if (iso === countryIso) {
        fillColor = '#f1ba30';
      } else if (destinationCountriesIso.indexOf(iso) !== -1) {
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
    const { mapData } = this.props;

    const buildCurves = (start, end) => {
      const [x0, y0] = start;
      const [x1, y1] = end;

      const [minX, , maxX] = bbox(lineString(end));
      const medianX = (maxX + minX) / 2;
      const originLeftOfBbox = start[0] < medianX;
      const pointOfControl = {
        x: originLeftOfBbox ? minX - 10 : maxX + 10,
      };

      const curveStyle = end[0] < pointOfControl.x ? 'forceDown' : 'forceUp';

      const curve = {
        forceUp: `${x1} ${y0}`,
        forceDown: `${x0} ${y1}`,
      }[curveStyle];

      return `M ${start.join(' ')} Q ${curve} ${end.join(' ')}`;
    };

    return mapData.map(flow => {
      const style = {
        fill: 'none',
        stroke: 'rgba(0, 0, 0, 0.7)',
        strokeLinecap: 'round',
        strokeWidth: flow.strokeWidth,
      };

      return (
        <Line
          key={flow.iso}
          className="world-map-arc"
          line={{
            coordinates: {
              start: flow.sourceCoordinates,
              end: flow.destinationCoordinates,
            },
            properties: {
              iso2: flow.iso,
            },
          }}
          style={{
            default: style,
            hover: style,
            pressed: style,
          }}
          buildPath={buildCurves}
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
        />
      );
    });
  };

  render() {
    const {
      exporting,
      width,
      height,
      commodityName,
      countryName,
      regionName,
      exporterName,
      year,
    } = this.props;
    const { tooltipContent } = this.state;

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
              {!!commodityName && !!countryName && !!year && (
                <>
                  <span>{commodityName} flow from&nbsp;</span>
                  <span className="shrink">{regionName ? `${regionName}` : ''}</span>
                  <span>
                    {regionName ? ', ' : ''}
                    {countryName}
                  </span>
                  <span>&nbsp;in {year}</span>
                  {!!exporterName && <span>&nbsp;by</span>}
                  {!!exporterName && <span className="shrink">&nbsp;{exporterName}</span>}
                </>
              )}
            </div>
            <Tooltip
              visible={!!tooltipContent}
              content={
                <div className="c-world-map-tooltip">
                  <p>
                    <strong>{tooltipContent?.country}</strong>
                  </p>
                  <p>{tooltipContent?.value}</p>
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
                <Ranking />
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
  commodityName: PropTypes.string,
  countryName: PropTypes.string,
  year: PropTypes.string,
  regionName: PropTypes.string,
  exporterName: PropTypes.string,
  mapData: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      iso: PropTypes.string,
      sourceCoordinates: PropTypes.arrayOf(PropTypes.number),
      destinationCoordinates: PropTypes.arrayOf(PropTypes.number),
      strokeWidth: PropTypes.number,
      value: PropTypes.string,
    })
  ),
  countryIso: PropTypes.string,
  destinationCountriesIso: PropTypes.arrayOf(PropTypes.string).isRequired,
};

WorldMap.defaultProps = {
  year: null,
  commodityName: null,
  countryName: null,
  regionName: null,
  exporterName: null,
  countryIso: null,
};

export default WorldMap;
