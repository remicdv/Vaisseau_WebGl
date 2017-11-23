// This program was developped by Daniel Audet and uses sections of code
// from http://math.hws.edu/eck/cs424/notes2013/19_GLSL.html
//
//  It has been adapted to be compatible with the "MV.js" library developped
//  for the book "Interactive Computer Graphics" by Edward Angel and Dave Shreiner.
//

"use strict";

var gl;   // The webgl context.

var CoordsLoc;       // Location of the coords attribute variable in the standard texture mappping shader program.
var NormalLoc;
var TexCoordLoc;

var ProjectionLoc;     // Location of the uniform variables in the standard texture mappping shader program.
var ModelviewLoc;
var NormalMatrixLoc;

var TextureLoc;
var isTexture;

var projection;   //--- projection matrix
var modelview;    // modelview matrix
var initialmodelview;
var flattenedmodelview;    //--- flattened modelview matrix

var normalMatrix = mat3();  //--- create a 3X3 matrix that will affect normals

var rotator;   // A SimpleRotator object to enable rotation by mouse dragging.

var texID1, texID2, texID3, texID4, texID5;  // standard texture identifiers

var sphere, cylinder, box, teapot, disk, torus, cone, corpsDroit, corpsGauche, trapeze;  // model identifiers

var prog;  // shader program identifier

var lightPosition = vec4(20.0, 20.0, 100.0, 1.0);

var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var materialAmbient = vec4(0.0, 0.1, 0.3, 1.0);
var materialDiffuse = vec4(0.48, 0.55, 0.69, 1.0);
var materialSpecular = vec4(0.48, 0.55, 0.69, 1.0);
var materialShininess = 400.0;

var ambientProduct, diffuseProduct, specularProduct;

var figure = [];
var stack = [];

//indice compoant
var corpsId = 0;
var corpsId1 = 1;
var reacteurDroitId = 2;
var reacteurDroitId1 = 3;
var reacteurDroitId2 = 4;
var reacteurDroitId3 = 5;
var reacteurDroitId4 = 6;
var reacteurGaucheId = 7;
var reacteurGaucheId1 = 8;
var reacteurGaucheId2 = 9;
var reacteurGaucheId3 = 10;
var reacteurGaucheId4 = 11;
var cockpitId = 12;
var cockpitId1 = 13;
var cockpitId2 = 14;
var canonDroitId = 15;
var canonDroitId1 = 16;
var canonDroitId2 = 17;
var canonDroitId3 = 18;
var canonDroitId4 = 19;
var canonDroitId5 = 20;
var canonDroitId6 = 21;
var canonGaucheId = 22;
var canonGaucheId1 = 23;
var canonGaucheId2 = 24;
var canonGaucheId3 = 25;
var canonGaucheId4 = 26;
var canonGaucheId5 = 27;
var canonGaucheId6 = 28;
var reliefId = 29;
var reliefId1 = 30;
var reliefId2 = 31;
var reliefId3 = 32;
var reliefId4 = 33;
var reliefId5 = 34;
var maxId = 35;


function render() {
    gl.clearColor(0.1, 0.1, 0.1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projection = perspective(70.0, 1.0, 1.0, 200.0);

    //--- Get the rotation matrix obtained by the displacement of the mouse
    //---  (note: the matrix obtained is already "flattened" by the function getViewMatrix)
    flattenedmodelview = rotator.getViewMatrix();
    modelview = unflatten(flattenedmodelview);

	normalMatrix = extractNormalMatrix(modelview);


	if (texID1.isloaded && texID2.isloaded && texID3.isloaded && texID4.isloaded && texID5.isloaded) {

		initialmodelview = modelview;

		//  Select shader program
		gl.useProgram(prog);

		gl.uniform4fv(gl.getUniformLocation(prog, "lightPosition"), flatten(lightPosition));

		gl.uniformMatrix4fv(ProjectionLoc, false, flatten(projection));  // send projection matrix to the new shader program

		gl.enableVertexAttribArray(CoordsLoc);
		gl.enableVertexAttribArray(NormalLoc);
		gl.disableVertexAttribArray(TexCoordLoc);  // we do not need texture coordinates

		traverse(corpsId);

	}
}


function corpsRender(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(0.0, 0.0, 0.0));
    modelview = mult(modelview, rotate(0, 0, 0, 1));
    modelview = mult(modelview, scale(1, 1, 1));
	materialAmbient = vec4(0.9, 0.9, 0.9, 1);
	materialDiffuse = vec4(0.6, 0.6, 0.6, 1);
	materialSpecular = vec4(1.00, 1.00, 1.00, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texID1);
    gl.uniform1i(TextureLoc, 1);
    corpsDroit.render();

}
function corpsRender1(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(0.0, 0.0, 0.0));
    modelview = mult(modelview, rotate(0, 0, 0, 1));
    modelview = mult(modelview, scale(1, 1, 1));
	materialAmbient = vec4(0.5, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.5, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texID1);
    gl.uniform1i(TextureLoc, 1);
    corpsGauche.render();

}

