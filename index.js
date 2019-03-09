var cubeRotation = 0.0;

main();

//
// Start here
//
var c;
var c1;
var c2;
var c3;
var c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26;
var cu;
var isJump = 0;
var flash = 1.0;
var invertflash = 0;
var invertgreyCode = 0;
var greyCode = 0;
var timeup = 1, timeupPol = 0;
var countTime = 0;
var countTimePol = 0;
var up = [0.0, 1.0, 0.0];
var target = [0.0, 0.0, 0.0];
var eye = [0.0, 8.0 , 13.0];
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
 // make objects here
  // If we don't have a GL context, give up now
  c = new cube(gl, [0.0, 0.0, 0.0],[0.2, 0.2, 0.2]);
  c.start(gl);
  c28 = new police(gl, [0.0, 0.0, 8.0],[0.2, 0.2, 0.2]);
  c28.start(gl);
  // cu = new cubie(gl, [0.0, 0.0, 0.0],[1.0, 1.0, 1.0]);
  c1 = new train(gl, [2.0, 0.0, -13.0], [0.1, 0.1, 0.1]);
  c1.start(gl);
  c27 = new train(gl, [-2.0, 0.0, -19.0], [0.1, 0.1, 0.1]);
  c27.start(gl);
  c2 = new cube(gl, [2.0, 0.0, -16.0], [1.0, 1.0, 3.0]);
  c2.start(gl);
  c3 = new railroad(gl, [2.0, -3.0, -16.0], [0.03, 0.05, 0.05]) // right most
  c3.start(gl);
  c4 = new railroad(gl, [2.0, -3.0, -10.0], [0.03, 0.05, 0.05])
  c4.start(gl);
  c5 = new railroad(gl, [2.0, -3.0, -7.0], [0.03, 0.05, 0.05])
  c5.start(gl);
  c6 = new railroad(gl, [2.0, -3.0, -4.0], [0.03, 0.05, 0.05])
  c6.start(gl);
  c7 = new railroad(gl, [2.0, -3.0, -1.0], [0.03, 0.05, 0.05])
  c7.start(gl);
  c8 = new railroad(gl, [2.0, -3.0, 2.0], [0.03, 0.05, 0.05])
  c8.start(gl);
  c9 = new railroad(gl, [2.0, -3.0, 5.0], [0.03, 0.05, 0.05])
  c9.start(gl);
  c10 = new railroad(gl, [2.0, -3.0, 8.0], [0.03, 0.05, 0.05])
  c10.start(gl);
  c11 = new railroad(gl, [0.0, -3.0, 8.0], [0.03, 0.05, 0.05])
  c11.start(gl);
  c12 = new railroad(gl, [0.0, -3.0, 5.0], [0.03, 0.05, 0.05])// middle
  c12.start(gl);
  c13 = new railroad(gl, [0.0, -3.0, 2.0], [0.03, 0.05, 0.05])
  c13.start(gl);
  c14 = new railroad(gl, [0.0, -3.0, -1.0], [0.03, 0.05, 0.05])
  c14.start(gl);
  c15 = new railroad(gl, [0.0, -3.0, -4.0], [0.03, 0.05, 0.05])
  c15.start(gl);
  c16 = new railroad(gl, [0.0, -3.0, -7.0], [0.03, 0.05, 0.05])
  c16.start(gl);
  c17 = new railroad(gl, [0.0, -3.0, -10.0], [0.03, 0.05, 0.05])
  c17.start(gl);
  c18 = new railroad(gl, [0.0, -3.0, -16.0], [0.03, 0.05, 0.05])
  c18.start(gl);
  c19 = new railroad(gl, [-2.0, -3.0, 8.0], [0.03, 0.05, 0.05])// left most
  c19.start(gl);
  c20 = new railroad(gl, [-2.0, -3.0, 5.0], [0.03, 0.05, 0.05])
  c20.start(gl);
  c21 = new railroad(gl, [-2.0, -3.0, 2.0], [0.03, 0.05, 0.05])
  c21.start(gl);
  c22 = new railroad(gl, [-2.0, -3.0, -1.0], [0.03, 0.05, 0.05])
  c22.start(gl);
  c23 = new railroad(gl, [-2.0, -3.0, -4.0], [0.03, 0.05, 0.05])
  c23.start(gl);
  c24 = new railroad(gl, [-2.0, -3.0, -7.0], [0.03, 0.05, 0.05])
  c24.start(gl);
  c25 = new railroad(gl, [-2.0, -3.0, -10.0], [0.03, 0.05, 0.05])
  c25.start(gl);
  c26 = new railroad(gl, [-2.0, -3.0, -16.0], [0.03, 0.05, 0.05])
  c26.start(gl);
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
      flash: gl.getUniformLocation(shaderProgram, 'flash'),
      greyCode: gl.getUniformLocation(shaderProgram, 'greyCode'),
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
    if(timeup == 0) {
      timeup = 0.5;
      countTime = now;
    } // time up restored
    if (now - countTime >= 1.0) {
      timeup = 1;
    }
    if (countTimePol == 0) {
      countTimePol = now;
    }
    if (now - countTimePol >= 1.0) {
      timeupPol = 1;
    }
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
   c28.pos[2] -= 0.04;
   c3.pos[2] -= 0.04;
   c4.pos[2] -= 0.04;
   c5.pos[2] -= 0.04;
   c6.pos[2] -= 0.04;
   c7.pos[2] -= 0.04;
   c8.pos[2] -= 0.04;
   c9.pos[2] -= 0.04;
   c10.pos[2] -= 0.04;
   c11.pos[2] -= 0.04;
   c12.pos[2] -= 0.04;
   c13.pos[2] -= 0.04;
   c14.pos[2] -= 0.04;
   c15.pos[2] -= 0.04;
   c16.pos[2] -= 0.04;
   c17.pos[2] -= 0.04;
   c18.pos[2] -= 0.04;
   c19.pos[2] -= 0.04;
   c20.pos[2] -= 0.04;
   c21.pos[2] -= 0.04;
   c22.pos[2] -= 0.04;
   c23.pos[2] -= 0.04;
   c24.pos[2] -= 0.04;
   c25.pos[2] -= 0.04;
   c26.pos[2] -= 0.04;
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
   if (invertflash == 1) { // if c is pressed; check if the period is up; if up change the flash value
     if(timeup == 1) {
       if (flash == 0.7) {
         flash = 1.0;
       }
       else {
         flash = 0.7;
       }
       timeup = 0; // time up is restored
     }
   }
 }

