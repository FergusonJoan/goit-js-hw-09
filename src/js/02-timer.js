import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  value: document.querySelectorAll('.value'),
  label: document.querySelectorAll('.label'),
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let userDate = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      refs.start.disabled = false;
      userDate = selectedDates[0];
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      refs.start.disabled = true;
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const components = convertMs(deltaTime);

      refs.days.textContent = addLeadingZero(components.days);
      refs.hours.textContent = addLeadingZero(components.hours);
      refs.minutes.textContent = addLeadingZero(components.minutes);
      refs.seconds.textContent = addLeadingZero(components.seconds);

      if (deltaTime <= 0) {
        clearInterval(timer);
        return;
      }
    }, 1000);
  }
}

const timer = new Timer();
refs.start.addEventListener('click', () => {
  if (userDate !== null) {
    timer.start();
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(140000));

flatpickr('input[type=text]', options);
