//languages
const lang = [
    ['dni', 'Tage', 'days'],
    ['dzień', 'Tag', 'day'],
    ['godz', 'h.', 'h.'],
    ['min.', 'min.', 'min.'],
    ['sek.', 'sec.', 'sec.'],
    ['Data', 'Datum', 'Date'],
    ['Błędna data', 'Falsches Datum', 'Incorrect date'],
    ['Oglądaj', 'abspielen', 'Play'],
    ['Powrót', 'Zurück', 'Back']
];
const colorsValues = [
    ['#EF2FA2', 'rgba(239,47,162,0.4)'],
    ['#5BFF62', 'rgba(91,255,98,0.4)'],
    ['#FFF851', 'rgba(255,248,81,0.4)'],
    ['#FF851B', 'rgba(0,0,0,0.4'],
    ['#7fdbff', 'rgba(127,219,255,0.4'],
    ['#FF0000', 'rgba(255,0,0,0.4'],
    ['#0000FF', 'rgba(0,0,255,0.4']
];
let j = 0; //lang index
let k = 0; //colors index

function content(place, nameClass) {
    const videoContainer = document.createElement('section');
    videoContainer.className = nameClass;
    place.appendChild(videoContainer);
}

function createVideoBackground(target, nameClass, posterFile, videoFile) {
    const videoBackground = document.createElement('video');
    videoBackground.className = nameClass
    videoBackground.setAttribute('poster', posterFile);
    videoBackground.setAttribute('muted', 'true');
    videoBackground.setAttribute('autoplay', 'true');
    videoBackground.setAttribute('loop', 'true');
    const srcMP4 = document.createElement('source');
    srcMP4.setAttribute('src', videoFile);
    srcMP4.setAttribute('type', 'video/mp4');
    videoBackground.appendChild(srcMP4);
    const place = document.querySelector(`.${target}`);
    place.appendChild(videoBackground);
}

function createDiv(where, nameClass, id) {
    const div = document.createElement('div');
    div.className = nameClass;
    div.id = id;
    const target = document.querySelector(`.${where}`);
    target.appendChild(div);
}

function createHeader(where, nameClass, text) {
    const headerInput = document.createElement('h1');
    headerInput.className = nameClass;
    headerInput.textContent = text;
    const target = document.querySelector(`.${where}`);
    target.appendChild(headerInput);
}

function createDateInputWithErrorDiv(where, nameClass, id, value, nameErrorClass) {
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', 'datetime-local');
    input.setAttribute('value', value);
    input.setAttribute('min', '2000-01-01T00:00');
    input.setAttribute('max', '2030-12-31T23:59');
    input.className = nameClass;
    const errorParagraph = document.createElement('p');
    errorParagraph.className = nameErrorClass;
    const target = document.querySelector(`.${where}`);
    target.appendChild(input);
    target.appendChild(errorParagraph);
}

function createButton(where, nameClass, text) {
    const addBtn = document.createElement('button');
    addBtn.className = nameClass;
    addBtn.textContent = text;
    const target = document.querySelector(`.${where}`);
    target.appendChild(addBtn);
}

function removeButton(where, nameClass) {
    const from = document.querySelector(`.${where}`);
    const btn = document.querySelector(`.${nameClass}`);
    from.removeChild(btn);
}

function createDivWithText(where, nameClass, text, id) {
    const div = document.createElement('div');
    div.className = nameClass;
    div.id = id;
    const target = document.querySelector(`.${where}`);
    target.appendChild(div);
    const element = document.querySelector(`#${id}`);
    element.textContent = text;
}

function updateTextInDiv(where, text) {
    const target = document.querySelector(`${where}`);
    target.textContent = text;
}