function cockpitRender(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(0.0, 4, -1.0));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.7, 0.4, 0.5, 1.0);
	materialDiffuse = vec4(0.6, 0.4, 0.2, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texID3);
    gl.uniform1i(TextureLoc, 3);
    sphere.render();

}
function cockpitRender1(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(0.0, 4.0, -4));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.7, 0.4, 0.5, 1.0);
	materialDiffuse = vec4(0.6, 0.4, 0.2, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texID2);
    gl.uniform1i(TextureLoc, 2);
	cylinder.render();
}
function cockpitRender2(){
	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(0.0, 4, -6));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.7, 0.4, 0.5, 1.0);
	materialDiffuse = vec4(0.6, 0.4, 0.2, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texID2);
    gl.uniform1i(TextureLoc, 2);
    sphere.render();

}

function reliefRender(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(0.0, 2.7, -6.7));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.35, 0.35, 0.35));
	materialAmbient = vec4(0.10, 0.1, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.1, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    box.render();

}
function reliefRender1(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-3, 2.5, 0));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(1, 1, 1));
	materialAmbient = vec4(0.10, 0.1, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.1, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    trapeze.render();

}
function reliefRender2(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-2, 4.9, -1));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.2, 0.2, 0.2));
	materialAmbient = vec4(0.10, 0.1, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.1, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    box.render();

}
function reliefRender3(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-2, 4.9, -2));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.2, 0.2, 0.2));
	materialAmbient = vec4(0.10, 0.1, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.1, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    box.render();

}
function reliefRender4(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(2, 4.9, -1));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.2, 0.2, 0.2));
	materialAmbient = vec4(0.10, 0.1, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.1, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    box.render();

}
function reliefRender5(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(2, 4.9, -2));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.2, 0.2, 0.2));
	materialAmbient = vec4(0.10, 0.1, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.1, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    box.render();

}

function canonDroitRender(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(4, 1.5, 8));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.1, 0.1, 0.1));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    sphere.render();

}
function canonDroitRender1(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, 9));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.1, 0.1, 0.1));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texID4);
    gl.uniform1i(TextureLoc, 4);
	cylinder.render();

}
function canonDroitRender2(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, 10));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.05, 0.05, 0.05));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonDroitRender3(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, 10.5));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.025, 0.025, 0.025));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonDroitRender4(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, 11));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.025, 0.025, 0.025));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonDroitRender5(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, 11.5));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.025, 0.025, 0.025));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonDroitRender6(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(4, 1.5, 12));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.05, 0.05, 0.05));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.70, 0.75, 0.75, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texID4);
    gl.uniform1i(TextureLoc, 4);
    cone.render();

}

function canonGaucheRender(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-4, 1.5, 8));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.1, 0.1, 0.1));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texID1);
    gl.uniform1i(TextureLoc, 1);
    sphere.render();

}
function canonGaucheRender1(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, 9));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.1, 0.1, 0.1));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texID4);
    gl.uniform1i(TextureLoc, 4);
	cylinder.render();

}
function canonGaucheRender2(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, 10));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.05, 0.05, 0.05));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonGaucheRender3(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, 10.5));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.025, 0.025, 0.025));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonGaucheRender4(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, 11));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.025, 0.025, 0.025));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonGaucheRender5(){


	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, 11.5));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.025, 0.025, 0.025));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function canonGaucheRender6(){


    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-4, 1.5, 12));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.05, 0.05, 0.05));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.70, 0.75, 0.75, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texID4);
    gl.uniform1i(TextureLoc, 4);
    cone.render();

}

