// HINT
const hintButton = document.getElementById('show-hint');
hintButton.addEventListener('click', () => {
  const hint = document.querySelector('.hint');
  hint.classList.toggle('active');
});

const canMove = (tile) => {
  const row = tile.parentElement.rowIndex;
  const col = tile.cellIndex;
  // console.log(`${col}, ${row}`);

  const empty = document.querySelector('.empty');
  const emptyRow = empty.parentElement.rowIndex;
  const emptyCol = empty.cellIndex;
  // console.log(`Empty: ${emptyCol}, ${emptyRow}`);

  // if col == empty col AND diff between row and empty row is 1
  if (col === emptyCol && (Math.abs(row - emptyRow) === 1)) {
    return true;
  }
  // if row == empty row AND diff between col and empty col is 1
  if (row === emptyRow && (Math.abs(col - emptyCol) === 1)) {
    return true;
  }
  return false;
}

const move = (tile) => {
  // select prev empty tile
  const prevEmpty = document.querySelector('.empty');
  // assign it '.empty'
  tile.classList.toggle('empty');

  // and give the previous empty tile the text of `tile`.
  prevEmpty.innerText = tile.innerText;
  tile.innerText = '';

  // remove .empty from it
  prevEmpty.classList.toggle('empty');
};

const checkForWin = () => {
  // declare array of integers 1-15
  // compare with inner text of all elements in the tiles
  // they should be equal
  const numbers = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN';
  const tileNumbers = Array.from(tiles).map((tile) => {
    return parseInt(tile.innerText, 10);
  }).join();
  const win = numbers === tileNumbers;
  return win;
};


// Add listener (click) to all squares
// When clicked:
//  If it can move: (it's next to the empty tile)
//    Move (swap with empty)
//    Check for win

const tiles = document.querySelectorAll('td');
tiles.forEach((tile) => {
  tile.addEventListener('click', (event) => {
    // can it move?
    const tile = event.currentTarget;
    if (canMove(tile)) {
      console.log('CAN MOVE');
      move(tile);
      if (checkForWin()) {
        alert('You win!')
      }
    }
  })
})
