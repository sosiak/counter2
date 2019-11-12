content(document.body, "video-container");
createDiv("video-container", "overlay");
createVideoBackground("overlay", "video-container__background", "background-video.jpg", "background-video.mp4");
createDiv("video-container", "video-container__content");
//config
createConfig('config', ['red', 'green', 'blue'], ['pl', 'de', 'en']);
//counter
createDiv("video-container__content", "counter");
createDestinationDiv("destination-time", "destination-time__title", "destination-time__input", "time-input", "destination-time__error", "2019-12-15T20:00:00", "counter__button btn-add");
//listWatches
createDiv("video-container__content", "list-watches");
IsSafari();

const colors = document.querySelectorAll(".color");
for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", () => {
    changeTheme(colorsValues[k][0], colorsValues[k][1]);
  });
}

let inputValueInString = defaultInputValue("time-input");
let currentValueInString = convertDefaultInputValue(inputValueInString); // convert default value
let calculatorValue = calculateToListItem(currentValueInString);

const checkInput = document.getElementById(`time-input`);
let bigCalculate = () => {
  let inputDateValue = checkInput.value;
  let inputValueInStringAfterChange = inputDateValue.toLocaleString();
  let validateStatus = validateInputDate(inputDateValue, "time-input", lang[6][j], "destination-time__error");
  if (validateStatus === true) {
    currentValueInString = convertDateTime(inputValueInStringAfterChange);
    calculatorValue = calculateToListItem(currentValueInString);
    return calculatorValue;
  } else {
    let flagValidation = false;
    return flagValidation;
  }
};
intervalBigCalculator(1000);
currentValueInString = checkInput.addEventListener("change", bigCalculate); // modify default value

//smallWatches
let counters = [];
let uniID = 0;
let addBtn = document.querySelector(".btn-add");
addBtn.addEventListener("click", addBtnListener);
smallInterval(2000);
//lang
const plDiv = document.getElementById("pl");
const enDiv = document.getElementById("en");
const deDiv = document.getElementById('de');
plDiv.addEventListener("click", () => {
  const buttonWatch = document.querySelector(".btn-watch");
  updateTextInDiv(".destination-time__title", lang[5][j]);
  if (buttonWatch !== null) {
    updateTextInDiv(".btn-watch", lang[7][j]);
  }
});
enDiv.addEventListener("click", () => {
  const buttonWatch = document.querySelector(".btn-watch");
  updateTextInDiv(".destination-time__title", lang[5][j]);
  if (buttonWatch !== null) {
    updateTextInDiv(".btn-watch", lang[7][j]);
  }
});
checkVersion();
createDivWithText('video-container__content', 'footer', version, 'footer');