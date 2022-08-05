import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateChosen = document.querySelector('#datetime-picker');
const date = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = true;

//flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    // const currentDate = new Date();
    if (selectedDate[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;

      startBtn.addEventListener('click', countTime);

      // time counter

      function countTime() {
        timer = setInterval(() => {
          startBtn.disabled = true;

          

          const chooseDate = new Date(dateChosen.value.replace(/-/g, '/')).getTime();
          const now = new Date().getTime();
          const remainTime = chooseDate - now;

          const { days, hours, minutes, seconds } = convertedMsec(remainTime );

          date.innerHTML = days < 10 ? zeroing(days) : days;
          hour.innerHTML = hours < 10 ? zeroing(hours) : hours;
          minute.innerHTML = minutes < 10 ? zeroing(minutes) : minutes;
          second.innerHTML = seconds < 10 ? zeroing(seconds) : seconds;

          if (remainTime  < 1000) {
            clearInterval(timer);
            startBtn.disabled = false;
          }
        }, 1000);
      }

      // zeroing

      function zeroing(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }

      //  convertedMsec
      
      function convertedMsec(ms) {
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
    }
  },
};

flatpickr(dateChosen, options);