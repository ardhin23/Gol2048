/* -----------------------------------------------------------

----------------------------------------------------------- */
function cell(yPos, xPos, state, level) {
	this.yPos = yPos;
	this.xPos = xPos;
	this.state = state;
	var nextState;
	this.level = level;
	var nextLevel;
	
	
	this.getYPos = function() {
		return this.yPos;
	}
	this.getXPos = function() {
		return this.xPos;
	}
	this.getState = function() {
		return this.state;
	}
	this.getNextState = function() {
		return this.nextState;
	}
	this.getLevel = function() {
		return this.level;
	}
	this.getNextLevel = function() {
		return this.nextLevel;
	}
	
	/*
	this.setYPos = function(yPos) {
		this.yPos = yPos;
	}
	*/
	/*
	this.setXPos = function(xPos) {
		this.xPos = xPos;
	
	*/
	this.setState = function(state) {
		this.state = state;
	}
	this.setNextState = function(nextState) {
		this.nextState = nextState;
	}
	this.setLevel = function(level) {
		this.level = level;
	}
	this.setNextLevel = function(nextLevel) {
		this.nextLevel = nextLevel;
	}
	
	
	this.isAlive = function() {
		if (this.state == 1) {
			return true;
		}
		else {
			return false;
		}
	}
	
	this.setNextAlive = function () {
		this.setNextState(1);
		if (this.isAlive()) {
			this.setNextLevel(this.getLevel());
		}
		else {
			this.setNextLevel(1);
		}
		
	}
	this.setNextDead = function() {
		this.setNextState(0);
		this.setNextLevel(0);
	}
}

