let wall = class {
    constructor(gl, pos, scale) {
        this.positions = [];
        this.indices  = [];
        this.faceColors  = [];
        this.material = {};
        this.obj = {};
        this.bufferr = {};
        this.object = {position: this.position, indices: this.indices, faceColors: this.faceColors};
        this.vertextCountt = 0;
        this.rotation = 90 * Math.PI/180;
        this.load = false;
        this.pos = pos;
        this.scale = scale;
    }
    start(gl) {
      fetch("./models/objects/Wall/Wall.obj")
      .then(response => response.text())
      .then(text => loadObject(text))
      .then(buffer => {
          this.obj = create3Dobj(gl, this.object, buffer);
          this.bufferr = {
            position: this.obj.position,
            uvs: this.obj.color,
            normals: this.obj.indices
          };
          loadTexture(gl, "./models/objects/Wall/Wall.png", this.material);
          this.vertexCountt = buffer.vertices.length / 3;
          this.load = true;
        });

    }
    drawCube(gl, projectionMatrix, programInfo, deltaTime, flash = 1.0, greyCode = 0) {
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        mat4.scale(
            modelViewMatrix,
            modelViewMatrix,
            this.scale,
        );
        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0, 1, 0]);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferr.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferr.uvs);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }

        // Tell WebGL which indices to use to index the vertices
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferr.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
        gl.uniform1f(programInfo.uniformLocations.flash, flash);
        gl.uniform1f(programInfo.uniformLocations.greyCode, greyCode);
        gl.bindTexture(gl.TEXTURE_2D, this.material.texture);
        {
          const vertexCount = this.vertexCountt;
          const type = gl.UNSIGNED_SHORT;
          const offset = 0;
          gl.drawArrays(gl.TRIANGLES, 0, this.vertexCountt);
        }

    }
};
