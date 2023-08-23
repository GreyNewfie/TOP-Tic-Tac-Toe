

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
            this.gameSquares = document.querySelectorAll(".gameboard-square");
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
                console.log(event);
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
            console.log(square);
            console.log(activePlayer.marker);
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
})();


