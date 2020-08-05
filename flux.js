var cv,ctx,w,h,points,cx,cy
 
var BG_COLOR ='#000000';
var LINE_COLOR='255,255,255';
var distance_threshold=100;
var FPS=120;
var points=[];

function createCanvas(){
	cv=document.getElementById('flux');
	cv.width=document.body.clientWidth;
	cv.height=window.innerHeight;

	if(cv.getContext){
		ctx=cv.getContext('2d');
		w=cv.width;
		h=cv.height;
		cx=w/2;
		cy=h/2;
		ctx.lineWidth=1;
	}	else alert('This browser doesn\'t support canvas'); 
}

 
function random(min,max){
	return Math.random()*(max-min)+min;
}

function genPoints(n,speed){
	var pointrs=[];
	for(var i=0;i<n;i++){
		var point={
			x:Math.random()*w,
			y:Math.random()*h,
			vx: random(-speed,speed),
			vy:random(-speed,speed)
		}
		pointrs.push(point);
	}
	return pointrs;
}

function clearCanvas(){
	ctx.fillStyle=BG_COLOR;
	ctx.clearRect(0,0,w,h);
} 

function drawCircle(x,y,r,color){
	ctx.fillStyle='rgba('+color+',1'+')';
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function drawLine(x1,y1,x2,y2,color,opacity){
	ctx.strokeStyle='rgba('+color+','+opacity+')'
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.closePath();
	ctx.stroke();
}

function opacityBlob(x,y){
	
}

function distance(point1,point2){
	return Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.y-point2.y)*(point1.y-point2.y));
}

function movePoint(point){
	if(point.x>w||point.x<0) point.vx*=-1;
	if(point.y>h||point.y<0) point.vy*=-1;
	point.x=  Math.round(point.x + point.vx);
	point.y=  Math.round(point.y + point.vy);
}

function render(){
	clearCanvas();
	var l=points.length;
	for (var i=0;i<l;i++){
		for(var j=i;j<l;j++){
			var point1=points[i];
			var point2=points[j];
			var d=distance(point1,point2);
			if(d<distance_threshold){
				drawLine(point1.x,point1.y,point2.x,point2.y,LINE_COLOR,(distance_threshold-d)/distance_threshold);
			}
		}
		drawCircle(points[i].x,points[i].y,2,LINE_COLOR);
	}

	for(var i=0;i<l;i++){
		movePoint(points[i]);
	}
	requestAnimationFrame(render,1000/FPS);
}

function start(){
	createCanvas();
	points=genPoints(400,2);
	render();
}