function reacteurDroitRender(){

	//gauche
	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, -8));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.25, 0.25, 0.25));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, texID5);
    gl.uniform1i(TextureLoc, 5);
	cylinder.render();

}
function reacteurDroitRender1(){


	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, -9));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.20, 0.2, 0.2));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function reacteurDroitRender2(){


	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(4, 1.5, -10));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.15, 0.15, 0.15));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texID2);
    gl.uniform1i(TextureLoc, 2);
	cylinder.render();

}
function reacteurDroitRender3(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(4.0, 1.5, -10.0));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    disk.render();

}
function reacteurDroitRender4(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(4.0, 1.5, -10.01));
    modelview = mult(modelview, rotate(180.0, 0, 1, 0));
    modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    disk.render();

}

function reacteurGaucheRender(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, -8));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.25, 0.25, 0.25));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, texID5);
    gl.uniform1i(TextureLoc, 5);
	cylinder.render();

}
function reacteurGaucheRender1(){


    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-4.0, 1.5, -10.0));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    disk.render();

}
function reacteurGaucheRender2(){

    normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
    modelview = mult(initialmodelview, translate(-4.0, 1.5, -10.01));
    modelview = mult(modelview, rotate(180.0, 0, 1, 0));
    modelview = mult(modelview, scale(0.3, 0.3, 0.3));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
    disk.render();

}
function reacteurGaucheRender3(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, -9));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.20, 0.2, 0.2));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 0;
	cylinder.render();

}
function reacteurGaucheRender4(){

	normalMatrix = extractNormalMatrix(initialmodelview);  // always extract the normal matrix before scaling
	modelview = mult(initialmodelview, translate(-4, 1.5, -10));
	modelview = mult(modelview, rotate(0.0, 1, 0, 0));
	modelview = mult(modelview, scale(0.15, 0.15, 0.15));
	materialAmbient = vec4(0.10, 0.10, 0.20, 1.0);
	materialDiffuse = vec4(0.10, 0.15, 0.05, 1.0);
	materialSpecular = vec4(0.80, 0.80, 0.80, 1.0);
	isTexture = 1;
	gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texID2);
    gl.uniform1i(TextureLoc, 2);
	cylinder.render();

}

function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

