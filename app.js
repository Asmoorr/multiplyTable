function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formFields = form.elements;

    const answerText = formFields.answer.value;
    const button = formFields.button;

    if (!answerText) {
        return
    }

    let nums = task.innerHTML.split(' * ').map((strNum) => parseInt(strNum));
    let num1 = nums[0];
    let num2 = nums[1];

    if (answerText == num1 * num2) {
        // updateCorrectArea(num1, num2, answerText);
        rightCounter.innerHTML = parseInt(rightCounter.innerHTML) + 1
        paintButton(button, rightColor);
    } else {
        updateMistakesArea(num1, num2, answerText)
        wrongCounter.innerHTML = parseInt(wrongCounter.innerHTML) + 1
        paintButton(button, wrongColor);
    }

    button.disabled = true;

    setTimeout(() => {
        resetTask(form, task)
    }, 400);
}

function updateMistakesArea(num1, num2, answer) {
    mistake = document.createElement("div");
    mistake.innerHTML = num1 + ' * ' + num2 + ' = ' + answer;
    mistake.style.cssText = `color: ${wrongColor}; padding: 20px`
    mistakesArea.append(mistake);
    mistakesArea.scrollBy({
        top: 101,
        behavior: "smooth",
      });
}

// function updateCorrectArea(num1, num2, answer) {
//     correct = document.createElement("div");
//     correct.innerHTML = num1 + ' * ' + num2 + ' = ' + answer;
//     correct.style.cssText = `color: ${rightColor}; padding: 20px`
//     correctArea.append(correct);
//     correct.scrollBy({
//         top: 101,
//         behavior: "smooth",
//       });
// }

function paintButton(button, color) {
    button.style.color = color;
}

function resetTask(form, task) {
    paintButton(button, startColor);
    form.elements.answer.value = '';
    button.disabled = false;
    setTask(task);
}

function setTask(task) {
    let a;
    let b;
    while (a == b || a == 10 || a == 11 || b == 10 || b == 11) {
        a = getRandomInt(min_num, max_num);
        b = getRandomInt(min_num, max_num);
    }
    task.innerHTML = a + ' * ' + b;
}

function handleResetButton(form, task) {
    resetTask(form, task);
    wrongCounter.innerHTML = 0;
    rightCounter.innerHTML = 0;
    form.elements.answer.focus();
    mistakesArea.replaceChildren();
}

const wrongColor = '#FF1E00';
const rightColor = '#59CE8F';
const startColor = '#000'

const min_num = 6;
const max_num = 13;

const button = document.getElementById("button");
const resetButton = document.getElementById("reset-button");
const task = document.getElementById("task");
const myForm = document.getElementById("my-form");

const rightCounter = document.getElementById("right-counter");
const wrongCounter = document.getElementById("wrong-counter");

const mistakesArea = document.getElementById("mistakes");
const correctArea = document.getElementById("correct");

setTask(task);
myForm.addEventListener('submit', handleFormSubmit);
resetButton.addEventListener('click', () => handleResetButton(myForm, task))

