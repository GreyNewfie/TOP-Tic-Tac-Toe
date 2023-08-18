(function() {
    const Gameboard = {
        rows: 3,
        columns: 3,
        board: [],
        createBoard: function() {
            for (i = 0; i < this.rows; i++) {
                this.board[i] = [];
                for (j = 0; j < this.columns; j++) {
                    this.board[i].push('x');
                }
            }
            console.log(this.board);
        },
        cachedDom: function() {
            this.gameboard = document.getElementById("gameboard");
            this.gameSquares = document.querySelectorAll(".gameboard-square");
            console.log(this.gameboard);
            console.log(this.gameSquares);
        },
        render: function () {
            this.gameSquares.forEach(square => {
                for (i = 0; i < this.rows; i++) {
                    for (j = 0; j < this.columns; j++) {
                        square.classList.add(this.board[i][j])
                    }
                }
            });
        },
        init: function () {
            this.createBoard();
            this.cachedDom();
            this.render();
        }
    }
    const newBoard = Gameboard.init();
})();


