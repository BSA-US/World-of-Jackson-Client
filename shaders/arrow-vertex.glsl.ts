export default `\
#define SHADER_NAME arrow-layer-vertex-shader

attribute vec3 positions;
attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute float instanceWidths;
attribute float instanceRotations;
attribute vec4 instanceColors;

uniform float widthScale;

varying vec4 vColor;

vec3 rotate_by_angle(vec3 vertex, float angle) {
  float angle_radian = angle * PI / 180.0;
  float cos_angle = cos(angle_radian);
  float sin_angle = sin(angle_radian);
  mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
  return vec3(rotationMatrix * vertex.xy, vertex.z);
}

void main(void) {
  geometry.worldPosition = positions;
  float widthPixels = project_size_to_pixel(instanceWidths * widthScale);
  vec3 offsetCommon = positions * project_size(widthPixels);
  vec3 positionCommon = project_position(instancePositions, instancePositions64Low);
  vec3 rotatedOffsetCommon = rotate_by_angle(offsetCommon, instanceRotations);
  gl_Position = project_common_position_to_clipspace(vec4(positionCommon + rotatedOffsetCommon, 0.0));
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);

  vColor = instanceColors;
}
`;
