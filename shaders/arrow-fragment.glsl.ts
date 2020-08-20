export default `\
#define SHADER_NAME arrow-layer-fragment-shader

precision highp float;

varying vec4 vColor;

void main(void) {
gl_FragColor = vColor;
}
`;
