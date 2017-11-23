//objet nécessaire à la conception du vaisseau

function corpsDroit(){
	
	var coords = [];
	var normals = [];
	var texCoords = [];
	var indices = [];
	function face(xyz, nrm) {
	  var start = coords.length/3;
	  var i;
	  for (i = 0; i < 12; i++) {
		 coords.push(xyz[i]);
	  }
	  for (i = 0; i < 4; i++) {
		 normals.push(nrm[0],nrm[1],nrm[2]);
	  }
	  texCoords.push(0,0,1,0,1,1,0,1);
	  indices.push(start,start+1,start+2,start,start+2,start+3);
	}
	//tetraedre
	face( [0,0,20, 0,0,0, 12,0,0 ], [0,-1,0] );
	face( [0,5,0, 12,0,0, 0,0,20], [0,1,0] );
	face( [0,5,0, 0,0,0, 12,0,0], [1,0,0] );
	face( [0,5,0, 0,0,0, 0,0,20], [0,0,1] );
	
	//fond
	face( [0,0,-6, 0,0,0, 12,0,0, 12,0,-6 ], [0,-1,0] );
	face( [0,5,0, 0,5,-6, 12,0,-6,  12,0,0], [0,1,0] );
	face( [0,5,0, 0,0,0, 12,0,0], [1,0,0] );
	face( [0,5,0, 0,0,0, 0,0,-6, 0,5,-6], [0,0,1] );
	face( [0,5,-6, 0,0,-6, 12,0,-6], [0,0,-1] );
	
	//avant
	face( [0,2,9, 0,2,-3, 5,2,-3, 1,2,9 ], [0,1,0] );
	face( [0,7,-3, 0,3,9, 0,2,9,  0,2,-3], [0,1,0] );
	face( [1,2,9, 1,3,9, 5,5,-3, 5,2,-3], [1,0,0] );
	face( [0,2,9, 0,3,9, 1,3,9, 1,2,9], [0,0,1] );
	face( [0,3,9, 1,3,9, 5,5,-3, 0,7,-3], [0,1,0] );
	face( [0,2,-3, 0,7,-3, 0,3,9, 0,2,9], [0,0,1] );
	face( [0,2,-3, 0,7,-3, 5,5,-3, 5,2,-3], [0,0,1] );
	
	//back
	face( [0,2,-9, 0,2,-3, 5,2,-3, 3,2,-9 ], [0,-1,0] );
	face( [0,7,-3, 0,2,-3, 0,2,-9,  0,6,-9], [0,1,0] );
	face( [5,2,-3, 5,5,-3, 5,5,-9, 3,2,-9 ], [1,0,0] );
	face( [0,7,-3, 5,5,-3, 5,5,-9, 0,6,-9], [0,1,0] );
	face( [0,2,-9, 0,6,-9, 5,5,-9, 3,2,-9], [0,0,-1] );
	face( [0,2,-3, 0,7,-3, 5,5,-3, 5,2,-3], [0,0,1] );
	
	//aileron
	face( [0,5,-5.99, 0,7,-5.99, 0,9,-8.99, 0,5,-8.99  ], [0,1,0] );
	face( [3,5,-5.99, 0,7,-5.99, 0,9,-8.99, 3,5,-8.99   ], [0,1,0] );
	face( [0,5,-5.99, 3,5,-5.99, 0,7,-5.99 ], [0,0,1] );
	face( [0,5,-8.99, 3,5,-8.99, 0,9,-8.99  ], [0,0,-1] );
	
	//console.log(coords);
	return {
	  vertexPositions: new Float32Array(coords),
	  vertexNormals: new Float32Array(normals),
	  vertexTextureCoords: new Float32Array(texCoords),
	  indices: new Uint16Array(indices)
	}
	
}

