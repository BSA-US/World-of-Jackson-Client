import {TripsLayer} from '@deck.gl/geo-layers';
import {CompositeLayer} from '@deck.gl/core';
import ArrowLayer from './arrow';

interface Waypoint {
  coordinates: number[][];
  timestamp: number;
}

interface PathData {
  waypoints: Waypoint[];
  name: string;
  color: [number, number, number];
}

export const toAngle = ([x0, y0]: [number, number], [x1, y1]: [number, number]) => {
  if (x1 - x0 > 0) {
    return 90
  } else if (x1 - x0 < 0) {
    return 270
  } else if (y1 - y0 < 0) {
    return 180
  } else {
    return 0
  }
}

const defaultProps = {
  ...TripsLayer.defaultProps,
  ...ArrowLayer.defaultProps,
  loopEvery: 3000,
  disableAnimation: false,
  trailLength: 3000,
  opacity: 1
};

const FRAME_INTERVAL = 1000 / 60;

const truncateWaypoints = (time: number) => (pathData: PathData) => {
  // TODO: implement
  if (!time || !pathData) {
    return []
  }
  return []
}

class ArrowPathLayer extends CompositeLayer {
  constructor(props: any) {
    super(props)
  }

  shouldUpdateState({changeFlags}: {changeFlags: any}) {
    if (changeFlags.propsChanged || changeFlags.dataChanged || changeFlags.stateChanged) {
      return true;
    }

    return false;
  }

  initializeState() {
    super.initializeState()
    const {loopEvery} = this.props;
    const {disableAnimation, data}: {disableAnimation: boolean, data: PathData[]} = this.props;
    if (!disableAnimation) {
      this.setState({currentTime: 0, arrowTruncatedPaths: data.map(x => ({...x, waypoints: []}))});
      this.animate()
    } else {
      this.setState({currentTime: loopEvery, arrowTruncatedPaths: data.map(truncateWaypoints(loopEvery))})
    }
  }

  animate() {
    const {loopEvery} = this.props;
    const {currentTime} = this.state;
    if (currentTime > loopEvery) {
      this.setState({
        currentTime: 0
      })
    } else {
      this.setState({
        currentTime: currentTime + FRAME_INTERVAL
      })
    }

    requestAnimationFrame(() => this.animate())
  }

  renderLayers() {
    const {data, getEnd, getRotation, getPath, getColor, getWidth, getTimestamps, trailLength, opacity} = this.props
    const {currentTime, arrowTruncatedPaths} = this.state;

    return [
      new ArrowLayer(this.getSubLayerProps({
        id: "arrow",
        data: arrowTruncatedPaths,
        getEnd,
        getColor,
        getWidth,
        getRotation
      })),
      new TripsLayer(this.getSubLayerProps({
        id: "path",
        data,
        getPath,
        getColor,
        getWidth,
        getTimestamps,
        currentTime,
        trailLength,
        opacity,
        updateTriggers: {
          getPath: [data],
        }
      }))
    ];
  }
}

ArrowPathLayer.layerName = 'ArrowPathLayer';
ArrowPathLayer.defaultProps = defaultProps;

export default ArrowPathLayer
