const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const hourUpButton = document.getElementById('hour-up');
const hourDownButton = document.getElementById('hour-down');
const minuteUpButton = document.getElementById('minute-up');
const minuteDownButton = document.getElementById('minute-down');
const setAlarmButton = document.getElementById('set-alarm');
const clearAlarmButton = document.getElementById('clear-alarm');

const alarmHourElement = document.getElementById('alarm-hours');
const alarmMinuteElement = document.getElementById('alarm-minutes');

const alarmSound = document.getElementById('alarm-sound');

let alarmTimeoutId;

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
  
  checkAlarm(hours, minutes);
}

function checkAlarm(hours, minutes) {
  const alarmHours = alarmHourElement.textContent;
  const alarmMinutes = alarmMinuteElement.textContent;
  
  if (hours === alarmHours && minutes === alarmMinutes) {
    alarmSound.play();
    setAlarmButton.disabled = false;
    clearAlarmButton.disabled = false;
  }
}

function startClock() {
  updateTime();
  setInterval(updateTime, 1000);
}

startClock();

hourUpButton.addEventListener('click', () => {
  let hours = parseInt(alarmHourElement.textContent, 10);
  
  if (hours < 23) {
    hours++;
  } else {
    hours = 0;
  }
  
  alarmHourElement.textContent = hours.toString().padStart(2, '0');
  
  // add this condition to allow counting from 23 when hours is 0
  if (hours === 0 && parseInt(alarmMinuteElement.textContent, 10) === 0) {
    alarmMinuteElement.textContent = "59";
  }
});

hourDownButton.addEventListener('click', () => {
  let hours = parseInt(alarmHourElement.textContent, 10);
  
  // add this condition to allow counting from 23 when hours is 0
  if (hours === 0) {
    hours = 23;
  } else if (hours > 0) {
    hours--;
  }

    alarmHourElement.textContent = hours.toString().padStart(2, '0');
  
  // add this condition to allow counting from 59 when hours is 0 and minutes is 0
  if (hours === 0 && parseInt(alarmMinuteElement.textContent, 10) === 0) {
    alarmMinuteElement.textContent = "59";
  }
});

minuteUpButton.addEventListener('click', () => {
  let minutes = parseInt(alarmMinuteElement.textContent, 10);
  if (minutes < 59) {
    minutes++;
    alarmMinuteElement.textContent = minutes.toString().padStart(2, '0');
  }
});

minuteDownButton.addEventListener('click', () => {
  let minutes = parseInt(alarmMinuteElement.textContent, 10);
  
  // add this condition to allow counting from 59 when minutes is 0
  if (minutes === 0) {
    minutes = 59;
  } else if (minutes > 0) {
    minutes--;
  }
  
  alarmMinuteElement.textContent = minutes.toString().padStart(2, '0');
});


setAlarmButton.addEventListener('click', () => {
  setAlarmButton.disabled = true;
  clearAlarmButton.disabled = false;
  alarmTimeoutId = setTimeout(() => {
    alarmSound.play();
    setAlarmButton.disabled = false;
    clearAlarmButton.disabled = false;
  }, getTimeUntilAlarm());
});

clearAlarmButton.addEventListener('click', () => {
  clearTimeout(alarmTimeoutId);
  alarmSound.pause();
  alarmSound.currentTime = 0;
  setAlarmButton.disabled = false;
  clearAlarmButton.disabled = true;
  
  // add this line to clear the "Alarm is set!" message
  document.getElementById('alarm-status').textContent = "";
});


function getTimeUntilAlarm() {
  const now = new Date();
  const alarmHours = parseInt(alarmHourElement.textContent, 10);
  const alarmMinutes = parseInt(alarmMinuteElement.textContent, 10);
  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHours, alarmMinutes);
  
  if (alarmTime < now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }
  
  return alarmTime - now;
}
setAlarmButton.addEventListener('click', () => {
  setAlarmButton.disabled = true;
  clearAlarmButton.disabled = false;
  alarmTimeoutId = setTimeout(() => {
    alarmSound.play();
    setAlarmButton.disabled = false;
    clearAlarmButton.disabled = false;
  }, getTimeUntilAlarm());
  
  // add this line to display "Alarm is set!" message
  document.getElementById('alarm-status').textContent = "Alarm is set!";
});