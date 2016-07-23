$(function(){
	var canvas=null;
	var copy=null;
	var parent=$('.palette-box');
	var as=$('.left li>a');
	var pen=$('.pencil');
	var reset=$('.back');
	var color=$('input[type=color]');
	console.log(as);
	$('.add').click(function(){
		var w=prompt('width:',500);
		var h=prompt('height:',500);
		canvas=$('<canvas>').attr({width:w,height:h});
		copy=$('<div>').css({width:w,height:h,position:'absolute',left:0,top:0,zIndex:999});
		parent.css({width:w,height:h,background:'#fff'}).append(canvas).append(copy);
		create();
	})
	$('.save').click(function(){
		var a=canvas[0].toDataURL();
		location.href=a.replace('image/png','image/octet-stream');
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
		    if(attr==undefined){
		    	return;
		    }
		    	if(attr=='pencil'){
		    		pat.type=attr;
		    		pat.pencil();
		    	}
		    	if(attr=='eraser'){
		    		pat.type=attr;
		    		pat.eraser();
		    	}
		        if(attr=='poly'||attr=="polystar"){
		    	     pat.num=prompt("请输入边数",5)||5;
		    		 pat.type=attr;
		    	 }else if(attr=="fill"||attr=="stroke"){
		    		pat.style=attr;
		    	 }else if(attr=="fillStyle"){
                  $(this).find("input").change(function(){
                 	pat.fillStyle=this.value;
                 })
				}else if(attr=="strokeStyle"){
           	      $(this).find("input").change(function(){
           	      	pat.strokeStyle=this.value;
           	      })
				}else if(attr=='num'){
		    	  	$(this).find('input').change(function(){
		    	  		pat.lineWidth=this.value;
		    	  	})
		    	}else{
		    	  	 pat.type=attr;
		    	  	
		    	}
		    	  pat.draw();

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