function initNodes(Id) {


	var m=mat4();

	switch(Id) {

    case corpsId:

		figure[corpsId] = createNode( m, corpsRender, corpsId1, null );

    break;
    case corpsId1:

		figure[corpsId1] = createNode( m, corpsRender1, null, cockpitId );

    break;
	////////////////////////////////////////////////////////////////////////

    case cockpitId:

		figure[cockpitId] = createNode( m, cockpitRender, cockpitId1, null );

    break;
    case cockpitId1:

		figure[cockpitId1] = createNode( m, cockpitRender1, cockpitId2, null );

    break;
    case cockpitId2:

		figure[cockpitId2] = createNode( m, cockpitRender2, null, reacteurDroitId );

    break;
	////////////////////////////////////////////////////////////////////////

    case reacteurDroitId:

		figure[reacteurDroitId] = createNode( m, reacteurDroitRender, reacteurDroitId1, null );

    break;
    case reacteurDroitId1:

		figure[reacteurDroitId1] = createNode( m, reacteurDroitRender1, reacteurDroitId2, null );

    break;
    case reacteurDroitId2:

		figure[reacteurDroitId2] = createNode( m, reacteurDroitRender2, reacteurDroitId3, null );

    break;
    case reacteurDroitId3:

		figure[reacteurDroitId3] = createNode( m, reacteurDroitRender3, reacteurDroitId4, null );

    break;
    case reacteurDroitId4:

		figure[reacteurDroitId4] = createNode( m, reacteurDroitRender4, null, reacteurGaucheId );

    break;
	////////////////////////////////////////////////////////////////////////

    case reacteurGaucheId:

		figure[reacteurGaucheId] = createNode( m, reacteurGaucheRender, reacteurGaucheId1, null );

    break;
    case reacteurGaucheId1:

		figure[reacteurGaucheId1] = createNode( m, reacteurGaucheRender1, reacteurGaucheId2, null );

    break;
    case reacteurGaucheId2:

		figure[reacteurGaucheId2] = createNode( m, reacteurGaucheRender2, reacteurGaucheId3, null );

    break;
    case reacteurGaucheId3:

		figure[reacteurGaucheId3] = createNode( m, reacteurGaucheRender3, reacteurGaucheId4, null );

    break;
    case reacteurGaucheId4:

		figure[reacteurGaucheId4] = createNode( m, reacteurGaucheRender4, null, canonDroitId );

    break;
	////////////////////////////////////////////////////////////////////////

    case canonDroitId:

		figure[canonDroitId] = createNode( m, canonDroitRender, canonDroitId1, null );

    break;
    case canonDroitId1:

		figure[canonDroitId1] = createNode( m, canonDroitRender1, canonDroitId2, null );

    break;
    case canonDroitId2:

		figure[canonDroitId2] = createNode( m, canonDroitRender2, canonDroitId3, null );

    break;
    case canonDroitId3:

		figure[canonDroitId3] = createNode( m, canonDroitRender3, canonDroitId4, null );

    break;
    case canonDroitId4:

		figure[canonDroitId4] = createNode( m, canonDroitRender4, canonDroitId5, null );

    break;
    case canonDroitId5:

		figure[canonDroitId5] = createNode( m, canonDroitRender5, canonDroitId6, null );

    break;
    case canonDroitId6:

		figure[canonDroitId6] = createNode( m, canonDroitRender6, null, canonGaucheId );

    break;
	////////////////////////////////////////////////////////////////////////

    case canonGaucheId:

		figure[canonGaucheId] = createNode( m, canonGaucheRender, canonGaucheId1, null );

    break;
    case canonGaucheId1:

		figure[canonGaucheId1] = createNode( m, canonGaucheRender1, canonGaucheId2, null );

    break;
    case canonGaucheId2:

		figure[canonGaucheId2] = createNode( m, canonGaucheRender2, canonGaucheId3, null );

    break;
    case canonGaucheId3:

		figure[canonGaucheId3] = createNode( m, canonGaucheRender3, canonGaucheId4, null );

    break;
    case canonGaucheId4:

		figure[canonGaucheId4] = createNode( m, canonGaucheRender4, canonGaucheId5, null );

    break;
    case canonGaucheId5:

		figure[canonGaucheId5] = createNode( m, canonGaucheRender5, canonGaucheId6, null );

    break;
    case canonGaucheId6:

		figure[canonGaucheId6] = createNode( m, canonGaucheRender6, null, reliefId );

    break;
	////////////////////////////////////////////////////////////////////////

    case reliefId:

		figure[reliefId] = createNode( m, reliefRender, reliefId1, null );

    break;
    case reliefId1:

		figure[reliefId1] = createNode( m, reliefRender1, reliefId2, null );

    break;
    case reliefId2:

		figure[reliefId2] = createNode( m, reliefRender2, reliefId3, null );

    break;
    case reliefId3:

		figure[reliefId3] = createNode( m, reliefRender3, reliefId4, null );

    break;
    case reliefId4:

		figure[reliefId4] = createNode( m, reliefRender4, reliefId5, null );

    break;
    case reliefId5:

		figure[reliefId5] = createNode( m, reliefRender5, null, null );

    break;

	}

}

function unflatten(matrix) {
    var result = mat4();
    result[0][0] = matrix[0]; result[1][0] = matrix[1]; result[2][0] = matrix[2]; result[3][0] = matrix[3];
    result[0][1] = matrix[4]; result[1][1] = matrix[5]; result[2][1] = matrix[6]; result[3][1] = matrix[7];
    result[0][2] = matrix[8]; result[1][2] = matrix[9]; result[2][2] = matrix[10]; result[3][2] = matrix[11];
    result[0][3] = matrix[12]; result[1][3] = matrix[13]; result[2][3] = matrix[14]; result[3][3] = matrix[15];

    return result;
}