function corpsGauche(){
	
	var coords = [];
	var normals = [];
	var texCoords = [];
	var indices = [];
	function face(xyz, nrm) {
	  var start = coords.length/3;
	  var i;
	  for (i = 0; i < 12; i++) {
		 coords.push(xyz[i]);
	  }
	  for (i = 0; i < 4; i++) {
		 normals.push(nrm[0],nrm[1],nrm[2]);
	  }
	  texCoords.push(0,0,1,0,1,1,0,1);
	  indices.push(start,start+1,start+2,start,start+2,start+3);
	}
	//tetraedre
	face( [0,0,20, 0,0,0, -12,0,0 ], [0,-1,0] );
	face( [0,5,0, -12,0,0, 0,0,20], [0,1,0] );
	face( [0,5,0, 0,0,0, -12,0,0], [1,0,0] );
	face( [0,5,0, 0,0,0, 0,0,20], [0,0,1] );
	
	//fond
	face( [0,0,-6, 0,0,0, -12,0,0, -12,0,-6 ], [0,-1,0] );
	face( [0,5,0, 0,5,-6, -12,0,-6,  -12,0,0], [0,1,0] );
	face( [0,5,0, 0,0,0, -12,0,0], [1,0,0] );
	face( [0,5,0, 0,0,0, 0,0,-6, 0,5,-6], [0,0,1] );
	face( [0,5,-6, 0,0,-6, -12,0,-6], [0,0,-1] );
	
	//avant
	face( [0,2,9, 0,2,-3, -5,2,-3, -1,2,9 ], [0,1,0] );
	face( [0,7,-3, 0,3,9, 0,2,9,  0,2,-3], [0,1,0] );
	face( [-1,2,9, -1,3,9, -5,5,-3, -5,2,-3], [-1,0,0] );
	face( [0,2,9, 0,3,9, -1,3,9, -1,2,9], [0,0,1] );
	face( [0,3,9, -1,3,9, -5,5,-3, 0,7,-3], [0,1,0] );
	face( [0,2,-3, 0,7,-3, 0,3,9, 0,2,9], [0,0,1] );
	face( [0,2,-3, 0,7,-3, -5,5,-3, -5,2,-3], [0,0,1] );
	
	//back
	face( [0,2,-9, 0,2,-3, -5,2,-3, -3,2,-9 ], [0,-1,0] );
	face( [0,7,-3, 0,2,-3, 0,2,-9,  0,6,-9], [0,1,0] );
	face( [-5,2,-3, -5,5,-3, -5,5,-9, -3,2,-9 ], [-1,0,0] );
	face( [0,7,-3, -5,5,-3, -5,5,-9, 0,6,-9], [0,1,0] );
	face( [0,2,-9, 0,6,-9, -5,5,-9, -3,2,-9], [0,0,-1] );
	face( [0,2,-3, 0,7,-3, -5,5,-3, -5,2,-3], [0,0,1] );
	
	//aileron
	face( [0,5,-5.99, 0,7,-5.99, 0,9,-8.99, 0,5,-8.99  ], [0,1,0] );
	face( [-3,5,-5.99, 0,7,-5.99, 0,9,-8.99, -3,5,-8.99   ], [0,1,0] );
	face( [0,5,-5.99, -3,5,-5.99, 0,7,-5.99 ], [0,0,1] );
	face( [ -3,5,-8.99, 0,5,-8.99, 0,9,-8.99  ], [0,0,-1] );
	
	
	//console.log(coords);
	return {
	  vertexPositions: new Float32Array(coords),
	  vertexNormals: new Float32Array(normals),
	  vertexTextureCoords: new Float32Array(texCoords),
	  indices: new Uint16Array(indices)
	}
	
}

function trapeze(){
	
	var coords = [];
	var normals = [];
	var texCoords = [];
	var indices = [];
	function face(xyz, nrm) {
	  var start = coords.length/3;
	  var i;
	  for (i = 0; i < 12; i++) {
		 coords.push(xyz[i]);
	  }
	  for (i = 0; i < 4; i++) {
		 normals.push(nrm[0],nrm[1],nrm[2]);
	  }
	  texCoords.push(0,0,1,0,1,1,0,1);
	  indices.push(start,start+1,start+2,start,start+2,start+3);
	}
	face( [0,0,0, 0,3.5,0, 2,2,5, 2,0,5  ], [-1,0,0] );
	face( [6,0,0, 6,3.5,0, 4,2,5, 4,0,5   ], [1,0,0] );
	face( [2,0,5, 2,2,5, 4,2,5, 4,0,5 ], [0,0,1] );
	face( [ 0,0,0, 0,3.5,0, 6,3.5,0, 6,0,0  ], [0,0,-1] );
	face( [ 0,0,0, 6,0,0, 4,0,5, 2,0,5  ], [0,0,-1] );
	face( [ 0,3.5,0, 6,3.5,0, 4,2,5, 2,2,5  ], [0,1,0] );
	
	return {
	  vertexPositions: new Float32Array(coords),
	  vertexNormals: new Float32Array(normals),
	  vertexTextureCoords: new Float32Array(texCoords),
	  indices: new Uint16Array(indices)
	}
	
}