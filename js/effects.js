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
		 data[i + 1] = A[1];
		  // blue
		 data[i + 2] = A[1];
			}
	}

	 ctx.putImageData(pump, 0, 0);
}

let denseness = 7;
let itertot = 40;
let itercount = 0;
let parts =[];

var getCoords = function(){
		var imageData, pixel, height, width;
		
		imageData = ctx.getImageData(0, 0, w, h);
		
		// quickly iterate over all pixels - leaving density gaps
	    for(height = 0; height < h; height += denseness){
            for(width = 0; width < w; width += denseness){   
               pixel = imageData.data[((width + (height * w)) * 4) - 1];
                  //Pixel is black from being drawn on. 
                  if(pixel == 255) {
                    drawCircle(width, height);
                 }
            }
        }    
        setInterval( update, 40 );
	}

	var drawCircle = function(x, y){
		
		parts.push(
			{c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
			 x: x, //goal position
			 y: y
			}
		)
	}
		
	var update = () => {
		ctx.clearRect(0,0,w,h);
		
		for(var i=0;i<parts.length;i++)
			{
			//Draw the circle
			ctx.fillStyle = parts[i].c;
			ctx.beginPath();
			ctx.arc(parts[i].x, parts[i].y, 1 ,0 , Math.PI*2, true);
			ctx.closePath();
	    	ctx.fill();	
				
		}	
	}

		
	let shadow = (color) =>
	{
		ctx.shadowColor = "grey";
		ctx.shadowOffsetX = 2;
	}



//let temp = 0;
//let animate = () => {
//	temp+=0.01;
//	ctx.clearRect(0,0,w,h);
//	requestAnimationFrame(animate);
//	draw(string)(font_size)(font_family);
//}