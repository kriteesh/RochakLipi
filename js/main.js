// get canvas related references
let canvas = document.getElementsByClassName("main")[0];
let w = canvas.width = document.getElementsByClassName('main')[0].clientWidth;
let h = canvas.height = document.getElementsByClassName('main')[0].clientHeight;
let ctx = canvas.getContext("2d");
let BB = canvas.getBoundingClientRect();
let offsetX=BB.left;
let offsetY=BB.top;
var maxWidth = w;


let dragok = false;
let startX;
let startY;

let stuff = {x:100,y:100, string: "यहाँ दिखेगा...",family:"Khand",size:100,color:"#444444",isDragging:false};


// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

draw();


function wrapText(context, text, x, y, maxWidth, lineHeight, f_s, f_f) {
	var words = text.split(' ');
	var line = '';

	for(var i = 0; i < words.length; i++) {
	  var testLine = line + words[i] + ' ';
		context.font = f_s + "px " + f_f ;
	  var metrics = context.measureText(testLine);
	  var testWidth = metrics.width;
	  if (testWidth > maxWidth - stuff.x && i > 0) {
		context.fillText(line, x, y);
		line = words[i] + ' ';
		y += lineHeight;
	  }
	  else {
		line = testLine;
	  }
	}
	context.fillText(line, x, y);
}


function draw() {
 	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = stuff.color;
	ctx.font = stuff.size +  "px " + stuff.family;
	wrapText(ctx, stuff.string, stuff.x, stuff.y, maxWidth, parseInt(stuff.size), stuff.size, stuff.family);
}


function myDown(e){
	
  e.preventDefault();
  e.stopPropagation();

  var mx=parseInt(e.clientX-offsetX);
  var my=parseInt(e.clientY-offsetY);
 
  dragok=false;
	  
	if(mx > 0 && mx < w &&  my > 0 && my < h )
	  {
		 dragok=true;
         stuff.isDragging=true;  
	  }
  
  startX=mx;
  startY=my;
}


function myUp(e){
 
  e.preventDefault();
  e.stopPropagation();

  dragok = false;
  stuff.isDragging=false;
}

function myMove(e){

  if (dragok){
    e.preventDefault();
    e.stopPropagation();

    var mx=parseInt(e.clientX-offsetX);
    var my=parseInt(e.clientY-offsetY);

    var dx=mx-startX;
    var dy=my-startY;
	  
	  if(stuff.isDragging){
        stuff.x+=dx;
        stuff.y+=dy;
      }
	  
    draw();
    startX=mx;
    startY=my;

  }
}

document.getElementById('kshetra').addEventListener('keyup', function() {
    string = document.getElementById('kshetra').innerText;
	stuff.string = string;
	draw();
    });

google.load("elements", "1", {
	packages: "transliteration"
});
function onLoad() {
	var options = {
		sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
		destinationLanguage: [google.elements.transliteration.LanguageCode.HINDI],
		shortcutKey: 'ctrl+g',
		transliterationEnabled: true
	};
	var control =
		new google.elements.transliteration.TransliterationControl(options);
	control.makeTransliteratable(['kshetra']);
}
google.setOnLoadCallback(onLoad);


let showVal = (value) =>{
	stuff.size = value;
	console.log(w);
	draw();
}

document.getElementById("rang").addEventListener("input", function() {
	stuff.color = document.getElementById("rang").value;
    draw()
}, false); 

let mirror = document.getElementById('mirror');

mirror.addEventListener('contextmenu', function (e) {
    let dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});

let png = document.getElementById('png-download');
png.addEventListener('click', function (e) {
    let dataURL = canvas.toDataURL('image/png');
    png.href = dataURL;
});

let redraw = () => {
	w = canvas.width = document.getElementsByClassName('main')[0].clientWidth;
	h = canvas.height = document.getElementsByClassName('main')[0].clientHeight;
	draw();
}


window.addEventListener('resize',redraw,false);


if(window.innerWidth<1000)
	{
		let khair = ["font","effect","color"];
		khair.map(x=>{let p = document.getElementsByClassName(x + "Change")[0].innerText;
		p = p.split(" ");
		document.getElementsByClassName(x + "Change")[0].innerText = p[0];})
		
		document.getElementsByClassName("sizeChange")[0].innerHTML = "</span><input type='range' min='50' max='200' value='70' class='slider' id='myRange' oninput='showVal(this.value)'>";
		
		$(".slider").css("bottom","-2vh");
		$(".slider").css("width","80%");
			
		document.getElementsByClassName('footer')[0].innerText ="स्नैपशॉट";
	}

document.getElementById("bgRang").addEventListener("input", function() {
	let bgcolor = document.getElementById("bgRang").value;
	console.log(bgcolor);
	$('body').css("background",bgcolor);
    
}, false);

let fontChange = document.getElementsByClassName('fontChange')[0];
let fontMenu = document.createElement('button');
fontMenu.className = "fontMenu";
let font_arr = ["Khand","Rajdhani","Mukta","Rhodium Libre","Arya","Rozha One"];

font_arr.map(x=>{let p = document.createElement('a'); p.value = x; p.innerHTML = x ; p.addEventListener("click",function(){stuff.family = x; draw(); console.log(x,p.value);}); fontMenu.append(p);} );

fontChange.append(fontMenu);

$('.button').addClass('animated bounceInLeft');
$('.topka').addClass('animated bounceInDown');
$('.content').addClass('animated shake');