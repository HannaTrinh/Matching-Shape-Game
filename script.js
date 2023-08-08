let selected;
let score = 0;
let gameStarted = false;
const dropZones = document.querySelectorAll(".drop");
document.querySelector('#score').innerText = score;
const startGameBtn = document.querySelector("button");
const errorMsg = document.querySelector("#error");
startGameBtn.style.display = "none";
errorMsg.style.opacity = 0;
const scores = JSON.parse(localStorage.getItem('scores')) || [];


$(document).ready(shuffle);
$("button").click(startGame);

function startGame() {
    window.location.reload();
}

function endGame() {
    errorMsg.style.display = "none";
    startGameBtn.style.display = "inline";
    addScore();
    document.querySelector(".drag-section").style.border = "none";
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

//localStorage.setItem("scores", string);

function addScore() {
    scores.push(score+1);
    localStorage.setItem("scores", JSON.stringify(scores));
}

function showScore() {
    if(scores.length === 0) {
        return;
    }
    var list = '<li>' + score + '</li>';
    $('.List').append(list);
}

$("#reset").click(function() {
    localStorage.clear();
})
   


