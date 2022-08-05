function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const colorValue = document.querySelector('.color');

let timerId = null;

// function switch random color 

const bgrColorSwitcher = function () {
  body.style.backgroundColor = getRandomHexColor();
  body.style.color = getRandomHexColor();
  colorValue.textContent = getRandomHexColor();
};

// start changing color

btnStart.addEventListener('click', () => {
  timerId = setInterval(bgrColorSwitcher, 1000);
  btnStart.disabled = true;
});

// stop changing color

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
});