function traverse(Id) {

	if(Id == null) return;
	stack.push(initialmodelview);
	initialmodelview = mult(initialmodelview, figure[Id].transform);
	figure[Id].render();
	if(figure[Id].child != null) traverse(figure[Id].child);
	initialmodelview = stack.pop();
	if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}

function handleLoadedTexture(texture) {

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    texture.isloaded = true;

    // render();

    gl.bindTexture(gl.TEXTURE_2D, null);
}

function initTexture() {

    texID1 = gl.createTexture();
    texID1.isloaded = false;   // this class member is created only to check if the image has been loaded
    texID1.image = new Image();
    texID1.image.onload = function () {
        handleLoadedTexture(texID1)
    }
    texID1.image.src = "Textures/corps.jpg";

    texID2 = gl.createTexture();
    texID2.isloaded = false;  // this class member is created only to check if the image has been loaded
    texID2.image = new Image();
    texID2.image.onload = function () {
        handleLoadedTexture(texID2)
    }
    texID2.image.src = "Textures/cockpit.jpg";

    texID3 = gl.createTexture();
    texID3.isloaded = false;  // this class member is created only to check if the image has been loaded
    texID3.image = new Image();
    texID3.image.onload = function () {
        handleLoadedTexture(texID3)
    }
    texID3.image.src = "Textures/cockpit-avant.jpg";

	texID4 = gl.createTexture();
    texID4.isloaded = false;  // this class member is created only to check if the image has been loaded
    texID4.image = new Image();
    texID4.image.onload = function () {
        handleLoadedTexture(texID4)
    }
    texID4.image.src = "Textures/canon.jpg";

	texID5 = gl.createTexture();
    texID5.isloaded = false;  // this class member is created only to check if the image has been loaded
    texID5.image = new Image();
    texID5.image.onload = function () {
        handleLoadedTexture(texID5)
    }
    texID5.image.src = "Textures/reacteur.jpg";

}


function extractNormalMatrix(matrix) { // This function computes the transpose of the inverse of
    // the upperleft part (3X3) of the modelview matrix (see http://www.lighthouse3d.com/tutorials/glsl-tutorial/the-normal-matrix/ )

    var result = mat3();
    var upperleft = mat3();
    var tmp = mat3();

    upperleft[0][0] = matrix[0][0];  // if no scaling is performed, one can simply use the upper left
    upperleft[1][0] = matrix[1][0];  // part (3X3) of the modelview matrix
    upperleft[2][0] = matrix[2][0];

    upperleft[0][1] = matrix[0][1];
    upperleft[1][1] = matrix[1][1];
    upperleft[2][1] = matrix[2][1];

    upperleft[0][2] = matrix[0][2];
    upperleft[1][2] = matrix[1][2];
    upperleft[2][2] = matrix[2][2];

    tmp = matrixinvert(upperleft);
    result = transpose(tmp);

    return result;
}

function matrixinvert(matrix) {

    var result = mat3();

    var det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) -
                 matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                 matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);

    var invdet = 1 / det;

    // inverse of matrix m
    result[0][0] = (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) * invdet;
    result[0][1] = (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) * invdet;
    result[0][2] = (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) * invdet;
    result[1][0] = (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) * invdet;
    result[1][1] = (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) * invdet;
    result[1][2] = (matrix[1][0] * matrix[0][2] - matrix[0][0] * matrix[1][2]) * invdet;
    result[2][0] = (matrix[1][0] * matrix[2][1] - matrix[2][0] * matrix[1][1]) * invdet;
    result[2][1] = (matrix[2][0] * matrix[0][1] - matrix[0][0] * matrix[2][1]) * invdet;
    result[2][2] = (matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]) * invdet;

    return result;
}


