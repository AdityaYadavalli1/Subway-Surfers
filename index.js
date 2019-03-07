var cubeRotation = 0.0;

main();

//
// Start here
//
var c;
var c1;
var c2;
var isJump = 0;
var up = [0.0, 1.0, 0.0];
var target = [0.0, 0.0, 0.0];
var eye = [0.0, 0.0 , 13.0];
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
 // make objects here
  // If we don't have a GL context, give up now
  c = new cube(gl, [0.0, 0.0, 0.0]);
  c1 = new cube(gl, [2.0, 0.0, -13.0]);
  c2 = new cube(gl, [2.0, 0.0, -16.0]);

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }


  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  // const buffers = initBuffers(gl);

  var then = 0;

  // Draw the scene repeatedly
  // this is the infinite loop, the game engine
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    // c.rotation += 0.02;
    tickelements()
    detect_collision_x()
    // detect_collision_y()
    drawScene(gl, programInfo, deltaTime);
    // tick elements and tickinput
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
// make any tick changes here
var gravity = 0;
function tickelements() {

   c.pos[2] -= 0.04;
   if (isJump == 1) {
     if(c.pos[1] > 0) {
       gravity -= 0.001;
       c.pos[1] += gravity;
     }
     else {
       c.pos[1] = 0;
       isJump = 0;
       gravity = 0;
     }
   }
 }

// take input here
var xvelocity = 2;
var yvelocity = 4;
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        c.pos[0] -= xvelocity;
    }
    else if(event.keyCode == 39) {
        c.pos[0] += xvelocity;
    }
    else if(event.keyCode == 38) { //up
      if (isJump == 0) {
        c.pos[1] += yvelocity;
        isJump = 1;
      }
        // isJump = 1;
    }
    else if(event.keyCode == 40) {
        c.pos[1] -= yvelocity;
    }
});

function drawScene(gl, programInfo, buffers, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

    eye[2] = c.pos[2] + 13.0;
    target[2] = c.pos[2];
    var cameraMatrix = mat4.create();
    mat4.lookAt(cameraMatrix, eye, target, up);

    var viewMatrix = cameraMatrix;

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    c.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    c1.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    c2.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);


}
function detect_collision_x() {
  if (Math.abs(c.pos[0] - c1.pos[0]) <= 0.5) {
    if (Math.abs(c.pos[2] - c1.pos[2]) <= 0.5) {
      if (c.pos[1] == c1.pos[1]) { // height same that means it has collided in x direction
          console.log('LOL');
          c.pos[0] -= 1;
      }
      else {
        if (Math.abs(c.pos[1] - c1.pos[1]) <= 2) { // y collision that means it stays on top
            console.log('LOL');
            c.pos[1] = c1.pos[1] + 2;
        }
      }
    }
  }
}
// function detect_collision_y() {
//   if (Math.abs(c.pos[1] - c1.pos[1]) < 0.5) {
//     if (Math.abs(c.pos[2] - c1.pos[2]) < 0.5) {
//       c.pos[1] -= 1;
//     }
//   }
// }
// one more if condition for these collisions and we are done bois
//
// Initialize a shader program, so WebGL knows how to draw our data
//
