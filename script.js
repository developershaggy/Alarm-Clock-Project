// accessing elements for DOM manipulation
const liveTime = document.querySelector("h1"),
  innercontent = document.querySelector(".innercontent"),
  menuSelection = document.querySelectorAll("select"),
  alarmButton = document.querySelector("button");

// defining variables
let alarmTiming,
  alarmCheck = false,
  alarmRingtone = new Audio("./alarmringtone.mp3");

// setting the values of hours for the selection
for (let i = 12; i > 0; i--) {
  if (i < 10) {
    i = "0" + i;
  }
  let option = `<option value="${i}">${i}</option>`;
  menuSelection[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// setting the values of minute for the selection
for (let i = 59; i >= 0; i--) {
  if (i < 10) {
    i = "0" + i;
  }
  let option = `<option value="${i}">${i}</option>`;
  menuSelection[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// setting the values of AM/PM for the selection
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  menuSelection[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// getting the live time and setting to the HTML
setInterval(() => {
  // for getting the Hours Minutes and Seconds
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  // making the clock in the 12hours zone
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  //If the hour value gets Zero, set it to 0
  h = h == 0 ? (h = 12) : h;

  //adding 0 before hour, minutes and second if their value is less than 10;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // updating the live time in the HTML doc
  liveTime.innerText = `${h}:${m}:${s} ${ampm}`;

  //condition for palying alarm for the set time
  if (alarmTiming == `${h}:${m} ${ampm}`) {
    alarmRingtone.play();
    alarmRingtone.loop = true;
  }
}, 1000);

function setAlarm() {
  if (alarmCheck) {
    //if alarmcheck is set true
    alarmTiming = ""; //clearing the value of alarm time that was set
    alarmRingtone.pause(); //stopping the ringtone
    innercontent.classList.remove("disable");
    alarmButton.innerText = "Set Alarm";
    return (alarmCheck = false); // returning alarmcheck value to false
  }

  let time = `${menuSelection[0].value}:${menuSelection[1].value} ${menuSelection[2].value}`;

  //handling case when user doesn't set and value to alarm
  if (
    time.includes("Hour") ||
    time.includes("minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please set a valid time to set the Alarm!");
  }

  alarmCheck = true;
  alarmTiming = time;
  innercontent.classList.add("disable");
  alarmButton.innerText = "Discard Alarm"; //upadting the inner text to disable after alarm is set
}

//linking the button to the function on the click event
alarmButton.addEventListener("click", setAlarm);
