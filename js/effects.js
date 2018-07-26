
let whiteNoise = () => {

let pixels = (context) => {
			let pump = context.getImageData(0,0,w,h).data;
			let data = [];
			for(let i=0; i<pump.length;i+=4)
				{
					data[i/4] = {x : Math.floor(i/4)%w, y : Math.floor(Math.floor(i/4)/w), r : pump[i], g : pump[i+1], b : pump[i+2], a : pump[i+3]};
					
				}
			data = data.filter(x=>x.a!=0);
			return data;					
		}

let meta = pixels(ctx);

let shinto = (data) =>{
		 for(let i=0; i<data.length/40;i++)
				{
					j = Math.floor(Math.random()*data.length);
					ctx.fillRect(data[j].x - 300,data[j].y,1,1);
				}
	 }

const animate = () => {
			temp+=0.1;
			ctx.clearRect(0,0,w,h);
			requestAnimationFrame(animate);
			shinto(meta);
			
}
		
animate();
	
}

