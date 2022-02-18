
const gameBoard = (() => {
    const boardState = ['x','o','o','x','x','x','o','x','o'];
    const getBoardState = (iter) => {
        return boardState[iter];
    }
    return {boardState, getBoardState};
})();

const displayController = (() => {
    const generateBoard = () => {
        let tttGrid  = document.querySelectorAll('.square');
        let iter = 0;
        tttGrid.forEach(grid => {
            grid.innerHTML = gameBoard.getBoardState(iter);
            iter += 1;
        })
    }
    return {generateBoard};
})();
//Name of player. Symbol is chosen for player to place on board
const Player = (name,symbol) => {
    const getSymbol = () => symbol;
    const getName = () => name;

    return {getSymbol, getName};
}



displayController.generateBoard();