function createModel(modelData) {
    var model = {};
    model.coordsBuffer = gl.createBuffer();
    model.normalBuffer = gl.createBuffer();
    model.textureBuffer = gl.createBuffer();
    model.indexBuffer = gl.createBuffer();
    model.count = modelData.indices.length;

    gl.bindBuffer(gl.ARRAY_BUFFER, model.coordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexTextureCoords, gl.STATIC_DRAW);

    // console.log(modelData.vertexPositions.length);
    // console.log(modelData.indices.length);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);

    model.render = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordsBuffer);
        gl.vertexAttribPointer(CoordsLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(NormalLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.vertexAttribPointer(TexCoordLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

		gl.uniform1i(gl.getUniformLocation(prog, "isTexture"), isTexture);
		gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
		gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
		gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
		gl.uniform1f(gl.getUniformLocation(prog, "shininess"), materialShininess);


        gl.uniformMatrix4fv(ModelviewLoc, false, flatten(modelview));    //--- load flattened modelview matrix
        gl.uniformMatrix3fv(NormalMatrixLoc, false, flatten(normalMatrix));  //--- load flattened normal matrix

        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
        // console.log(this.count);
    }
    return model;
}



function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var vsh = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsh, vertexShaderSource);
    gl.compileShader(vsh);
    if (!gl.getShaderParameter(vsh, gl.COMPILE_STATUS)) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
    }
    var fsh = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if (!gl.getShaderParameter(fsh, gl.COMPILE_STATUS)) {
        throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}


function getTextContent(elementID) {
    var element = document.getElementById(elementID);
    var fsource = "";
    var node = element.firstChild;
    var str = "";
    while (node) {
        if (node.nodeType == 3) // this is a text node
            str += node.textContent;
        node = node.nextSibling;
    }
    return str;
}

function init() {
    try {
        var canvas = document.getElementById("glcanvas");
        gl = canvas.getContext("webgl");
        if (!gl) {
            gl = canvas.getContext("experimental-webgl");
        }
        if (!gl) {
            throw "Could not create WebGL context.";
        }

        // LOAD SHADER (standard texture mapping)
        var vertexShaderSource = getTextContent("vshader");
        var fragmentShaderSource = getTextContent("fshader");
        prog = createProgram(gl, vertexShaderSource, fragmentShaderSource);

        gl.useProgram(prog);

        // locate variables for further use
        CoordsLoc = gl.getAttribLocation(prog, "vcoords");
        NormalLoc = gl.getAttribLocation(prog, "vnormal");
        TexCoordLoc = gl.getAttribLocation(prog, "vtexcoord");

        ModelviewLoc = gl.getUniformLocation(prog, "modelview");
        ProjectionLoc = gl.getUniformLocation(prog, "projection");
        NormalMatrixLoc = gl.getUniformLocation(prog, "normalMatrix");

		TextureLoc = gl.getUniformLocation(prog, "texture");

        gl.enableVertexAttribArray(CoordsLoc);
        gl.enableVertexAttribArray(NormalLoc);
        gl.enableVertexAttribArray(TexCoordLoc);

        gl.enable(gl.DEPTH_TEST);

		initTexture();

        //  create a "rotator" monitoring mouse mouvement
        rotator = new SimpleRotator(canvas, render);
        //  set initial camera position at z=40, with an "up" vector aligned with y axis
        //   (this defines the initial value of the modelview matrix )
        rotator.setView([0, 0, 1], [0, 1, 0], 40);

        // You can use basic models using the following lines


        sphere = createModel(uvSphere(10.0, 25.0, 25.0));
        cylinder = createModel(uvCylinder(10.0, 20.0, 25.0, false, false));
        box = createModel(cube(10.0));

	      teapot = createModel(teapotModel);
        disk = createModel(ring(5.0, 10.0, 25.0));
        torus = createModel(uvTorus(15.0, 5.0, 25.0, 25.0));
        cone = createModel(uvCone(10.0, 20.0, 25.0, true));

    		corpsDroit = createModel(corpsDroit());
    		corpsGauche = createModel(corpsGauche());
    		trapeze = createModel(trapeze());

    }
    catch (e) {
        document.getElementById("message").innerHTML =
             "Could not initialize WebGL: " + e;
        return;
    }

	for(var i = 0 ; i < maxId ; i++)
	{
		initNodes(i);
	}

	render();
    // setInterval(render, 1000);
}
