var gLength;
var gNums = resetNums(gLength);
var prevNum = 1;
var countInterval;



function init() {
    renderBoard(gLength)
}


function renderBoard() {
    var strHtml = '';
    var num = drawNum(gNums);
    var elBoard = document.querySelector('.board');
    strHtml += '<tr>'
    for (var i = 1; i <= gLength; i++) {
        strHtml += `<td data-id ="${num}" onclick="cellClicked(this)">${num}</td>`
        num = drawNum(gNums);
        if (i % Math.sqrt(gLength) === 0) {
            strHtml += '</tr>'
            strHtml += '<tr>'
        }
    }
    strHtml += '</tr>'
    elBoard.innerHTML = strHtml
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
    return nums;
}



function cellClicked(clickedNum) {
    var elTdBoard = clickedNum.getAttribute('data-id');
    var levelContainer = document.querySelector('.levelContainer');
    if (prevNum === gLength) {
        levelContainer.style.display = 'block'
        clickedNum.style.backgroundColor = 'rgb(145, 163, 163)';
        clickedNum.style.color = 'rgb(238, 221, 185)';
        stopTimer();
        prevNum = 1;
    }
    if (+elTdBoard === prevNum) {
        clickedNum.style.backgroundColor = 'rgb(145, 163, 163)';
        clickedNum.style.color = 'rgb(238, 221, 185)';
        prevNum++;
    }

}

function startOver() {
    var level16 = document.getElementById("level16").checked;
    var level25 = document.getElementById("level25").checked;;
    var levelContainer = document.querySelector('.levelContainer');
    if (level16) {

        gLength = 16;
        gNums = resetNums(gLength);
        init();
        startTimer()
        levelContainer.style.display = 'none'
    } else if (level25) {

        gLength = 25;
        gNums = resetNums(gLength);
        init();
        startTimer()
        levelContainer.style.display = 'none'
    } else {
        gLength = 36;
        gNums = resetNums(gLength);
        init();
        startTimer()
        levelContainer.style.display = 'none'
    }
}

function startTimer() {
    var timer = document.querySelector('.time');
    var countThuMil = 0.0
    var countMil = 0;
    var countSec = 1;

    countInterval = setInterval(() => {
        timer.innerText = `${countSec}.${countMil}`
        countMil++;
        if (countMil > 100) {
            countSec++;
            countMil = 0;
        }
    }, 10)
}

function stopTimer() {
    clearInterval(countInterval);
}