function createConfig(where, arrayColors, arrayLang) {
    createDiv("video-container__content", `${where}`);
    createDiv(`${where}`, "config__open-close");
    const openCloseIcon = (document.querySelector(".config__open-close").innerHTML =
        '<i class="fas fa-chevron-left"></i>');
    for (let i = 0; i < arrayColors.length; i++) {
        createDiv(`${where}`, `config__${arrayColors[i]} color`);
    }
    for (let j = 0; j < arrayLang.length; j++) {
        createDivWithText(`${where}`, "config__language", `${arrayLang[j].toUpperCase()}`, `${arrayLang[j]}`);
    }
    chooseLang();
    openClose();
    chooseColor();
}

function createDestinationDiv(whereDiv, classHeader, classInput, inputID, whereError, inputValue, classBtn) {
    createDiv("video-container__content", `${whereDiv}`);
    createHeader(`${whereDiv}`, `${classHeader}`, lang[5][j]);
    createDateInputWithErrorDiv(`${whereDiv}`, `${classInput}`, `${inputID}`, `${inputValue}`, `${whereError}`);
    createButton(`${whereDiv}`, `${classBtn}`, "+");
}

function createParagraphsCountTime(where, nameClassDays, nameClassHours, nameClassMinutes, nameClassSeconds) {
    const counterContainer = document.querySelector(`.${where}`);
    for (let i = 1; i <= 4; i++) {
        const createParagraph = document.createElement('p');
        createParagraph.textContent = ``;
        switch (i) {
            case 1:
                createParagraph.className = `${nameClassDays}`;
                break;
            case 2:
                createParagraph.className = `${nameClassHours}`;
                break;
            case 3:
                createParagraph.className = `${nameClassMinutes}`;
                break;
            case 4:
                createParagraph.className = `${nameClassSeconds}`;
                break;
        }
        counterContainer.appendChild(createParagraph);
    }
}

function removeParagraphsCountTime(where, nameClassElements) {
    const allParagraphs = document.querySelectorAll(`.${nameClassElements}`);
    const whereDelete = document.querySelector(`.${where}`);
    allParagraphs.forEach((e) => {
        whereDelete.removeChild(e);
    })
}
let is_safari;

function IsSafari() {
    if (navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome')) {
        is_safari = true;
    } else {
        is_safari = false;
    }
    return is_safari;
}
// defaultValue
function defaultInputValue(from) {
    const inputDate = document.getElementById(`${from}`);
    let inputDateValue = inputDate.value;
    let inputValueInString = inputDateValue.toLocaleString();
    return inputValueInString;
}

function convertDefaultInputValue(value) {
    if (is_safari) {
        let currentValueInString = value.substr(0, 10) + "T" + value.substr(11, 5) + ":00.000";
        return currentValueInString;
    } else {
        let currentValueInString = value.substr(0, 10) + " " + value.substr(11, 5) + ":00";
        return currentValueInString;
    }
}

function convertDateTime(value) {
    if (is_safari) {
        return dateStringChange = value.substr(0, 10) + "T" + value.substr(11, 5) + ":00.000";
    } else {
        return dateStringChange = value.substr(0, 10) + " " + value.substr(11, 5) + ":00";
    }

}

function validateInputDate(from, checkedInput, errorText, errorDiv) {
    let dateToValidate = new Date(from);
    const target = document.getElementById(`${checkedInput}`);
    const errDiv = document.querySelector(`.${errorDiv}`);
    if (isNaN(dateToValidate.getTime())) {
        errDiv.textContent = errorText;
        target.classList.add('destination-time__input--error');
        let validateStatus = false;
        return validateStatus;
    } else {
        errDiv.textContent = ``;
        target.classList.remove('destination-time__input--error');
        let validateStatus = true;
        return validateStatus;
    }
}

function calculateToListItem(endValue) {
    let start = new Date().getTime();
    let end;
    if (is_safari) {
        end = new Date(endValue).getTime() - 3600000;
    } else {
        end = new Date(endValue).getTime();
    }
    let counterElement = end - start;
    return counterElement;
}

