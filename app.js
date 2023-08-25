

(function() {
    const Gameboard = {
        gameBoard: [],
        winningCombinations: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        init: function () {
            this.createBoard();
            this.cacheDom();
            this.render();
            this.bindEvents();
        },
        //Creates gameboard as an empty array with 3 columns and 3 rows
        createBoard: function() {
            let rows = 3;
            let columns = 3;
            for (let i = 0; i < this.rows; i++) {
                this.gameBoard[i] = [];
                for (let j = 0; j < this.columns; j++) {
                    this.gameBoard[i].push('');
                }
            }
        },
        //Goes through each column and row of the board array and adds an x in each cell
        updateBoard: function(marker) {
            for (let i = 0; i < this.rows; i++) {
                this.gameBoard[i] = [];
                for (let j = 0; j < this.columns; j++) {
                    this.gameBoard[i].push(marker);
                }
            }
            console.log(this.gameBoard);
        },
        cacheDom: function() {
            this.gameboard = document.getElementById("gameboard");
            this.gameSquares = document.querySelectorAll("[data-cell]");
            this.winningMessage = document.getElementById("winning-message");
            this.winningMessageText = document.querySelector("[data-winning-message-text]");
        },
        //Goes through the board array to render the board
        render: function () {
            this.gameSquares.forEach(square => {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.columns; j++) {
                        square.classList.add(this.gameBoard[i][j])
                    }
                }
            });
        },
        onClick: function(element) {
            element.addEventListener('click', (event) => {
                this.addMarker(event.target);
                Game.switchActivePlayer();
            }, { once: true });
            
        },
        bindEvents: function() {
            this.gameSquares.forEach((square) => this.onClick(square));
        },
        setBoardHoverClass: function(activePlayer) {
            this.gameboard.classList.remove('x');
            this.gameboard.classList.remove('o');
            this.gameboard.classList.add(activePlayer.marker);
        },
        addMarker: function(square) {
            const activePlayer = Game.getActivePlayer();
            square.classList.add(activePlayer.marker);
        },
        checkWin: function(currentClass) {
            return this.winningCombinations.some( combination => {
                return combination.every( value => {
                    return this.gameSquares[value].classList.contains(currentClass);
                });
            });
        },
        displayPlayerWins: function(playerMarker) {
            let marker = playerMarker.toUpperCase();
            this.winningMessageText.textContent = `Player ${marker} Wins!`
            this.winningMessage.classList.add('show');
        },
        checkDraw: function() {
            let i = 0;
            this.gameSquares.forEach( square => {
                if (square.classList.contains('x') || square.classList.contains('o')) {
                    i++;
                }
            });
            if (i === 9) {
                return true;
            } else {
                return false;
            }
        },
        displayTie: function() {
            this.winningMessageText.textContent = `It's a tie.`
            this.winningMessage.classList.add('show');
        }
    };

    const Game = {
        startGame: function() {
            this.activePlayer = players[0];
            Gameboard.setBoardHoverClass(this.activePlayer);
        },
        getActivePlayer: function() {
            return this.activePlayer;
        },
        switchActivePlayer: function() {
           if (Gameboard.checkWin(this.activePlayer.marker)) {
                Gameboard.displayPlayerWins(this.activePlayer.marker);
           } else if (Gameboard.checkDraw()) {
                Gameboard.displayTie();
           }
            this.activePlayer = this.activePlayer === players[0] ? players[1] : players[0];
            Gameboard.setBoardHoverClass(this.activePlayer);
        },
    };

    const players = [
        {
            name: 'Player One',
            marker: 'x'
        },
        {
            name: 'Player Two',
            marker: 'o'
        }

    ];

    function playGame() {
        Gameboard.init();
        Game.startGame()
    }
        Gameboard.init();
        Game.startGame();
        const gameWin = Gameboard.checkWin();
})();


