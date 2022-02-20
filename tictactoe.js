
const gameBoard = (() => {
    let boardState = ['','','','','','','','',''];
    let currentPlayer = '';
    let notis = document.getElementById('notifications');


    const setupBoard = () => {
        boardState = ['','','','','','','','',''];
        displayController.generateBoard();
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => square.addEventListener('click', makeMove));
        //Randomize which player goes first
        currentPlayer = (Math.floor(Math.random()*2) == 0)? Player1.getName:Player2.getName;
        //display current player
        displayController.currentPlayerMove(currentPlayer);
    };
    const getBoardState = (iter) => {
        return boardState[iter];
    };
    const setMove = (sqTarget) => {
        if(currentPlayer == Player1.getName){
            //Set symbol to target square
            boardState[sqTarget] = Player1.getSymbol;
            //Swap current player
            currentPlayer = Player2.getName;
            displayController.currentPlayerMove(currentPlayer);
            checkWin(Player1.getSymbol, Player1.getName);
        }
        else{
            boardState[sqTarget] = Player2.getSymbol;
            currentPlayer = Player1.getName; 
            displayController.currentPlayerMove(currentPlayer);
            checkWin(Player2.getSymbol, Player2.getName);
        }
    };
    const makeMove = (e) => {
        let sqTarget = e.target.getAttribute('data-sqNum');
        let textTarget = e.target.innerHTML;

        if (textTarget !=''){
            alert('Wrong Move');
            return;
        }
        gameBoard.setMove(sqTarget);
        displayController.generateBoard();
    };
    const checkWin = (symbol, currentPlayer) => {
        //let symCheck = symbol;
        //Check Rows
        for(let i = 0; i<7; i+=3){
            let rowCheck = 0;
            for(let j=i;j<=(i+2);j++){
                if(symbol == boardState[j]){
                    rowCheck += 1;
                }
                if(rowCheck == 3) {
                    notis.innerHTML = (currentPlayer +' wins!');
                    disableBoard();
                return;
                }
            }
        }
        //Check Cols
        for(let i = 0; i<3; i++){
            let colCheck = 0;
            for(let j=i;j<=(i+7);j+=3){
                if(symbol == boardState[j]){
                    colCheck += 1;
                }
                if(colCheck == 3) {
                    notis.innerHTML = (currentPlayer +' wins!');
                    disableBoard();
                return;
                }
            }
        }
        //Check Diag
        let diagCheck = 0;
        for(let i = 0; i<9; i+=4){
            
            if(symbol == boardState[i]){
                    diagCheck += 1;
            }
            if(diagCheck == 3) {
                notis.innerHTML = (currentPlayer +' wins!');
                disableBoard();
                return;
            }
        }
        //Check CounterDiag
        let cdiagCheck = 0;
        for(let i = 2; i<7; i+=2){
            
            if(symbol == boardState[i]){
                    cdiagCheck += 1;
            }
            if(cdiagCheck == 3) {
                notis.innerHTML = (currentPlayer +' wins!');
                disableBoard();
                return;
            }
        }
    }

    const disableBoard = () => {
        //boardState = ['','','','','','','','',''];
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => square.removeEventListener('click', makeMove));
    }
   // const setCurrentPlayer
        return {
            setMove, 
            getBoardState, 
            currentPlayer,
            setupBoard,
            makeMove
        };
})();

const displayController = (() => {
    const generateBoard = () => {
        let tttGrid  = document.querySelectorAll('.square');
        let iter = 0;
        tttGrid.forEach(grid => {
            grid.innerHTML = gameBoard.getBoardState(iter);
            iter += 1;
        })
    };

    const currentPlayerMove = (currentPlayer) => {
        let noti = document.getElementById('notifications');
        notifications.innerHTML = `${currentPlayer}'s Move`;
    }

    const initializeDisplay = () => {
        const startBut = document.querySelector('.start');
        const player1Disp = document.querySelector('.player1Disp')
        const player2Disp = document.querySelector('.player2Disp')
        player1Disp.innerHTML =('Player1: '+ Player1.getName + ' | '+ Player1.getSymbol);
        player2Disp.innerHTML =('Player2: '+ Player2.getName + ' | '+ Player2.getSymbol);


        startBut.addEventListener('click', gameBoard.setupBoard);

    }

    return {generateBoard,currentPlayerMove,initializeDisplay};
})();

//Name of player. Symbol is chosen for player to place on board
const Player = (name,symbol) => {
    const getSymbol =  symbol;
    const getName = name;
 
    return {getSymbol, getName};
}


const Player1 = Player(prompt('Please enter Player1 name:','Player1'), 'x');
const Player2 = Player(prompt('Please enter Player2 name:','Player2'), 'o');

//gameBoard.setupBoard();
displayController.initializeDisplay();


