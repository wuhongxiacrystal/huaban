/*
cobj绘画对象
canvas 标签
*/ 
function palette(cobj,canvas,copy){
	this.o=cobj;
	this.copy=copy;
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke";
	this.type="line";
	// this.type="rect";
	// this.type="circle";
	// this.type="triangle";
	// this.type="doltriangle";
	// this.type="poly";
	// this.type="_r";
	// this.type="polystar";
	this.lineWidth=1;
	this.strokeStyle="#000";
	this.fillStyle="#000";
	this.num=5;
	// this.bnum=5;
	// this.jnum=5;
	this.status=[];
}
// 颜色
palette.prototype.init=function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=this.lineWidth;
}

//画板
palette.prototype.draw=function(){
	
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		that.init();
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
			}
			var mx=e.offsetX;
			var my=e.offsetY;
			that[that.type](dx,dy,mx,my);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}

//铅笔
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(){
		that.o.beginPath();
		that.init();
		document.onmousemove=function(e){
		  
		  var mx=e.offsetX;
		  var my=e.offsetY;
		  that.o.lineTo(mx,my);
		  that.o.stroke();
	    }
	    document.onmouseup=function(){
	    	that.status.push(that.o.getImageData(0,0,that.width,that.height));
	    	that.o.closePath();
	    	document.onmousemove=null;
	    	document.onmouseup=null;
	    }
	}
	

}
//直线
palette.prototype.line=function(x1,y1,x2,y2){
	
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}

//矩形
palette.prototype.rect=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
    this.o.rect(x1-0.5,y1-0.5,w,h);
    this.o.closePath();
    this.o[this.style]();
}
//圆
palette.prototype.circle=function(x1,y1,x2,y2){
	var xr=x2-x1;
	var xh=y2-y1;
	var r=Math.sqrt(Math.pow(xr,2)+Math.pow(xh,2));
	this.o.beginPath();
    this.o.arc(x1-0.5,y1-0.5,r,0,Math.PI*2);
    this.o.closePath();
    this.o[this.style]();
}

// 直角三角形
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
    this.o.lineTo(x1,y1);
    this.o.lineTo(x1,y2);
    this.o.lineTo(x2,y2);
    this.o.closePath();
    this.o[this.style]();
}


//三角形
palette.prototype.doltriangle=function(x1,y1,x2,y2){
	this.o.beginPath();
    this.o.lineTo(x1,y1);
    this.o.lineTo((x2-x1),y2);
    this.o.lineTo(x2,y2);
    this.o.closePath();
    this.o[this.style]();
}
 // 多边形
 /*var ang=360/5
sin=a/c;
cos=b/c;
a=Math.sin(ang*Math.PI)*r
b=Math.cos(ang*Math.PI)*r
*/


palette.prototype.poly=function(x1,y1,x2,y2){
	var xr=x2-x1;
    var xh=y2-y1;
    var r=Math.sqrt(Math.pow(xr,2)+Math.pow(xh,2));
	var n=this.num;
	var ang=360/this.num;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r);
	}
	this.o.closePath();
	this.o[this.style]();
}

palette.prototype._r=function(x1,y1,x2,y2){
	var xr=x2-x1;
	var xh=y2-y1;
	var r=Math.sqrt(Math.pow(xr,2)+Math.pow(xh,2));
	return r;
}

//五角星
palette.prototype.polystar=function(x1,y1,x2,y2){
	// var xr=x2-x1;
	// var xh=y2-y1;
	// var r=Math.sqrt(Math.pow(xr,2)+Math.pow(xh,2));
	var r=this._r(x1,y1,x2,y2);
    var r1=r*0.3;
	var n=this.num*2;
	var ang=360/this.num/2;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		if(i%2==0){	
			this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r);
		}else{
			this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r1,y1+Math.sin(ang*Math.PI/180*i)*r1);
		}
	}
	this.o.closePath();
	this.o[this.style]();
}
//橡皮擦
palette.prototype.eraser=function(){
	var w=30;
	var that=this;
	this.copy.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		var a=document.createElement("div");
		a.style.cssText="width:"+w+"px;height:"+w+"px;position:absolute;border:1px solid red";

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



