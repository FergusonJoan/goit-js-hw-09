// *Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
// ?ВНИМАНИЕ, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).
// *Для генерации случайного цвета используй функцию getRandomHexColor.

const startBtnEl = document.querySelector('button[data-start');
const stopBtnEl = document.querySelector('button[data-stop');
const docEl = document.querySelector('body');

let timerId = null;

startBtnEl.addEventListener('click', () => {
  if (timerId !== null) {
    return;
  }
  timerId = setInterval(() => {
    docEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
