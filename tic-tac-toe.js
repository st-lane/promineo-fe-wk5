// Create a class to encapsulate all the messy details
class TicTacToe {
    constructor(ObjIn){
        this.msgElem = null;
        this.tableElem = null;
        
        this.Data = [
            [null, null,null],
            [null, null,null],
            [null, null,null],
        ];
        this.currPlayer = "X";
        this.gameOver = false;
    }
    // reset() - resets game - re-inits all control and display values
    reset(){
        // rest all game data to null values
        for (let r=0; r<this.Data.length; r++){
            for (let c=0; c<this.Data[r].length; c++){
                this.Data[r][c] = null;
            }
        }
        // redraw table 
        this.updateTable();
        // reset message area
        this.msgElem.className = "center";
        this.msgElem.innerText = "Player One, you start.";
        this.msgElem.style.display = "block";
        // reset current player to X
        this.currPlayer = "X";
        // reset gameOver flag
        this.gameOver = false;
        // remove game over banner
        document.getElementById('bnr-end').remove();
    }

    // updateTable() - method to make visible table in page match the current game data
    updateTable(){
        let thisCell;
        let strSelect;
        for (let r=0; r<this.Data.length; r++){
            for (let c=0; c<this.Data[r].length; c++){
                strSelect = `table.ttt td[data-row="${r}"][data-col="${c}"]`    
                thisCell = document.querySelector(strSelect);
                if(this.Data[r][c] !== null){
                    thisCell.innerText = this.Data[r][c];
                } else {
                    thisCell.innerHTML = "&nbsp;";
                }
            }        
        }

    }

    // setMsgElem() - finds element to be updated on each click, indicating which player's turn is active.
    //                Stored object reference on Object
    setMsgElem(strSelector){
        this.msgElem = document.querySelector(strSelector);
        if(this.msgElem === null ) this.showMsg(`setMsgElem error: Selctor "${strSelector}" not found`);           
    }
    // setTableElem() - finds table element to be updated on each click, showing state of game.
    //                  Stored object reference on Object
    setTableElem(strSelector){
        this.tableElem = document.querySelector(strSelector);
        if(this.tableElem === null ) this.showMsg(`setTableElem error: Selctor "${strSelector}" not found`);           
    }

    // showMsg() - writes string to log
    showMsg(strIn){
        console.log(strIn);
    }

    // showBanner() - Creates banner displayed at end of game announcing winner, provides reset button.
    //                Adds banner into DOM 
    showBanner(strMsg){
        let elemBanner = document.createElement('div');
        elemBanner.className = "alert alert-primary";
        elemBanner.setAttribute("id","bnr-end");
        elemBanner.innerText = strMsg;
    
        let btnReset = document.createElement("button");
        btnReset.setAttribute("type","button");
        btnReset.innerText = "Reset Game";
        btnReset.className ="btn btn-primary float-end";
        btnReset.addEventListener('click', ()=>{
            Game.reset();
        });

        elemBanner.append( btnReset );
        this.tableElem.before(elemBanner);
    }

    // setTurnMsg() - Updates turn message at end of turn, handles all updates to display
    setTurnMsg() {
        if(this.gameOver) {
            return;
        }
        let strMsg = `Player ${this.currPlayer === "X" ? "One":"Two"}, your turn.`;
        this.msgElem.innerText = strMsg;
        if (this.currPlayer === "X") {
            this.msgElem.className = "left";
        } else {
            this.msgElem.className = "right";
        }
    }

    // isEqual() - Utility method for comparing Game data values to determine winner
    isEqual(val1, val2){
        if (val1 === null) return false;
        if (val2 === null) return false;
        if(val1===val2) return true;
        else return false;
    }

    // nextPlayer() - Swap player message
    nextPlayer() {
        this.currPlayer = this.currPlayer === "X" ? "O" : "X";
        this.showMsg(`Player ${this.currPlayer === "X" ? "One":"Two"}, your turn.`);
        this.setTurnMsg();
    }
    // isCat() - Game solution: is Cat game ... tie.
    isCat(){
        if( this.Data[0].indexOf(null) === -1 && this.Data[1].indexOf(null) === -1 &&  this.Data[2].indexOf(null) === -1 ) {
            return true;
        } 
        return false;
    }

    // isWinner() - Game solution: Determine if game is in a winning state.
    isWinner(){
        // check rows
        if (this.isEqual(this.Data[0][0], this.Data[0][1]) && this.isEqual(this.Data[0][0],this.Data[0][2]) ) return true;
        if (this.isEqual(this.Data[1][0], this.Data[1][1]) && this.isEqual(this.Data[1][0],this.Data[1][2]) ) return true;
        if (this.isEqual(this.Data[2][0], this.Data[2][1]) && this.isEqual(this.Data[2][0],this.Data[2][2]) ) return true;

        // check cols
        if (this.isEqual(this.Data[0][0], this.Data[1][0]) && this.isEqual(this.Data[0][0],this.Data[2][0]) ) return true;
        if (this.isEqual(this.Data[0][1], this.Data[1][1]) && this.isEqual(this.Data[0][1],this.Data[2][1]) ) return true;
        if (this.isEqual(this.Data[0][2], this.Data[1][2]) && this.isEqual(this.Data[0][2],this.Data[2][2]) ) return true;

        // left diagonal
        if (this.isEqual(this.Data[0][0], this.Data[1][1]) && this.isEqual(this.Data[0][0], this.Data[2][2]) ) return true;
        // left diagonal
        if (this.isEqual(this.Data[2][0], this.Data[1][1]) && this.isEqual(this.Data[2][0], this.Data[0][2]) ) return true;

    }

    // doClick() - click event handler set on all cells in table
    doClick(elemIn) {
        if (this.gameOver) return;

        let rowIn = parseInt( elemIn.getAttribute('data-row') );
        let colIn=parseInt( elemIn.getAttribute('data-col'));
        if (this.Data[rowIn][colIn] === null) {
            this.Data[rowIn][colIn] = this.currPlayer;
            this.updateTable();
            if( this.isCat() ) {
                this.gameOver = true;
                this.msgElem.style.display = "none";
                let strMsg = "Game over - no winner.";
                this.showBanner(strMsg);
                this.showMsg(strMsg);
            } else if( this.isWinner() ) {
                this.gameOver = true;
                this.msgElem.style.display = "none";
                let strMsg = `${this.currPlayer === "X" ? "Player One" : "Player Two"} wins with "${this.currPlayer}"!`;
                this.showBanner(strMsg);
                this.showMsg(strMsg);
            } else {
                this.nextPlayer();
            }
        } else {
            this.showMsg(`Square ${rowIn+1},${colIn+1} is already in play. Please try again.`)
        }
    }        
}