// take input here
var xvelocity = 2;
var yvelocity = 3.5;
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
    }
    else if(event.keyCode == 40) {
        c.pos[1] -= yvelocity;
    }
    else if (event.keyCode == 67) { // press c to see flashes
      if (invertflash == 0) {
          invertflash = 1;
      }
      else {
        invertflash = 0;
      }
    }
    else if (event.keyCode == 88) { // press x to see greyScale
      if (greyCode == 0) {
          greyCode = 1.0
      }
      else {
        greyCode = 0;
      }
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

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    if(c.load == true) {
      // console.log('no');
      c.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c1.load == true) {
      c1.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c3.load == true) {
      c3.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c4.load == true) {
      c4.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c5.load == true) {
      c5.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c6.load == true) {
      c6.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c7.load == true) {
      c7.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c8.load == true) {
      c8.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c9.load == true) {
      c9.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c10.load == true) {
      c10.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c11.load == true) {
      c11.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c12.load == true) {
      c12.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c13.load == true) {
      c13.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c14.load == true) {
      c14.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c15.load == true) {
      c15.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c16.load == true) {
      c16.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c17.load == true) {
      c17.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c18.load == true) {
      c18.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c19.load == true) {
      c19.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c20.load == true) {
      c20.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c21.load == true) {
      c21.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c22.load == true) {
      c22.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c23.load == true) {
      c23.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c24.load == true) {
      c24.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c25.load == true) {
      c25.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c26.load == true) {
      c26.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(c27.load == true) {
      c27.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
    }
    if(timeupPol == 0) {
      if(c28.load == true) {
        c28.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime, flash, greyCode);
      }
    }

}
function detect_collision_x() {
  if (Math.abs(c.pos[0] - c1.pos[0]) <= 0.5) {
    if (Math.abs(c.pos[2] - c1.pos[2]) <= 3.0) {
      if (c.pos[1] == c1.pos[1]) { // height same that means it has collided in x direction (whenever hit reduce the player's speed for the next 5 seconds)
          c.pos[0] -= 2;
      }
      else {
        if (Math.abs(c.pos[1] - c1.pos[1]) <= 2.5) { // y collision that means it stays on top
            c.pos[1] = c1.pos[1] + 2.5;
        }
      }
    }
  }
  if (Math.abs(c.pos[0] - c27.pos[0]) <= 0.5) {
    if (Math.abs(c.pos[2] - c27.pos[2]) <= 3.0) {
      if (c.pos[1] == c27.pos[1]) { // height same that means it has collided in x direction (whenever hit reduce the player's speed for the next 5 seconds)
          c.pos[0] += 2;
      }
      else {
        if (Math.abs(c.pos[1] - c27.pos[1]) <= 2.5) { // y collision that means it stays on top
            c.pos[1] = c27.pos[1] + 2.5;
        }
      }
    }
  }
}
