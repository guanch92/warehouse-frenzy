let lastRenderTime = 0;
secondsToRefresh = 0.75; // screen refresh
const warehouseElement = document.getElementById("warehouse");
const exitElement = document.getElementById("exit");
let playerWins = false;
let moveCount = 0;

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
  playerWins = checkWinCondition();
  drawBlue(); //draw all blocks from arrOfBlkCoordinates except 0th item, which is red block
  drawHorizontalBlock(arrayOfBlkCoordinates[0], "red-block", "0"); //render red block
  drawExit();
  drawMoveCounter();
};

const update = () => {
  addClickHandlerHorizontalBlock("red-block");
  addClickHandlerHorizontalBlock("blue-block-h");
  addClickHandlerVerticalBlock("blue-block-v");
};

const main = (currentTime) => {
  if (playerWins) {
    //checks if playerWins is true, before executing the below
    const title = document.getElementById("title");
    title.innerHTML = `You Won!`; //changes title text
    const final = document.getElementById("line1");
    final.innerHTML = `You won with ${moveCount} moves! Click 'OK' in the pop-up dialogue box to retry! :)`; //changes text to reflect number of moves and instructs on how to restart
    const extraLine = document.getElementById("line2");
    extraLine.innerHTML = ""; //removes additional line for instruction
    if (
      confirm(
        //creates dialogoue box that restarts game when ok is clicked.
        `With just ${moveCount} moves! Winner Winner! Chicken Dinner! Press ok to restart.`
      )
    ) {
      window.location = "/"; //refreshes page
    }
  }

  window.requestAnimationFrame(main); //prepare to start main in next frame
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < secondsToRefresh) return;
  lastRenderTime = currentTime;
  console.log(lastRenderTime);

  render(); // draws all blocks
  update(); // 'update' comes after 'render' because event listeners cannot be placed before creating div
};

window.requestAnimationFrame(main); //starts off main loop when the frame is ready to receive the animation
