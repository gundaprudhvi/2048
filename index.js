var score = 0;
var board;
var rows=4;
var columns=4;

window.onload = function (){
    const gameOver = document.getElementById("game_over");
    gameOver.classList.add("display_none");
    setGame();
}

function resetGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for(let i=0; i<rows; i++){
        for(let j=0;j<columns; j++){
            tile=document.getElementById(i.toString()+"-"+j.toString())
            updateTile(tile,0);
        }
    }
    setTwo();
    setTwo();
    const gameOver = document.getElementById("game_over");
    gameOver.classList.add("display_none");
    gameOver.classList.remove("display")
    score=0;
    document.getElementById("score").innerText = score;
}

function setGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function isEmptyAvailable(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<rows;j++){
            if(board[i][j]===0)
                return true;
        }
    }
    return false;
}

function gameOver(){
    const gameOver = document.getElementById("game_over");
    gameOver.classList.add("display");
    gameOver.classList.remove("display_none")
}

function setTwo(){
    if(isEmptyAvailable()){
        let found = false;
        while(!found){
            const i=Math.floor(Math.random()*4);
            const j=Math.floor(Math.random()*4);

            if(board[i][j]===0){
                found=true;
                board[i][j]=2;
                const tile=document.getElementById(i.toString()+"-"+j.toString());
                updateTile(tile,2);
            }
        }
    }
}

function updateTile(tile,num){
    tile.classList.value=""
    tile.classList.add("tile")
    if(num>0){
        tile.innerText = num;
        tile.classList.add("x"+num.toString())
    }
    else{
        tile.innerText = "";
    }
}

function checkGameOver(){
    if(isEmptyAvailable())
        return;
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns-1;j++){
            if(board[i][j]===board[i][j+1])
                return;
        }
    }
    for(let j=0;j<columns;j++){
        for(let i=0;i<rows-1;i++){
            if(board[i][j]===board[i+1][j])
                return;
        }
    }
    gameOver();
}

document.addEventListener("keyup",e=>{
    if(e.code==="ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code==="ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code==="ArrowDown"){
        slideDown();
        setTwo();
    }
    else if(e.code==="ArrowUp"){
        slideUp();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    checkGameOver();
});

function filterZero(row){
    return row.filter(e=>e!==0);
}

function slide(row){
    row=filterZero(row);
    for(let i=0;i<row.length-1;i++){
        if(row[i]===row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row=filterZero(row);
    while(row.length<columns){
        row.push(0);
    }
    return row;
}

function slideLeft(){
    for(let i=0;i<rows;i++){
        var row=board[i];
        row=slide(row);
        board[i]=row;
        for(let j=0;j<columns;j++){
            const tile=document.getElementById(i.toString()+"-"+j.toString());
            updateTile(tile,board[i][j]);
        }
    }
}


function slideRight(){
    for(let i=0;i<rows;i++){
        var row=board[i];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[i]=row;
        for(let j=0;j<columns;j++){
            const tile=document.getElementById(i.toString()+"-"+j.toString());
            updateTile(tile,board[i][j]);
        }
    }
}

function slideUp(){
    for(let j=0;j<columns;j++){
        let row = [board[0][j],board[1][j],board[2][j],board[3][j]];
        row=slide(row)
        for(let i=0;i<rows;i++){
            board[i][j]=row[i];
            let tile=document.getElementById(i.toString()+"-"+j.toString());
            updateTile(tile,board[i][j])
        }
    }
}

function slideDown(){
    for(let j=0;j<columns;j++){
        let row = [board[0][j],board[1][j],board[2][j],board[3][j]];
        row.reverse()
        row=slide(row)
        row.reverse()
        for(let i=0;i<rows;i++){
            board[i][j]=row[i];
            let tile=document.getElementById(i.toString()+"-"+j.toString());
            updateTile(tile,board[i][j]);
        }
    }
}