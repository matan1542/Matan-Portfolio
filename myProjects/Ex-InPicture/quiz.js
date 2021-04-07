'use strict'
console.log('Quiz Game')
var correctAnswerCounter = 0;
var gNextId = 1;
var gOptionsIdx = 1;
var gNums = resetNums(4);

var gOptions = [{
    id: 1,
    name: 'Watermelon'
}, {
    id: 2,
    name: 'Cucumber'
}, {
    id: 3,
    name: 'Orange'
}, {
    id: 4,
    name: 'Tomato'
}];

init();

function init() {
    renderImg();
    createButtons(createQuests(gOptions, 4));
}

function createQuests(opts, length) {
    var quesArr = [];
    for (var i = 1; i <= length; i++) {
        var question = {
            id: gNextId++,
            opts,
            correctOptIndex: gOptionsIdx++
        }
        quesArr.push(question);
    }

    return quesArr;
}

function createButtons(quesArr) {
    var strHtml = '';
    for (var i = 0; i < quesArr.length; i++) {
        strHtml += `<button class="${i}" data-id = ${quesArr[i].correctOptIndex} onclick="checkAnswer(this)">${quesArr[i].opts[i].name}</button>`
    }
    var elButtons = document.querySelector('.question-container');
    elButtons.innerHTML = strHtml
}

function renderImg() {
    var randomQuestion = drawNum(gNums);
    var strHtml = `<img src="img/${randomQuestion}.jpg" data-id = ${randomQuestion} class ="img-style" ></img>`
    var elImg = document.querySelector('.img-container');
    elImg.innerHTML = strHtml
}

function drawNum(nums) {
    var idx = Math.floor(Math.random() * nums.length);
    // console.log(nums.length);
    var num = nums.splice(idx, 1);
    return num[0];
}

function resetNums(length) {
    var nums = [];
    for (var i = 1; i <= length; i++) {
        nums.push(i);
    }
    console.log(nums)
    return nums;
}
function checkAnswer(optIdx) {
    var elBtnData = optIdx.getAttribute('data-id');
    var elImgData = document.querySelector('img').getAttribute('data-id');
    if (elImgData === elBtnData) {
        console.log('good Answer')
        renderImg();
        correctAnswerCounter++;
        console.log(correctAnswerCounter);
    }

    if (gOptions.length <= correctAnswerCounter) {
        var strHtml = ` <h2 class = "success">You rock!!!</h2>`
        strHtml += `<button class="reset" onclick= "reset()">Reset</button>`
        var elImg = document.querySelector('.img-container');
        elImg.innerHTML = strHtml
    }
}


function reset() {
    correctAnswerCounter = 0;
    gNextId = 1;
    gOptionsIdx = 1;
    gNums = resetNums(4);
    init();
}

