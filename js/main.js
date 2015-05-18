/**
 * @author nidhi
 */

window.onload = initialize;
window.onresize = documentResize;

var displayFrame;
var currentCurtaine; 
 
function initialize(){
	displayFrame = document.getElementById('displayFrame');
	setIframe();
	setBindings();
	updateImageChooser();
	setCurtain();
}

function setIframe(){
	displayFrame.width = document.body.clientWidth * 0.80;
	displayFrame.height = document.body.clientHeight * 0.70;
}

function setCurtain(curtainName){
	curtain = curtainName + '.png';
	displayFrame.src = "ext/curtainDemoThreejs/examples/webgl_animation_cloth.html?" + (curtain||'');
} 

function documentResize(){
	setIframe();
}

function populateImageChooser(brand, color){
	var patternChooser = document.getElementById('patternChooser');
	patternChooser.innerHTML = '';
	for(var i = 0; i < 4 ; i++){
		var image = document.createElement('img');
		image.className = 'imagePallete';
		image.src = 'ext/curtainDemoThreejs/examples/textures/patterns/' + brand + '_' + color + '_' + i + '.png';
		image.title =  brand + '_' + color + '_' + i;
		image.addEventListener('click', onImageClick, false);
		patternChooser.appendChild(image);
	}
}

function onImageClick(event){
	setCurtain(this.title);
}

function setBindings(){
	pallette = document.getElementsByClassName('pallette');
	for(var i = 0 ; i < pallette.length; i++){
		pallette[i].addEventListener('click', function(event){
			setColor(event);
			updateImageChooser();
		}, false);
	}
	
	$('#brandChooser').bind('change', updateImageChooser);
}

function setColor(event){
	$('.pallette').removeClass('active');
	$(event.target).addClass('active');
	updateImageChooser();
}

function updateImageChooser(event){
	var brand = document.getElementById('brandChooser').selectedOptions[0].value;
	var color = $('.active')[0].className.split(' ')[1];
	
	populateImageChooser(brand, color);
}