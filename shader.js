
const vsSource = `
attribute vec4 aVertexPosition;
attribute vec2 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec2 vColor;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = aVertexColor;
}
`;

// Fragment shader program

const fsSource = `
varying lowp vec2 vColor;
uniform sampler2D uColorNum;

void main(void) {
  gl_FragColor = texture2D(uColorNum, vColor);
}
`;
