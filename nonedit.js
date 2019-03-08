function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function create3Dobj(gl, obj, buffer) {
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  obj.position = buffer.vertices;
  obj.indices =  buffer.normals;
  obj.faceColors = buffer.texture;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.position), gl.STATIC_DRAW);
  // var colors = [];
  // for (var j = 0; j < obj.faceColors.length; ++j) {
  //     const c = obj.faceColors[j];
  //
  //     // Repeat each color four times for the four vertices of the face
  //     colors = colors.concat(c, c, c, c);
  // }
  // console.log(colors.length);
  // console.log(obj.faceColors.length);
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.faceColors), gl.STATIC_DRAW);

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.indices), gl.STATIC_DRAW);


  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  }
}

async function loadObject(filedata) {
  var vertex_buffer_data = [];
  var points = [];
  var normals = [];
  var normal_buffer_data = [];
  var textures = [];
  var texture_buffer_data = [];
  var lines = filedata.split('\n');
  lines = lines.map(s => s.trim());
  for (var j=0; j<lines.length; ++j) {
    var words = lines[j].split(' ');
    if(words[0] == "v") {
      var cur_point = [];
      cur_point[0]=parseFloat(words[1]);
      cur_point[1]=parseFloat(words[2]);
      cur_point[2]=parseFloat(words[3]);
      points.push(cur_point);
    }
    else if (words[0] == "vn") {
      var cur_point = [];
      cur_point[0]=parseFloat(words[1]);
      cur_point[1]=parseFloat(words[2]);
      cur_point[2]=parseFloat(words[3]);
      normals.push(cur_point);
    }
    else if (words[0] == "vt") {
      var cur_point = [];
      cur_point[0] = parseFloat(words[1]);
      cur_point[1] = parseFloat(words[2]);
      textures.push(cur_point);

    }
    else if (words[0] == 'f') {
      for (let wc = 1; wc < words.length; wc++) {
        let vxdata = words[wc].split('/')
        let p = parseInt(vxdata[0]) - 1
        let t = parseInt(vxdata[1]) - 1
        let n = parseInt(vxdata[2]) - 1
        vertex_buffer_data.push(points[p][0])
        vertex_buffer_data.push(points[p][1])
        vertex_buffer_data.push(points[p][2])

        texture_buffer_data.push(textures[t][0])
        texture_buffer_data.push(textures[t][1])

        normal_buffer_data.push(normals[n][0])
        normal_buffer_data.push(normals[n][1])
        normal_buffer_data.push(normals[n][2])
      }
    }
  }
  return {
    vertices: vertex_buffer_data,
    texture: texture_buffer_data,
    normals: normal_buffer_data,
  }
}

function handleLoadedTexture(gl, texture) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);
}

function loadTexture(gl, src, material, load) {
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.onload = function () {
    handleLoadedTexture(gl, texture)
    material.texture = texture
    load = true;
  }
  texture.image.src = src;
  return texture;
}
