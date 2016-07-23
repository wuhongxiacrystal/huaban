/*
cobj绘制对象 2d
canvas对象*/

function palette(cobj,canvas,copy){
  this.o=cobj;
  this.canvas=canvas;
  this.copy=copy;
  this.width=canvas.width;
  this.height=canvas.height;
  this.style='fill';
  this.type='triang';
  //line rect cilcle triangle pencil
  this.lineWidth=1;
  this.strokeStyle="#000000";
  this.fillStyle="#000000";
  this.status=[];
  this.bunm=5;
  this.jnum=5;
// 1.截图 上次绘制结果 鼠标抬起 getImageData()
// 填充最后一次截图 (鼠标移动) 
}
// 
palette.prototype.draw= function() {
          var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.init();
		document.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
			that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height)
				}
			
			that[that.type](mx,my,dx,dy)
          
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height))
			document.onmousemove=null;
			document.onmouseup=null;
		}

	}
	
};
// 直线
palette.prototype.line=function(x1,y1,x2,y2) {
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
	}
// 矩形
palette.prototype.rect=function(x1,y1,x2,y2) {
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
	this.o.rect(x1-0.5,y1-0.5,w,h)
	this.o.closePath();
	this.o[this.style]()

}
// 圆
palette.prototype.circle=function(x1,y1,x2,y2) {
	var w=x2-x1;
  var h=y2-y1;
  var r=Math.sqrt(Math.pow(w,2)+Math.pow(h,2)) 
  this.o.beginPath();
  // this.o.moveTo(x1,y1);
  this.o.arc(x1,y1,r,0,Math.PI*2);
  this.o.closePath();
  this.o[this.style]();
}
// 直角三角形
palette.prototype.triangle=function(x1,y1,x2,y2) {
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();
}
// 三角形
palette.prototype.triang=function(x1,y1,x2,y2) {
	var w=x2-x1;
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1-w,y2);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();
}
// 画笔
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.lineTo(mx,my)
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.o.closePath();
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
// 定义颜色
palette.prototype.init=function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=this.lineWidth;

}
//橡皮擦
palette.prototype.clear=function(){
	var that=this;
	var w=30;
	this.copy.onmousedown=function(e){
             var dx=e.offsetX;
			var dy=e.offsetY;
			var a=document.createElement("div");
			a.style.cssText="width:"+w+"px;height:"+w+"px;border:1px solid red;	position: absolute";

		document.onmousemove=function(e){
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.clearRect(mx-w/2,my-w/2,w,w);
			a.style.left=mx-w/2+"px";
			a.style.top=my-w/2+"px";
			that.copy.parentNode.appendChild(a);
		}
		document.onmouseup=function(){
			that.copy.parentNode.removeChild(a);
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
// var ang=360/5;
// sin=a/c;
// cosa=b/c;
// a=Math.sin(ang*)
//多边形
palette.prototype.poly=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	var r=Math.sqrt(Math.pow(w,2)+Math.pow(h,2)) 
	var n=this.bunm
	var ang=360/this.bunm;
	this.o.beginPath();
	for (var i = 0; i < n; i++) {
		this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(Math.PI/180*ang*i)*r);
	};
	
	this.o.closePath();
	this.o[this.style]();

}
// 星星
palette.prototype.polystar=function(x1,y1,x2,y2){
	this.init();
	var w=x2-x1;
	var h=y2-y1;
	var r=Math.sqrt(Math.pow(w,2)+Math.pow(h,2)) 
	var r1=r*0.35;
	var ang=360/this.jnum/2;
	var n=this.jnum*2;
	this.o.beginPath();
	for (var i = 0; i < n; i++) {
		if(i%2==0){
          this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(Math.PI/180*ang*i)*r);
		}else{
        this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r1,y1+Math.sin(Math.PI/180*ang*i)*r1);
		}
	};
	this.o.closePath();
	this.o[this.style]();
}