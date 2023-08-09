let selected;
let score = 0;
let gameStarted = false;
const dropZones = document.querySelectorAll(".drop");
document.querySelector('#score').innerText = score;
const startGameBtn = document.querySelector("button");
const errorMsg = document.querySelector("#error");
const endGamebtn = document.querySelector(".end-btn");
endGamebtn.style.display = "inline";
startGameBtn.style.display = "none";
errorMsg.style.opacity = 0;
let scores = JSON.parse(localStorage.getItem('scores')) || [];
var lastKey;


$(document).ready(function(e) {
    shuffle();
    showScore();
});

$(".play-btn").click(startGame);
$(".end-btn").click(endGame);

function startGame() {
    window.location.reload();
}

function endGame() {
    errorMsg.style.display = "none";
    startGameBtn.style.display = "inline";
    addScore();
    document.querySelector(".drag-section").style.border = "none";
    endGamebtn.style.display = "none";
}

function shuffle(){
    // Shuffles the holes
    $(".drop-section").each(function(){
        var divs = $(this).find('div');
        for(var i = 0; i < divs.length; i++) $(divs[i]).remove();            
        //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
        var i = divs.length;
        if ( i == 0 ) return false;
        while ( --i ) {
            var j = Math.floor( Math.random() * ( i + 1 ) );
            var tempi = divs[i];
            var tempj = divs[j];
           divs[i] = tempj;
           divs[j] = tempi;
        }
        for(var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
    });
}

function handleDrop(e) {
    if(document.querySelector(".drag-section").childElementCount === 1) {
        // Calls end condition if all the shapes are matched 

        endGame();
    }
    gameStarted = true;
    if(e.target.classList.contains(selected.className)) {
        // Handles the correct dropped shape: Increment score
        errorMsg.style.opacity = 0;
        e.target.classList.remove("drop");
        selected.remove();
        score ++;
        document.querySelector('#score').innerText = score;
        return;
    } else if(score === 0) { 
        // Condition to not get a negative score
        errorMsg.style.opacity = 100;
        return;
    }
    // Handles the wrong dropped shape: Decrement score
    errorMsg.style.opacity = 100;
    score--;
    document.querySelector('#score').innerText = score;
}

dropZones.forEach(function (element) {
    element.addEventListener('drop', handleDrop);
})

function handleDragStart(e) {
    selected = e.target;
    e.target.style.opacity = 0.5;
}

document.addEventListener('dragstart', handleDragStart);

function handleDragEnd(e) {
    e.target.style.opacity = 1;
}
document.addEventListener('dragend', handleDragEnd);

function allowDrop(e) {
    e.preventDefault();
}
dropZones.forEach(function(value) {
    value.addEventListener("dragover", allowDrop);
})

function addScore() {
    let num = score == 0 ? 0 : score;
    scores.push(num);
    localStorage.setItem(localStorage.length, num);
    showScore();
}

function showScore() {
    let n = localStorage.length;
    const ul = document.querySelector("ul");
    if(n === 0 || ul.children.length === 0 ){
        for (var i = 0; i < localStorage.length; i++) {
            $(".List").append('<li>' + "[Game " + i + "] : " + localStorage.getItem(i) + '</li>');
        }
    } else {
        var lastScore = localStorage.getItem(n-1);
        $(".List").append('<li>' + "[Game " + (n-1) + "] : " + lastScore + '</li>');
    }
}

$("#reset").click(function() { 
    //  Clears scoreboard
    console.log("clicked");
    scores = [];
    localStorage.clear();
})
   



