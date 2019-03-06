var cubeRotation = 0.0;

main();

//
// Start here
//
var c;
var c1;

function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
 // make objects here
  // If we don't have a GL context, give up now
  c = new cube(gl, [2, 5.0, -13.0]);
  c1 = new cube(gl, [1.5, 0.0, -13.0]);

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

    drawScene(gl, programInfo, deltaTime);
    // tick elements and tickinput
    tickelements()
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
// make any tick changes here
function tickelements() {
   // c.rotation += 0.02;
   // c.pos[2] -= 0.02;
}

// take input here
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        // alert('Left was pressed');
        c.pos[0] -= 2;
    }
    else if(event.keyCode == 39) {
        // alert('Right was pressed');
        c.pos[0] += 2;
    }
    else if(event.keyCode == 38) {
        // alert('Right was pressed');
        c.pos[1] += 2;
    }
    else if(event.keyCode == 40) {
        // alert('Right was pressed');
        c.pos[1] -= 2;
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

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  // const modelViewMatrix = mat4.create();
  //
  // // Now move the drawing position a bit to where we want to
  // // start drawing the square.
  //
  // mat4.translate(modelViewMatrix,     // destination matrix
  //                modelViewMatrix,     // matrix to translate
  //                [-0.0, 0.0, -6.0]);  // amount to translate
  //
  // //Write your code to Rotate the cube here//
  // mat4.rotate(modelViewMatrix,
  //             modelViewMatrix,
  //             cubeRotation,
  //             [0.0, 1.0, 1.0]);
  var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [2, 10, 0]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [3.0, 5.0, -13.0], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    c.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    c1.drawCube(gl, projectionMatrix, programInfo, deltaTime);

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
