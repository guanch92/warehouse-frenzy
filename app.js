const warehouseElement = document.getElementById("warehouse");
const exitElement = document.getElementById("exit");
let playerWins = false;
let moveCount = 0;
let completedCount = 0;
let level = 1;


const drawExit = () => {
  appendToWarehouse(exitElement);
};

const checkWinCondition = () => {
  return (
    arrayOfBlkCoordinates[0][1].x === 6 && arrayOfBlkCoordinates[0][1].y === 3
  );
};

const render = () => {
  warehouseElement.innerHTML = "";
  drawBlue(); //draw all blocks from arrOfBlkCoordinates except 0th item, which is red block
  drawHorizontalBlock(arrayOfBlkCoordinates[0], "red-block", "0"); //render red block
  drawExit();
  drawInstructions();
  drawButtons();
  drawMoveCounter();
  
};

const update = () => {
  addHorizontalClickHandler("red-block");
  addHorizontalClickHandler("blue-block-h");
  addVerticalClickHandler("blue-block-v");
  addLevelButtons();
};

const winMessages = () => {
  const title = document.getElementById("title");
  title.innerHTML = `You Won!`; //changes title text
  if (level < 3) {
    const final = document.getElementById("line1");
    final.innerHTML = `You won with ${moveCount} moves! Click 'OK' to move on! :)`; //changes text to reflect number of moves and instructs on how to restart
    const extraLine = document.getElementById("line2");
    extraLine.innerHTML = "On to the next level!!!"; //removes additional line for instruction
  } else {
    const final = document.getElementById("line1");
    final.innerHTML = `You won with ${moveCount} moves! Click 'OK' to start over! :)`; //changes text to reflect number of moves and instructs on how to restart
    const extraLine = document.getElementById("line2");
    extraLine.innerHTML = "You completed all 3 levels! "; //removes additional line for instruction
  }
};

const main = (currentTime) => {
  switch (level) {
    case 1: 
    arrayOfBlkCoordinates = level1Blocks;
    break;
    case 2: 
    arrayOfBlkCoordinates = level2Blocks;
    break;
    case 3: 
    arrayOfBlkCoordinates = level3Blocks;
    break;
  }

  render(); // draws all elements -> blocks, exit and moves counter
  update(); // 'update' comes after 'render' because event listeners cannot be placed before creating event targets
  
  playerWins = checkWinCondition(); // returns boolean
  if (playerWins) {
    //checks if playerWins is true, before executing the below
    winMessages();
    if (
      confirm(
        //creates dialogue box that restarts game when ok is clicked.
        `With just ${moveCount} moves! Winner Winner! Chicken Dinner! Press ok to move on to next level.`
      )
    ) {
      switch (level) {
        case 1: 
        level = 2;
        moveCount = 0;
        playerWins = false;
        main();
        break;
        case 2: 
        level = 3;
        moveCount = 0;
        playerWins = false;
        main();
        break;
        case 3: 
        window.location = "/"; //refreshes page
        break;
      }
      
    }
  }
};

window.requestAnimationFrame(main); //starts off main loop when the frame is ready to receive the animation