function intervalBigCalculator(time) {
    createParagraphsCountTime('counter', 'counter__time days', 'counter__time hours', 'counter__time minutes', 'counter__time seconds');
    setInterval(() => {
        calculatorValue = bigCalculate();
        if (calculatorValue !== false) {
            const paragraphs = document.querySelectorAll('.counter__time');
            if (paragraphs.length === 0) {
                createParagraphsCountTime('counter', 'counter__time days', 'counter__time hours', 'counter__time minutes', 'counter__time seconds');
                createButton('destination-time', 'counter__button btn-add', '+');
                const allParagraphs = document.querySelectorAll('.counter__time');
                allParagraphs.forEach((e) => {
                    e.style.backgroundColor = `${colorsValues[k][1]}`;
                    e.style.border = `dotted ${colorsValues[k][0]} 5px`;
                })
                let addBtn = document.querySelector('.btn-add');
                addBtn.style.backgroundColor = `${colorsValues[k][0]}`;
                addBtn.addEventListener('click', addBtnListener);
            }
            let value = calculateToTimeValues(calculatorValue, time);
            convertTimeValues(value);
            updateValueInTimeDivs(value, 'days', 'hours', 'minutes', 'seconds');
            if (value.days === "00" && value.hours === "00" && value.minutes === "00" && value.seconds === "00") {
                removeParagraphsCountTime('counter', 'counter__time');
                removeButton('destination-time', 'btn-add');
                let btnWatch = document.querySelector('.btn-watch');
                if (btnWatch === null) {
                    createButton('counter', 'counter__button btn-watch', lang[7][j]);
                    const watchBtn = document.querySelector('.btn-watch');
                    watchBtn.style.backgroundColor = `${colorsValues[k][0]}`;
                }
            } else {
                let btnWatch = document.querySelector('.btn-watch');
                if (btnWatch !== null) {
                    removeButton('counter', 'btn-watch');
                }
            }
        } else {
            const addBtn = document.querySelector('.btn-add');
            const watchBtn = document.querySelector('.btn-watch');
            if (addBtn !== null) {
                removeParagraphsCountTime('counter', 'counter__time');
                removeButton('destination-time', 'btn-add');
            }
            if (watchBtn !== null) {
                removeButton('counter', 'btn-watch');
            }
        }
    }, time);
}