function boardOfLife(width, height) {

	// --------------------- Main Variables
	this.width = width;
	this.height = height;
	
	// --------------------- Regular GETter
	this.getWidth = function() {
		return this.width; 
	}
	this.getHeight = function() {
		return this.height;
	}

	// --------------------- Regular SETter
	this.setWidth = function(width) {
		this.width = width;
	}
	this.setHeight = function(height) {
		this.width = height;
	}

	// --------------------- Cell Variables and Initializations
	this.cellCoordinates = new Array(this.getHeight());
	for (var i = 0; i < this.getHeight(); i++) {
		this.cellCoordinates[i] = new Array(this.getWidth())
	}
	
	// --------------------- Cell Functions
	this.getCellCoordinateState = function(yPos, xPos) {
		return this.cellCoordinates[yPos][xPos].getState();
	}
	this.getCellCoordinateNextState = function(yPos, xPos) {
		return this.cellCoordinates[yPos][xPos].getNextState();
	}
	this.getCellCoordinateLevel = function(yPos, xPos)  {
		return this.cellCoordinates[yPos][xPos].getLevel();
	}
	this.getCellCoordinateNextLevel = function(yPos, xPos)  {
		return this.cellCoordinates[yPos][xPos].getNextLevel();
	}
	this.setCellCoordinateState = function(yPos, xPos, state) {
		this.cellCoordinates[yPos][xPos].setState(state);
	}
	this.setCellCoordinateNextState = function(yPos, xPos, nextState) {
		this.cellCoordinates[yPos][xPos].setNextState(nextState);
	}
	this.setCellCoordinateLevel = function(yPos, xPos, level) {
		this.cellCoordinates[yPos][xPos].setLevel(level);
	}
	this.setCellCoordinateNextLevel = function(yPos, xPos, nextLevel) {
		this.cellCoordinates[yPos][xPos].setNextLevel(nextLevel);
	}
	this.setCellCoordinateComplete = function(yPos, xPos, state, level) {
		this.cellCoordinates[yPos][xPos].setState(state);
		this.cellCoordinates[yPos][xPos].setLevel(level);
	}
	this.getTopWallPosition = function() {
		return 0;
	}
	this.getBottomWallPosition = function() {
		return (this.getHeight() -  1);
	}
	this.getLeftMostWallPosition = function() {
		return 0;
	}
	this.getRightMostWallPosition = function() {
		return (this.getWidth() - 1);
	}
	
	this.initCellCoordinates = function () {
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				this.cellCoordinates[i][j] = new cell(i, j, 0, 0);	
			}
		}

		

	}
	this.initialType1 = function() {
		this.setCellCoordinateComplete(4,4,1,1);
		this.setCellCoordinateComplete(4,5,1,1);
		this.setCellCoordinateComplete(5,4,1,1);
		this.setCellCoordinateComplete(5,5,1,1);
	}
	this.initialType2 = function() {
		this.setCellCoordinateComplete(4,4,1,1);
		this.setCellCoordinateComplete(4,5,1,1);
		this.setCellCoordinateComplete(4,6,1,1);
	}
	this.initialType3 = function() {
		this.setCellCoordinateComplete(2,4,1,1);
		this.setCellCoordinateComplete(2,3,1,1);
		this.setCellCoordinateComplete(2,2,1,1);
		this.setCellCoordinateComplete(2,1,1,1);
		
		
		this.setCellCoordinateComplete(4,4,1,1);
		this.setCellCoordinateComplete(3,3,1,1);
		this.setCellCoordinateComplete(2,2,1,1);
		this.setCellCoordinateComplete(1,1,1,1);
		
		this.setCellCoordinateComplete(6,4,1,1);
		this.setCellCoordinateComplete(6,3,1,1);
		this.setCellCoordinateComplete(6,2,1,1);
		this.setCellCoordinateComplete(6,1,1,1);
	}
	
	
	
	
	
	
	this.calculateCellFriends = function(cellYPos, cellXPos) {
		var friends = 0;
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				if (((cellYPos == this.getTopWallPosition()) && (i == -1)) || ((cellYPos == this.getBottomWallPosition()) && (i == 1))) {
					y = 99;
				}
				else {
					y = i;
				}
				
				if (((cellXPos == this.getLeftMostWallPosition()) && (j == -1)) || ((cellXPos == this.getRightMostWallPosition()) && (j == 1))) {
					x = 99;
				}
				else {
					x = j;
				}
				
				if (((x == 0) && (y == 0)) || (x == 99) || (y == 99)) {
					friends += 0;
				}
				else {
					if (this.cellCoordinates[cellYPos + y][cellXPos + x].isAlive() == true) {
						friends++;

					}
					else {
						friends += 0;
					}
				}	
			}
		}
		return friends;
	}
	this.determineCellLiveOrDead = function(cellYPos, cellXPos) {
	
		switch(this.calculateCellFriends(cellYPos, cellXPos)) {
			case 0 : 
				this.cellCoordinates[cellYPos][cellXPos].setNextDead();
				break;
				
			case 1 : 
				this.cellCoordinates[cellYPos][cellXPos].setNextDead();
				break;
			
			case 2 : 
				if (this.cellCoordinates[cellYPos][cellXPos].isAlive()) {
					this.cellCoordinates[cellYPos][cellXPos].setNextAlive();
				}
				else {
					this.cellCoordinates[cellYPos][cellXPos].setNextDead();
				}
				break;
			
			case 3 :
				this.cellCoordinates[cellYPos][cellXPos].setNextAlive();
				break;
			
			case 4 :
				this.cellCoordinates[cellYPos][cellXPos].setNextDead();
				break;
			
			default :
				this.cellCoordinates[cellYPos][cellXPos].setNextDead();
				break;
		}
	}
	this.next = function() {
		// For the moment, the edges are set to static
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				var status = this.determineCellLiveOrDead(i,j);
			}
		}
		
		// Create a new loop for the next state
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				var newState = this.getCellCoordinateNextState(i,j);
				var newLevel = this.getCellCoordinateNextLevel(i,j);
				
				this.setCellCoordinateState(i,j, newState);
				this.setCellCoordinateLevel(i,j, newLevel);
			}
		}
	}
	this.switchState = function(yPos, xPos) {
		if (this.getCellCoordinateState(yPos, xPos) == 1) {
			this.setCellCoordinateState(yPos, xPos, 0);
		}
		else {
			this.setCellCoordinateState(yPos, xPos, 1);
		}
	}
	
	
	
	this.appearRandom = function() {
		var checkAll = true;
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				if (this.getCellCoordinateState(i, j) == 0) {
					var checkAll = false;
					break;
				}
				else {
					continue;
				}
			}
		}
		
		if (checkAll == false) {
			var randYPos = Math.floor((Math.random() * this.getHeight()) + 0);
			var randXPos = Math.floor((Math.random() * this.getWidth()) + 0);
			
			while (this.getCellCoordinateState(randYPos, randXPos) == 1) {
				randYPos = Math.floor((Math.random() * this.getHeight()) + 0);
				randXPos = Math.floor((Math.random() * this.getWidth()) + 0);
			}
			
			this.setCellCoordinateComplete(randYPos,randXPos,1,1);
		}
		else {
			
		}
	}
	
	
	this.moveAllCellUp = function(boardID) {
		for (var j = 0; j < this.getWidth(); j++) {
			for (var i = 0; i < this.getHeight(); i++) {
				if (this.getCellCoordinateState(i, j) == 1) {
					var newYPos = this.moveCellUp(i, j);
					
					if (newYPos != 999) {
						this.setCellCoordinateState(i, j, 0);
						this.setCellCoordinateState(newYPos, j, 1);
						
						var oldLevel = this.getCellCoordinateLevel(i,j);
						this.setCellCoordinateLevel(i, j, 0);
						this.setCellCoordinateLevel(newYPos, j, oldLevel);
						
						
						var newLevel = this.tryToEatUp(newYPos, j, 1);
						if (newLevel != 999) {
							this.setCellCoordinateLevel(newYPos, j, 0);
							this.setCellCoordinateLevel(newYPos - 1, j, newLevel);
						}
						else {
							continue;
						}
						continue;
					}
					else {
						continue;
					}
				}
				else {
					continue;
				}
			}
		}
		this.appearRandom();
		this.draw(boardID);
	}
	this.moveCellUp = function(yPos, xPos) {
		
		
		var newYPos = yPos;
		if (yPos != this.getTopWallPosition()) {
			while (this.getCellCoordinateState(newYPos - 1, xPos) != 1) {
				newYPos -= 1;
				if (newYPos == this.getTopWallPosition()) {
					break;
				}
				else {
					continue;
				}
				
				
				
			}
			return newYPos;
		}
		else {
			return 999;
		}
	}
	this.moveAllCellDown = function(boardID) {
		for (var j = 0; j < this.getWidth(); j++) {
			for (var i = this.getHeight() - 1; i >= 0; i--) {
				if (this.getCellCoordinateState(i, j) == 1) {
					var newYPos = this.moveCellDown(i, j);
					
					if (newYPos != 999) {
						this.setCellCoordinateState(i, j, 0);
						this.setCellCoordinateState(newYPos, j, 1);
						
						var oldLevel = this.getCellCoordinateLevel(i,j);
						this.setCellCoordinateLevel(i, j, 0);
						this.setCellCoordinateLevel(newYPos, j, oldLevel);
						
						var newLevel = this.tryToEatUp(newYPos, j, 2);
						if (newLevel != 999) {
							this.setCellCoordinateLevel(newYPos, j, 0);
							this.setCellCoordinateLevel(newYPos + 1, j, newLevel);
						}
						else {
							continue;
						}
						continue;
					}
					else {
						continue;
					}
				}
				else {
					continue;
				}
			}
		}
		this.appearRandom();
		this.draw(boardID);
	}
	this.moveCellDown = function(yPos, xPos) {
		var newYPos = yPos;
		if (yPos != this.getBottomWallPosition()) {
			while (this.getCellCoordinateState(newYPos + 1, xPos) != 1) {
				newYPos += 1;
				if (newYPos == this.getBottomWallPosition()) {
					break;
				}
				else {
					continue;
				}
				
				
				
			}
			return newYPos;
		}
		else {
			return 999;
		}
	}
	this.moveAllCellLeft = function(boardID) {
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				if (this.getCellCoordinateState(i, j) == 1) {
					var newXPos = this.moveCellLeft(i, j);
					
					if (newXPos != 999) {
						this.setCellCoordinateState(i, j, 0);
						this.setCellCoordinateState(i, newXPos, 1);
						
						var oldLevel = this.getCellCoordinateLevel(i,j);
						this.setCellCoordinateLevel(i, j, 0);
						this.setCellCoordinateLevel(i, newXPos, oldLevel);
						
						var newLevel = this.tryToEatUp(i, newXPos, 3);
						if (newLevel != 999) {
							this.setCellCoordinateLevel(i, newXPos, 0);
							this.setCellCoordinateLevel(i, newXPos - 1, newLevel);
						}
						else {
							continue;
						}
						continue;
					}
					else {
						continue;
					}
				}
				else {
					continue;
				}
			}
		}
		this.appearRandom();
		this.draw(boardID);
	}
	this.moveCellLeft = function(yPos, xPos) {
		var newXPos = xPos;
		if (xPos != this.getLeftMostWallPosition()) {
			while (this.getCellCoordinateState(yPos, newXPos - 1) != 1) {
				newXPos -= 1;
				
				if (newXPos == this.getLeftMostWallPosition()) {
					break;
				}
				else {
					continue;
				}
	
				
				
			}
			return newXPos;
		}
		else {
			return 999;
		}
	}
	this.moveAllCellRight = function(boardID) {

		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = this.getWidth() - 1; j >= 0; j--) {
				if (this.getCellCoordinateState(i, j) == 1) {
					var newXPos = this.moveCellRight(i, j);
					
					if (newXPos != 999) {
						this.setCellCoordinateState(i, j, 0);
						this.setCellCoordinateState(i, newXPos, 1);
						
						var oldLevel = this.getCellCoordinateLevel(i,j);
						this.setCellCoordinateLevel(i, j, 0);
						this.setCellCoordinateLevel(i, newXPos, oldLevel);
						
 					var newLevel = this.tryToEatUp(i, newXPos, 4);
						if (newLevel != 999) {
							this.setCellCoordinateLevel(i, newXPos, 0);
							this.setCellCoordinateLevel(i, newXPos + 1, newLevel);
						}
						else {
							continue;
						} 
						
						continue;
					}
					else {
						continue;
					}
				}
				else {
					continue;
				}
			}
		}
		this.appearRandom();
		this.draw(boardID);
	}
	this.moveCellRight = function(yPos, xPos) {
		var newXPos = xPos;
		if (xPos != this.getRightMostWallPosition()) {
			while (this.getCellCoordinateState(yPos, newXPos + 1) != 1) {
				newXPos += 1;
				
				if (newXPos == this.getRightMostWallPosition()) {
					break;
				}
				else {
					continue;
				}
	
				
				
			}
			return newXPos;
		}
		else {
			return 999;
		}
	}
	this.tryToEatUp = function(yPos, xPos, direction) {
		/*
			1 : up
			2 : down
			3 : left
			4 : right
		*/
		switch(direction) {
			case 1 :
				if (yPos != this.getTopWallPosition())  {
					if ((this.getCellCoordinateState(yPos - 1, xPos) == 1) && (this.getCellCoordinateLevel(yPos, xPos) == this.getCellCoordinateLevel(yPos - 1, xPos))) {
						this.setCellCoordinateState(yPos, xPos, 0);
						this.setCellCoordinateLevel(yPos, xPos, 0);
						var newLevel = this.getCellCoordinateLevel(yPos - 1, xPos) + 1;
						this.setCellCoordinateLevel(yPos - 1, xPos, newLevel);
						//alert('Eating up at [' + yPos + ',' + xPos + ']');
						return newLevel;
					}
					else {
						return 999;
					}
				}
				else {
					return 999;
				}
				break;
			case 2 :
				if (yPos != this.getBottomWallPosition())  {
					if ((this.getCellCoordinateState(yPos + 1, xPos) == 1) && (this.getCellCoordinateLevel(yPos, xPos) == this.getCellCoordinateLevel(yPos + 1, xPos))) {
						this.setCellCoordinateState(yPos, xPos, 0);
						this.setCellCoordinateLevel(yPos, xPos, 0);
						var newLevel = this.getCellCoordinateLevel(yPos + 1, xPos) + 1;
						this.setCellCoordinateLevel(yPos + 1, xPos, newLevel);
						//alert('Eating up at [' + yPos + ',' + xPos + ']');
						return newLevel;
					}
					else {
						return 999;
					}
				}
				else {
					return 999;
				}
				break;
				
			case 3 :
				if (xPos != this.getLeftMostWallPosition()) {
					if ((this.getCellCoordinateState(yPos, xPos - 1) == 1) && (this.getCellCoordinateLevel(yPos, xPos) == this.getCellCoordinateLevel(yPos, xPos - 1))) {
						this.setCellCoordinateState(yPos, xPos, 0);
						this.setCellCoordinateLevel(yPos, xPos, 0);
						var newLevel = this.getCellCoordinateLevel(yPos, xPos - 1) + 1;
						this.setCellCoordinateLevel(yPos, xPos - 1, newLevel);
						//alert('Eating up at [' + yPos + ',' + xPos + ']');
						
						return newLevel;
					}
					else {
						return 999;
					}
				}
				else {
					return 999;
				}
				break;
				
			case 4 :
				if (xPos != this.getRightMostWallPosition()) {
					if ((this.getCellCoordinateState(yPos, xPos + 1) == 1) && (this.getCellCoordinateLevel(yPos, xPos) == this.getCellCoordinateLevel(yPos, xPos + 1))) {
						this.setCellCoordinateState(yPos, xPos, 0);
						this.setCellCoordinateLevel(yPos, xPos, 0);
						var newLevel = this.getCellCoordinateLevel(yPos, xPos + 1) + 1;
						this.setCellCoordinateLevel(yPos, xPos + 1, newLevel);
						//alert('Eating up at [' + yPos + ',' + xPos + ']');
						return newLevel;
					}
					else {
						return 999;
					}
				}
				else {
					return 999;
				}
				break;
			
			default :
				break;
		}
	}
	

	
	
	
	// --------------------- Drawing Variables
	var gridCellCSSPercentageWidth = 100 / this.getWidth();
	var gridCellCSSPercentageHeight = 100 / this.getHeight();
	var gridCellInitialString =  "<div id='";
	var gridCellMainString = "class='grid-cell' style='height:" + gridCellCSSPercentageHeight + "%; width:" + gridCellCSSPercentageWidth + "%;':><div class='grid-cell-inner'><div class='cell cell-level-";
	var gridCellAliveString = " cell-alive'>";
	var gridCellDeadString = " cell-dead'>";
	var gridClosingString = "</div></div></div>";

	
	
	
	
	// --------------------- Drawing Functions
	this.consolePrint = function() {
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				console.log(this.cellCoordinates[i][j].getState());
			}
			console.log ('----------------------------');
		}
	}
	this.draw = function(boardID) {
		
		/*
		for (var i = 0; i < this.getHeight(); i++) {
			for (var j = 0; j < this.getWidth(); j++) {
				if (this.getCellCoordinateState(i,j) == 1) {
					alert('cell [' + i + ',' + j + '] state : ' + this.getCellCoordinateState(i,j) + '. Level : ' + this.getCellCoordinateState(i,j));
				}
			}
		}
		*/
		
		var theBoard = boardID + ' div.grid-cell';
		$(theBoard).remove();
		for (var i = 0; i < gridCellCSSPercentageHeight; i++) {
			for (var j = 0; j < gridCellCSSPercentageWidth; j++) {

				var gridInfoString1 = "<span class='grid-info'>[" + i + "," + j + "]</span>";
				var gridInfoString2 = "<span class='grid-info'> State : " + this.getCellCoordinateState(i,j) + "</span>";
				var gridInfoString3 = "<span class='grid-info'> Level : " + this.getCellCoordinateLevel(i,j) + "</span>";
				var gridInfoString4 = "<span class='grid-info'> Friends : " + this.calculateCellFriends(i,j) + "</span>"; 
				var gridInfoString = ""; //gridInfoString1 + gridInfoString2 + gridInfoString3 + gridInfoString4;
				if (this.getCellCoordinateState(i,j) == 1) {
					var gridCellDead = gridCellInitialString + "cell" + i + j + "'" + gridCellMainString + this.getCellCoordinateLevel(i,j) + ' ' + gridCellDeadString + gridInfoString + gridClosingString;
					$(boardID).append(gridCellDead);
				}
				else {
					var gridCellDead = gridCellInitialString + "cell" + i + j + "'" + gridCellMainString + gridCellDeadString + gridInfoString + gridClosingString;
					$(boardID).append(gridCellDead);
				}
			}
		}
	}
	
}
