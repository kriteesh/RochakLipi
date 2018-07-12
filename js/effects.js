function threeColors(){
	
	let pump = ctx.getImageData(0,0,w,h);
	let data = pump.data;
	let A = [0,255];

	for(var i = 0; i < data.length; i += 4) {
		 // red
		 data[i] = A[Math.floor(Math.random()*2)];
		  // green
		 data[i + 1] = A[Math.floor(Math.random()*2)];
		  // blue
		 data[i + 2] = A[Math.floor(Math.random()*2)];
	}

	 ctx.putImageData(pump, 0, 0);
}

function twoColors(){

	let pump = ctx.getImageData(0,0,w,h);
	let data = pump.data;
	let A = [0,255];

	for(var i = 0; i < data.length; i += 4) {
		
		if(((i/4)%w)%8<=2)
			{
		 // red
		 data[i] = A[1];
		  // green
		 data[i + 1] = A[0];
		  // blue
		 data[i + 2] = A[0];
			}
	}

	 ctx.putImageData(pump, 0, 0);
}
