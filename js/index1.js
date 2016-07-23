$(function(){
	var canvas=null;
	var copy=null;
	var parent=$('.palette-box');
	var as=$('.list>li>a');
	var pen=$('.pencil');
	var reset=$('.back');
	var color=$('input[type=color]');
	console.log(color);
	$('.add').click(function(){
		var w=prompt('width:',500);
		var h=prompt('height:',500);
		canvas=$('<canvas>').attr({width:w,height:h});
		copy=$('<div>').css({width:w,height:h,position:'absolute',left:0,top:0,zIndex:999});
		parent.css({width:w,height:h}).append(canvas).append(copy);
		create();
	})
	// function pat(){
	// 	var pat=new palette()
	// }
	function create(){
		var cobj=canvas[0].getContext('2d');
		var pat=new palette(cobj,canvas[0],copy[0]);
		console.log(pat);
		pat.draw();
		as.click(function(){
			var attr=$(this).attr('role');
		    if(attr!=undefined){
		    	if(attr=='pencil'){
		    		pat.type=attr;
		    		pat.pencil();
		    	}else if(attr="poly"){
		    		
		    	}
		    }

		})
		reset.click(function(){
			if(pat.status.length>1){
				pat.status.pop();
				pat.o.putImageData(pat.status[pat.status.length-1],0,0,0,0,pat.width,pat.height);
			}else if(pat.status.length==1){
				pat.status.pop();
				pat.o.clearRect(0,0,pat.width,pat.height);
			}else{
				alert("不能再撤销了！");
			}
		})
		
	   }
})