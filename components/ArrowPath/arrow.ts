import {Layer} from '@deck.gl/core';
import {Model, Geometry} from '@luma.gl/core';
import vs from '~/shaders/arrow-vertex.glsl';
import fs from '~/shaders/arrow-fragment.glsl';

const defaultProps = {
  getEnd: {type: 'accessor', value: (x: any) => x.path && x.path.length ? x.path.slice(-1)[0] : [0, 0]},
  getColor: {type: 'accessor', value: [255, 255, 255, 255]},
  getWidth: {type: 'accessor', value: 3},
  getRotation: {type: 'accessor', value: 0},
  widthUnits: 'pixels',
  widthScale: {type: 'number', value: 1, min: 0},
};

class ArrowLayer extends Layer {
  constructor(props: any) {
    super(props);
  }

  initializeState() {
    const {gl} = this.context;

    const attributeManager = this.getAttributeManager();
    attributeManager.addInstanced({
      instancePositions: {
        size: 3,
        type: gl.DOUBLE,
        accessor: 'getEnd'
      },
      instanceColors: {
        size: 3,
        normalized: true,
        accessor: 'getColor',
        defaultValue: [0, 0, 0, 255]
      },
      instanceWidths: {
        size: 1,
        accessor: 'getWidth',
        defaultValue: 3
      },
      instanceRotations: {
        size: 1,
        accessor: 'getRotation',
        defaultValue: 0
      }
    });

    this.setState({model: this._getModel(gl)});
  }

  updateState({props, oldProps, changeFlags}: {props: any, oldProps: any, changeFlags: any}) {
    super.updateState({props, oldProps, changeFlags});

    if (changeFlags.extensionsChanged || changeFlags.viewportChanged) {
      const {gl} = this.context;
      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({model: this._getModel(gl)});
      this.getAttributeManager().invalidateAll();
    }
  }


  _getModel(gl: any) {
    const positions = new Float32Array([-1, -1, 1, -1, 0, 1]);
    const geometry = new Geometry({
      drawMode: gl.TRIANGLE_FAN,
      vertexCount: 3,
      attributes: {
        positions: {size: 2, value: positions}
      }
    });

    return new Model(gl, {...this.getShaders(), id: this.props.id, vs, fs, geometry, isInstanced: true});
  }

  draw({uniforms}: {uniforms: any}) {
    const {viewport} = this.context;
    const {widthUnits, widthScale} = this.props;

    const widthMultiplier = widthUnits === 'pixels' ? viewport.metersPerPixel : 1;

    this.state.model
      .setUniforms({
        ...uniforms,
        widthScale: widthScale * widthMultiplier
      })
      .draw();
  }
}

ArrowLayer.layerName = 'ArrowLayer';
ArrowLayer.defaultProps = defaultProps;

export default ArrowLayer
