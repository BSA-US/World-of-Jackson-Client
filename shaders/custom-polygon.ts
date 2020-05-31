// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

export default `\

#ifdef IS_SIDE_VERTEX
    #define SHADER_NAME solid-polygon-layer-vertex-shader-side
    attribute vec3 instancePositions;
    attribute vec3 nextPositions;
    attribute vec3 instancePositions64Low;
    attribute vec3 nextPositions64Low;
    attribute float instanceElevations;
    attribute vec4 instanceFillColors;
    attribute vec4 instanceLineColors;
    attribute vec3 instancePickingColors;
#else
    #define SHADER_NAME solid-polygon-layer-vertex-shader
    attribute vec3 positions;
    attribute vec3 positions64Low;
    attribute float elevations;
    attribute vec4 fillColors;
    attribute vec4 lineColors;
    attribute vec3 pickingColors;    
#endif

attribute vec2 vertexPositions;
attribute float vertexValid;
uniform bool extruded;
uniform bool isWireframe;
uniform float elevationScale;
uniform float opacity;
varying vec4 vColor;
varying float isValid;

// custom inputs created for WoJ
attribute vec2 instanceScaleOrigins;
attribute vec2 scaleOrigins;
attribute float scaleFactor;

struct PolygonProps {
  vec4 fillColors;
  vec4 lineColors;
  vec3 positions;
  vec3 nextPositions;
  vec3 pickingColors;
  vec3 positions64Low;
  vec3 nextPositions64Low;
  float elevations;
};
vec3 project_offset_normal(vec3 vector) {
  if (project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
    project_uCoordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
    // normals generated by the polygon tesselator are in lnglat offsets instead of meters
    return normalize(vector * project_uCommonUnitsPerWorldUnit);
  }
  return project_normal(vector);
}
void calculatePosition(PolygonProps props) {
  vec3 pos;
  vec3 pos64Low;
  vec3 normal;
  vec4 colors = isWireframe ? props.lineColors : props.fillColors;
  geometry.worldPosition = props.positions;
  geometry.worldPositionAlt = props.nextPositions;
  geometry.pickingColor = props.pickingColors;
#ifdef IS_SIDE_VERTEX
  pos = mix(props.positions, props.nextPositions, vertexPositions.x);
  pos64Low = mix(props.positions64Low, props.nextPositions64Low, vertexPositions.x);
  isValid = vertexValid;
#else
  pos = props.positions;
  pos64Low = props.positions64Low;
  isValid = 1.0;
#endif
  if (extruded) {
    pos.z += props.elevations * vertexPositions.y * elevationScale;
    
#ifdef IS_SIDE_VERTEX
    normal = vec3(props.positions.y - props.nextPositions.y, props.nextPositions.x - props.positions.x, 0.0);
    normal = project_offset_normal(normal);
#else
    normal = vec3(0.0, 0.0, 1.0);
#endif
    geometry.normal = normal;
  }
  //pos.x *= 1.001;
  //geometry.position.xy *= 2.1;
  //pos64Low *= 2.1;
  //geometry.position = vec4(100.0);
  //pos.xy += 0.001;

  //vec2 central_pos = scaleOrigin;

#ifdef IS_SIDE_VERTEX
    vec2 central_pos = instanceScaleOrigins;
#else
    vec2 central_pos = scaleOrigins;
#endif
  pos.xy = (pos.xy - central_pos) * scaleFactor + central_pos;
  //pos.z *= sin(pos.x * 3000.0) + 1.0;

  gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  if (extruded) {
    vec3 lightColor = lighting_getLightColor(colors.rgb, project_uCameraPosition, geometry.position.xyz, normal);
    vColor = vec4(lightColor, colors.a * opacity);
  } else {
    vColor = vec4(colors.rgb, colors.a * opacity);
  }
  DECKGL_FILTER_COLOR(vColor, geometry);
}

void main(void) {

#ifdef IS_SIDE_VERTEX
    
  PolygonProps props;
  props.positions = instancePositions;
  props.positions64Low = instancePositions64Low;
  props.elevations = instanceElevations;
  props.fillColors = instanceFillColors;
  props.lineColors = instanceLineColors;
  props.pickingColors = instancePickingColors;
  props.nextPositions = nextPositions;
  props.nextPositions64Low = nextPositions64Low;
  calculatePosition(props);
#else
  PolygonProps props;
  props.positions = positions;
  props.positions64Low = positions64Low;
  props.elevations = elevations;
  props.fillColors = fillColors;
  props.lineColors = lineColors;
  props.pickingColors = pickingColors;
  calculatePosition(props);
#endif
}

`;