function calculateToTimeValues(value, time) {
    if (value > 0) {
        let values = {
            days: Math.floor(value / 86400000),
            hours: Math.floor((value - (Math.floor(value / 86400000) * 86400000)) / 3600000),
            minutes: Math.floor((value - (Math.floor(value / 86400000) * 86400000) - (Math.floor((value - (Math.floor(value / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000),
            seconds: Math.floor((value - (Math.floor(value / 86400000) * 86400000) - (Math.floor((value - (Math.floor(value / 86400000) * 86400000)) / 3600000) * 3600000) - (Math.floor((value - (Math.floor(value / 86400000) * 86400000) - (Math.floor((value - (Math.floor(value / 86400000) * 86400000)) / 3600000) * 3600000)) / 60000) * 60000)) / 1000),
        }
        value -= time;
        return values;
    } else {
        let values = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
        value -= time;
        return values;
    }
}

function convertTimeValues(object) {
    if (object.days < 10 && object.days >= 0) {
        object.days = `0${object.days}`;
    }
    if (object.hours < 10 && object.hours >= 0) {
        object.hours = `0${object.hours}`;
    }
    if (object.minutes < 10 && object.minutes >= 0) {
        object.minutes = `0${object.minutes}`;
    }
    if (object.seconds < 10 && object.seconds >= 0) {
        object.seconds = `0${object.seconds}`;
    }
}

function updateValueInTimeDivs(object, divFirst, divSecond, divThird, divFourth) {
    const daysDiv = document.querySelector(`.${divFirst}`);
    const hoursDiv = document.querySelector(`.${divSecond}`);
    const minutesDiv = document.querySelector(`.${divThird}`);
    const secondsDiv = document.querySelector(`.${divFourth}`);
    daysDiv.textContent = object.days;
    hoursDiv.textContent = object.hours;
    minutesDiv.textContent = object.minutes;
    secondsDiv.textContent = object.seconds;
    createDivWithText(divFirst, 'unit', lang[0][j], 'unit-days');
    createDivWithText(divSecond, 'unit', lang[2][j], 'unit-hours');
    createDivWithText(divThird, 'unit', lang[3][j], 'unit-minutes');
    createDivWithText(divFourth, 'unit', lang[4][j], 'unit-seconds');
}

function addBtnListener() {
    const valueWhenClick = bigCalculate();
    let smallValues = calculateToTimeValues(valueWhenClick, 1000);
    convertTimeValues(smallValues);
    uniID++;
    let newCounter = {
        valueInMiliseconds: valueWhenClick,
        valueInDays: smallValues.days,
        valueInHours: smallValues.hours,
        valueInMinutes: smallValues.minutes,
        valueInSeconds: smallValues.seconds,
        elementID: uniID,
        IDBtn: `counter-${uniID}-button`,
        removeButton: function () {
            const removeItem = document.querySelector(`.list-watches__element${newCounter.elementID}`);
            const listWatches = document.querySelector('.list-watches');
            listWatches.removeChild(removeItem);
        },
    };
    counters.push(newCounter);
    createDiv('list-watches', `list-watches__element${uniID}`, `counter${uniID}`);
    createParagraphsCountTime(`list-watches__element${uniID}`, `list-watches__element__time days${uniID}`, `list-watches__element__time hours${uniID}`, `list-watches__element__time minutes${uniID}`, `list-watches__element__time seconds${uniID}`);
    createButton(`list-watches__element${uniID}`, `list-watches__element__remove-button remove-button${uniID}`, 'X');
    const removeButton = document.querySelector(`.remove-button${uniID}`);
    const allSmallParagraphs = document.querySelectorAll('.list-watches__element__time');
    //style
    removeButton.style.backgroundColor = `${colorsValues[k][0]}`;
    allSmallParagraphs.forEach((e) => {
        e.style.backgroundColor = `${colorsValues[k][1]}`;
        e.style.border = `dotted ${colorsValues[k][0]} 5px`;
    })
    //
    removeButton.id = `counter-${newCounter.elementID}-button`;
    removeButton.addEventListener('click', newCounter.removeButton);
    removeButton.addEventListener('click', (e) => {
        for (let o = 0; o < counters.length; o++) {
            if (counters[o].IDBtn === e.target.id) {
                counters.splice(o, 1);
            }
        }
    })
}

function smallInterval(time) {
    setInterval(function () {
        for (let p = 0; p < counters.length; p++) {
            counters[p].valueInMiliseconds -= time;
            counters[p].valueInDays = Math.floor(counters[p].valueInMiliseconds / 86400000);
            counters[p].valueInHours = Math.floor((counters[p].valueInMiliseconds - (counters[p].valueInDays * 86400000)) / 3600000);
            counters[p].valueInMinutes = Math.floor((counters[p].valueInMiliseconds - (counters[p].valueInDays * 86400000) - (counters[p].valueInHours * 3600000)) / 60000);
            counters[p].valueInSeconds = Math.floor((counters[p].valueInMiliseconds - (counters[p].valueInDays * 86400000) - (counters[p].valueInHours * 3600000) - (counters[p].valueInMinutes * 60000)) / 1000);

            let elId = counters[p].elementID;
            let elementDays = document.querySelector(`.days${elId}`);
            let elementHours = document.querySelector(`.hours${elId}`);
            let elementMinutes = document.querySelector(`.minutes${elId}`);
            let elementSeconds = document.querySelector(`.seconds${elId}`);
            if (counters[p].valueInMiliseconds < 0) {
                elementDays.textContent = 0;
                elementHours.textContent = 0;
                elementMinutes.textContent = 0;
                elementSeconds.textContent = 0;
            } else {
                elementDays.textContent = counters[p].valueInDays;
                elementHours.textContent = counters[p].valueInHours;
                elementMinutes.textContent = counters[p].valueInMinutes;
                elementSeconds.textContent = counters[p].valueInSeconds;
            }
        }
    }, time);
}
//change language
function chooseLang() {
    if (pl !== null) {
        pl.addEventListener("click", () => {
            j = 0;
            return j;
        })
    }
    if (de !== null) {
        de.addEventListener("click", () => {
            j = 1;
            return j;
        })
    }
    if (en !== null) {
        en.addEventListener("click", () => {
            j = 2;
            return j;
        })
    }

}

function openClose() {
    const config = document.querySelector('.config');
    const leftRightArrow = document.querySelector('i');
    let flagRotation = true;
    leftRightArrow.addEventListener("click", () => {
        if (flagRotation === true) {
            leftRightArrow.style.transform = 'rotate(180deg) translate(-20px, 0)';
            flagRotation = false;
            config.style.transform = 'translate(-250px, 0)';
        } else {
            leftRightArrow.style.transform = 'rotate(0deg) translate(0, 0)';
            config.style.transform = 'translate(0, 0)';
            flagRotation = true;
        }
    });
}

function chooseColor() {
    const purpleDiv = document.querySelector('.config__purple');
    const greenDiv = document.querySelector('.config__green');
    const yellowDiv = document.querySelector('.config__yellow');
    const orangeDiv = document.querySelector('.config__orange');
    const aquaDiv = document.querySelector('.config__aqua');
    const redDiv = document.querySelector('.config__red');
    const blueDiv = document.querySelector('.config__blue');
    if (purpleDiv !== null) {
        purpleDiv.addEventListener('click', () => {
            k = 0;
            return k;
        })
    }
    if (greenDiv !== null) {
        greenDiv.addEventListener('click', () => {
            k = 1;
            return k;
        })
    }
    if (yellowDiv !== null) {
        yellowDiv.addEventListener('click', () => {
            k = 2;
            return k;
        })
    }
    if (orangeDiv !== null) {
        orangeDiv.addEventListener('click', () => {
            k = 3;
            return k;
        })
    }
    if (aquaDiv !== null) {
        aquaDiv.addEventListener('click', () => {
            k = 4;
            return k;
        })
    }
    if (redDiv !== null) {
        redDiv.addEventListener('click', () => {
            k = 5;
            return k;
        })
    }
    if (blueDiv !== null) {
        blueDiv.addEventListener('click', () => {
            k = 6;
            return k;
        })
    }
}

function changeTheme(mainColor, bgColor) {
    const config = document.querySelector('.config');
    const listWatches = document.querySelector('.list-watches');
    const leftRightArrow = document.querySelector('.fas');
    const footer = document.querySelector('.footer');
    footer.style.backgroundColor = `${bgColor}`;
    config.style.backgroundColor = `${bgColor}`;
    listWatches.style.backgroundColor = `${bgColor}`;
    leftRightArrow.style.color = `${mainColor}`;
    const allParagraphs = document.querySelectorAll('.counter__time');
    allParagraphs.forEach((e) => {
        e.style.border = `dotted ${mainColor} 5px`;
        e.style.backgroundColor = `${bgColor}`;
    })
    const allListElementsParagraphs = document.querySelectorAll('.list-watches__element__time');
    allListElementsParagraphs.forEach((e) => {
        e.style.border = `dotted ${mainColor} 5px`;
        e.style.backgroundColor = `${bgColor}`;
    })
    const allLanguageBtn = document.querySelectorAll('.config__language');
    allLanguageBtn.forEach((e) => {
        e.style.border = `solid ${mainColor} 1px`;
        e.style.backgroundColor = `${bgColor}`;
    })
    const button = document.querySelector('.counter__button');
    if (button !== null) {
        button.style.backgroundColor = `${mainColor}`;
    }
    const btnRemove = document.querySelectorAll('.list-watches__element__remove-button');
    if (btnRemove !== null) {
        btnRemove.forEach((e) => {
            e.style.backgroundColor = `${mainColor}`;
        })
    }
}