let canvas = document.getElementsByClassName("main")[0];
let w = canvas.width = document.getElementsByClassName('main')[0].clientWidth;
let h = canvas.height = document.getElementsByClassName('main')[0].clientHeight;
let ctx = canvas.getContext('2d');

let maxWidth = w*0.9; 
let font_arr = ["Khand","Rajdhani","Mukta","Rhodium Libre","Arya","Rozha One"];
let font_family = "Khand";


let string = "यहाँ दिखेगा ...";
let font_size = "50";

let draw = (s) => (f_s) => (f_f) => {
//	ctx.fillStyle = "";
	ctx.clearRect(0,0,w,h);
	ctx.fillStyle ="black";
	ctx.font = f_s +  "px " + f_f;
	wrapText(ctx, s, 10, parseInt(f_s)+10, maxWidth, parseInt(f_s));
	
//	ctx.fillText(s, parseInt(f_s) + 20, parseInt(f_s) + 20);
}

draw(string)(font_size)(font_family);

document.getElementById('kshetra').addEventListener('keyup', function() {
    string = document.getElementById('kshetra').innerText;
//	ctx.clearRect(0,0,w,h);
	draw(string)(font_size)(font_family);
	document.getElementsByClassName('effectChange')[0].innerHTML ="अंदाज़ फिर से";
    });

let showVal = (value) =>{
	font_size = value.toString();
	draw(string)(font_size)(font_family);
	document.getElementsByClassName('effectChange')[0].innerHTML ="अंदाज़ फिर से";
}
let ding = 0;
let shuffle = (ding) =>
{
	let x = Math.floor(Math.random()*font_arr.length*0.9);
	if(x==ding) ding+=1;
	else if(ding==font_arr.length-1) ding=0;
	else ding=x;
	
	font_family = font_arr[ding];
	
	draw(string)(font_size)(font_family);
	document.getElementsByClassName('fontChange')[0].innerHTML ="और फॉण्ट";
	document.getElementsByClassName('effectChange')[0].innerHTML ="अंदाज़ फिर से";
}


function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + ' ';
	  var metrics = context.measureText(testLine);
	  var testWidth = metrics.width;
	  if (testWidth > maxWidth && n > 0) {
		context.fillText(line, x, y);
		line = words[n] + ' ';
		y += lineHeight;
	  }
	  else {
		line = testLine;
	  }
	}
	context.fillText(line, x, y);
}



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

function create(){
	html2canvas((main),{backgroundColor:"null"}).then(function(canvas) {
		var link = document.createElement("a");
		document.body.appendChild(link);
		link.download = "html_image.png";
		link.href = canvas.toDataURL("image/png");
		link.target = '_blank';
		link.click();
	});   

}

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
	draw(string)(font_size)(font_family);
}


window.addEventListener('resize',redraw,false);

let effects =()=>{
	document.getElementsByClassName('effectChange')[0].innerHTML ="और अंदाज़";
	twoColors();
}






