/*
* LGraphics.js
**/
function LGraphics(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LGraphics";
	s.color = "#000";
	s.i = 0;
	s.alpha = 1;
	s.bitmap = null;
	s.setList = new Array();
	s.showList = new Array();
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this,k=null;
		if(s.setList.length == 0)return;
		for(k in s.setList){
			s.setList[k](cood);
		}
	},
	lineWidth:function (t){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineWidth = t;});
	},
	strokeStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.strokeStyle = co;});
	},
	stroke:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.moveTo(x,y);});
	},
	lineTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineTo(x,y);});
	},
	clear:function (){
		var s = this;
		s.bitmap = null;
		s.setList.splice(0,s.setList.length);
		s.showList.splice(0,s.showList.length);
	},
	rect:function (x,y,w,h){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.rect(x, y, w, h);});
		s.showList.push({type:"rect",value:[x,y,w,h]});
	},
	fillStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fillStyle = co;});
	},
	fill:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,r,sa,ea,aw){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.arc(x,y,r,sa,ea,aw);});
	},
	beginBitmapFill:function(b){
		var s = this;
		s.setList.push(function(cood){
			s.bitmap=b;
		});
	},
	drawArc:function(tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y;
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			c.beginPath();
			c.arc(pa[0]+cx,pa[1]+cy,pa[2],pa[3],pa[4],pa[5]);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						cx,cy,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
			if(s.save)c.restore();
		});
		s.showList.push({type:"arc",value:pa});
	},
	drawRect:function (tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.rect((pa[0]+cx),(pa[1]+cy),pa[2],pa[3]);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						cx,cy,
						s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawRoundRect:function(tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(pa[0]+cx+pa[4],pa[1]+cy);
			c.lineTo(pa[0]+cx+pa[2]-pa[4],pa[1]+cy);
			c.arcTo(pa[0]+cx+pa[2],pa[1]+cy,pa[0]+cx+pa[2],pa[1]+cy+pa[4],pa[4]);
			c.lineTo(pa[0]+cx+pa[2],pa[1]+cy+pa[3]-pa[4]);
			c.arcTo(pa[0]+cx+pa[2],pa[1]+cy+pa[3],pa[0]+cx+pa[2]-pa[4],pa[1]+cy+pa[3],pa[4]);
			c.lineTo(pa[0]+cx+pa[4],pa[1]+cy+pa[3]);
			c.arcTo(pa[0]+cx,pa[1]+cy+pa[3],pa[0]+cx,pa[1]+cy+pa[3]-pa[4],pa[4]);
			c.lineTo(pa[0]+cx,pa[1]+cy+pa[4]);
			c.arcTo(pa[0]+cx,pa[1]+cy,pa[0]+cx+pa[4],pa[1]+cy,pa[4]);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						cx,cy,
						s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawVertices:function(tn,lco,v,isf,co){
		var s = this,c=LGlobal.canvas;
		if(v.length < 3)return;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(v[0][0]+cx,v[0][1]+cy);
			var i,l = v.length;
			for(i=1;i<l;i++){
				var pa = v[i];
				c.lineTo(pa[0]+cx,pa[1]+cy);
			};
			c.lineTo(v[0][0]+cx,v[0][1]+cy);
			if(s.bitmap){
				if(!s.save)c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						cx,cy,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			}
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"vertices",value:v});
	},
	drawTriangles:function(ve, ind, u ,tn,lco){
		var s = this;
		var i,j,l = ind.length,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y,v;
			if(cood.scaleX != 1 || cood.scaleY != 1){
				v = [];
				for(i=0;i<ve.length;i+=2){
					v[i] = ve[i]*cood.scaleX;
					v[i+1] = ve[i+1]*cood.scaleY;
				}
			}else{
				v = ve;
			}
			for(i=0,j=0;i<l;i+=3){
				a=0;
				c.save();
				if(cood.alpha < 1)c.globalAlpha = cood.alpha;
				c.beginPath();
				c.moveTo(v[ind[i]*2]+cx*cood.scaleX,v[ind[i]*2+1]+cy*cood.scaleY);
				c.lineTo(v[ind[i+1]*2]+cx*cood.scaleX,v[ind[i+1]*2+1]+cy*cood.scaleY);
				c.lineTo(v[ind[i+2]*2]+cx*cood.scaleX,v[ind[i+2]*2+1]+cy*cood.scaleY);
				c.lineTo(v[ind[i]*2]+cx*cood.scaleX,v[ind[i]*2+1]+cy*cood.scaleY);
				c.closePath();
				if(tn){
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
				c.clip();
				if(i%6==0){
					var sw = -1;
					var w = (u[ind[i+1 + j]*2]-u[ind[i + j]*2])*s.bitmap.width;
					var h = (u[ind[i+2]*2+1]-u[ind[i]*2+1])*s.bitmap.height;
					if(j==0 && w < 0){
						for(var k=i+9;k<l;k+=3){
							if(u[ind[i+2]*2+1] == u[ind[k+2]*2+1]){
								j = k - i;
								break;
							}
						}
						if(j==0)j=(l-i);
						w = (u[ind[i+1 + j]*2]-u[ind[i + j]*2])*s.bitmap.width;
					}
					if(i + j >= l){
						w = (u[ind[i + j - l]*2]-u[ind[i+1]*2])*s.bitmap.width;
						sw = u[ind[i]*2]==1?0:s.bitmap.width*u[ind[i]*2]+w;
						if(sw > s.bitmap.width)sw -= s.bitmap.width;
					}else{
						sw = s.bitmap.width*u[ind[i + j]*2];
					}
					sh = s.bitmap.height*u[ind[i]*2+1];
					if(h < 0){
						h = (u[ind[i+2 - (i > 0?6:-6)]*2+1]-u[ind[i - (i > 0?6:-6)]*2+1])*s.bitmap.height;
						sh = 0;
					}
					var t1 = (v[ind[i+1]*2]-v[ind[i]*2])/w;
					var t2 = (v[ind[i+1]*2+1]-v[ind[i]*2+1])/w;
					var t3 = (v[ind[i+2]*2]-v[ind[i]*2])/h;
					var t4 = (v[ind[i+2]*2+1]-v[ind[i]*2+1])/h;
					c.setTransform(t1,t2,t3,t4, v[ind[i]*2]+cx*cood.scaleX, v[ind[i]*2+1]+cy*cood.scaleY);
					c.drawImage(s.bitmap.image,
								s.bitmap.x+sw,
								s.bitmap.y+sh,
								w,h,
								0,0,
								w,h);
				}else{
					var sw;
					var w = (u[ind[i+2 + j]*2]-u[ind[i+1 + j]*2])*s.bitmap.width;
					var h = (u[ind[i+2]*2+1]-u[ind[i]*2+1])*s.bitmap.height;
					if(j==0 && w < 0){
						for(var k=i+9;k<l;k+=3){
							if(u[ind[i+2]*2+1] == u[ind[k+2]*2+1]){
								j = k - i;
								break;
							}
						}
						if(j==0)j=(l-i);
						w = (u[ind[i+2 + j]*2]-u[ind[i+1 + j]*2])*s.bitmap.width;
					}
					if(i+1 + j >= l){
						w = (u[ind[i+1 + j - l]*2]-u[ind[i+2]*2])*s.bitmap.width;
						sw = u[ind[i+1]*2]==1?0:s.bitmap.width*u[ind[i+1]*2]+w;
						if(sw > s.bitmap.width)sw -= s.bitmap.width;
					}else{
						sw = s.bitmap.width*u[ind[i+1 + j]*2];
					}
					sh = s.bitmap.height*u[ind[i]*2+1];
					if(h < 0){
						h = (u[ind[i+2 - (i > 0?6:-6)]*2+1]-u[ind[i - (i > 0?6:-6)]*2+1])*s.bitmap.height;
						sh = 0;
					}
					var t1 = (v[ind[i+2]*2]-v[ind[i+1]*2])/w;
					var t2 = (v[ind[i+2]*2+1]-v[ind[i+1]*2+1])/w;
					var t3 = (v[ind[i+2]*2]-v[ind[i]*2])/h;
					var t4 = (v[ind[i+2]*2+1]-v[ind[i]*2+1])/h;
					c.setTransform(t1,t2,t3,t4, v[ind[i+1]*2]+cx*cood.scaleX, v[ind[i+1]*2+1]+cy*cood.scaleY);
					c.drawImage(s.bitmap.image,
							s.bitmap.x+sw,
							s.bitmap.y+sh,
							w,h,
							0,-h,
							w,h);
				}
				c.restore();
			}
		});
	},
	drawLine:function (tn,lco,pa){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(pa[0]+cx,pa[1]+cy);
			c.lineTo(pa[2]+cx,pa[3]+cy);
			c.lineWidth = tn;
			c.strokeStyle = lco;
			c.closePath();
			c.stroke();
		});
	},
	lineStyle:function (tn,co,a){
		var s = this,c=LGlobal.canvas;
		if(color==null)co=s.color;
		if(alpha==null)a=s.alpha;
		s.color = co;
		s.alpha = a;
		s.setList.push(function(){
			c.lineWidth = tn;
			c.strokeStyle = co;
		});
	},
	add:function (f){
		this.setList.push(f);
	},
	ismouseon:function(e,co){
		var s = this;
		var k = null;
		if(e==null || e == UNDEFINED)return false;
		if(co==null)co={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(ox >= s.showList[k].value[0] + co.x && ox <= s.showList[k].value[0] + co.x + s.showList[k].value[2] && 
					oy >= s.showList[k].value[1] + co.y && oy <= s.showList[k].value[1] + co.y + s.showList[k].value[3]){
					return true;
				}
			}else if(s.showList[k].type == "arc"){
				var xl = s.showList[k].value[0] + co.x - ox;
				var yl = s.showList[k].value[1] + co.y - oy;
				return xl*xl+yl*yl <= s.showList[k].value[2]*s.showList[k].value[2];
			}
		}		
		return false;
	},
	getWidth:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[0])min = s.showList[k].value[0];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[0] - s.showList[k].value[2])min = s.showList[k].value[0] - s.showList[k].value[2];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[0])min = v[0];
					if(max < v[0])max = v[0];
				}
			}
		}		
		return max - min;
	},
	getHeight:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[1])min = s.showList[k].value[1];
				if(max < s.showList[k].value[1] + s.showList[k].value[3])max = s.showList[k].value[1] + s.showList[k].value[3];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[1] - s.showList[k].value[2])min = s.showList[k].value[1] - s.showList[k].value[2];
				if(max < s.showList[k].value[1] + s.showList[k].value[2])max = s.showList[k].value[1] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[1])min = v[1];
					if(max < v[1])max = v[1];
				}
			}
		}		
		return max - min;
	},
	startX:function(){
		var s=this;
		var k = null,k1=null;
		var v = 0,ve;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(v > s.showList[k].value[0])v = s.showList[k].value[0];
			}else if(s.showList[k].type == "arc"){
				if(v > s.showList[k].value[0] - s.showList[k].value[2])v = s.showList[k].value[0] - s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					ve = s.showList[k].value[k1];
					if(v > ve[0])v = ve[0];
				}
			}
		}		
		return v;
	},
	startY:function(){
		var s=this;
		var k = null,k1=null;
		var v = 0,ve;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(v > s.showList[k].value[1])v = s.showList[k].value[1];
			}else if(s.showList[k].type == "arc"){
				if(v > s.showList[k].value[1] - s.showList[k].value[2])v = s.showList[k].value[1] - s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					ve = s.showList[k].value[k1];
					if(v > ve[1])v = ve[1];
				}
			}
		}		
		return v;
	}
};
for(var k in p)LGraphics.prototype[k]=p[k];