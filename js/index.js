var chess = document.getElementById("chess");
var me = true;
var over = false;
var chessBoard=[];

for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}

if(chess.getContext){
	var context = chess.getContext("2d");

	context.strokeStyle = "#BFBFBF";

	var bgImg = new Image();
	bgImg.src = "images/bg.jpg";
	bgImg.onload = function (){
		context.drawImage(bgImg,0,0,450,450);
		drawChessBox();
	}

	var drawChessBox = function(){
		for(var i=0;i<15;i++){
			context.moveTo(15 + i*30,15);
			context.lineTo(15 + i*30,435);
			context.stroke();
			context.moveTo(15,15 + i*30);
			context.lineTo(435,15 + i*30);
			context.stroke();
		}
	}

	var drawArc = function (i,j,me){
		context.beginPath();
		context.arc(15+i*30,15+j*30,15,0,2*Math.PI,false);
		context.closePath();
		var gradient = context.createRadialGradient(15+i*30 +2,15+j*30-2,15,15+i*30+2,15+j*30-2,0);
		if(me){
			gradient.addColorStop(0,"#0A0A0A");
			gradient.addColorStop(1,"#636766");
		}else{
			gradient.addColorStop(0,"#D1D1D1");
			gradient.addColorStop(1,"#F9F9F9");
		}
		context.fillStyle= gradient;
		context.fill();
	}

	chess.onclick=function(e){
		if(over){
			return;
		}
		if(!me){
			return;
		}
		var e = e||window.event;
		// offsetX，offsetY，是相对于canvas的左上角的距离
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x/30);
		var j = Math.floor(y/30);
		if(chessBoard[i][j]==0){
			drawArc(i,j,me);
			chessBoard[i][j] = 1;

			for(var k=0;k<count;k++){
				if(wins[i][j][k]){
					myWin[k]++;
					computerWin[k] = 6;
					if(myWin[k] == 5){
						gameOver("You");
						over =  true;
					}
				}
			}
			if(!over){
				me = !me;
				computerAi();
			}
		}		
	}
}

var gameOver = function(who){
	var Over = document.getElementById('gameOver');
	Over.classList.add('show');
	Over.innerHTML =  who +" win !";
}