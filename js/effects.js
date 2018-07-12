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

function twoColors(rump){

	let pump = ctx.getImageData(0,0,w,h);
	let data = pump.data;
	let A = [0,255];

	for(var i = 0; i < data.length; i += 4) {
		
		if(((i/4)%w)%8<=2)
			{
		 // red
		 data[i] = A[1];
		  // green
		 data[i + 1] = A[1];
		  // blue
		 data[i + 2] = A[1];
			}
	}

	 ctx.putImageData(pump, 0, 0);
}
let temp = 0;
let animate = () => {
	temp+=0.01;
	ctx.clearRect(0,0,w,h);
	requestAnimationFrame(animate);
	draw(string)(font_size)(font_family);
}