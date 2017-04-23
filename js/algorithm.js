// 赢法数组
var wins =[];

for(var i=0;i<15;i++){
	wins[i] =[];
	for(var j=0;j<15;j++){
		wins[i][j]=[];
	}
}

//赢法种类的一个索引
var count = 0;

//统计所有横线上的赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		//第0种赢法
		//wins[0][0][0] = true;
		//wins[0][1][0] = true;
		//wins[0][1][0] = true;
		//wins[0][1][0] = true;
		//wins[0][1][0] = true;
		
		
		//第1种赢法
		//wins[0][1][1] = true;
		//wins[0][2][1] = true;
		//wins[0][3][1] = true;
		//wins[0][4][1] = true;
		//wins[0][5][1] = true;
		
		//。。。
		for(var k=0;k<5;k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

//统计所有竖线上的赢法
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

//统计所有斜线上的赢法
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}

//统计所有反斜线上的赢法
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
// 定义赢法的统计数组
var myWin=[];
var computerWin=[];
for(var i=0; i<count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}
var computerAi = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u=0,v=0;//最高分数的坐标

	for(var i=0;i<15;i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j=0;j<15;j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]==0){
				for(var k = 0;k<count;k++){
					if(wins[i][j][k]){
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
							// 电脑分数
						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScore[i][j] += 2200;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j]>max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] >　computerScore[u][v]){
						u = i;
						v = j;
					}
				}

				if(computerScore[i][j]>max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] >myScore[u][v]){
						u = i;
						v = j;
					}
				}
				//此时的u，v的点是电脑和人分数值最高的点，电脑就要在这里落子。
			}
		}
	}
	drawArc(u,v,false);
	chessBoard[u][v]=2;
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				gameOver("Compture");
				over =  true;
			}
		}	
	}
	if(!over){
		me = !me;
	}
}


