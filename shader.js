
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
precision mediump float;
varying vec2 vColor;
uniform sampler2D uColorNum;
uniform float flash;
uniform float greyCode;

void main(void) {
  if (greyCode == 1.0) {
    vec4 greyColor = texture2D(uColorNum, vColor);
    float grey = dot(greyColor.rgb, vec3(0.3, 0.6, 0.1));
    // gl_FragColor = texture2D(uColorNum, vColor); // 0.3, 0.6, 0.1 1 2 3, 1 3 4
    // gl_FragColor[3] = flash;
    gl_FragColor = vec4(vec3(grey), flash);
  }
  else {
    gl_FragColor = texture2D(uColorNum, vColor);
    gl_FragColor[3] = flash;
  }
}

`;
