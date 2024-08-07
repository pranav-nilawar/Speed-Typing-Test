let spinnerEl = document.getElementById("spinner");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");

let counter = 0;

function startCounting() {
    counter += 1
    timerEl.textContent = counter;
}

let counterVal = setInterval(startCounting, 1000);

function getQuotation() {
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");

    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");

            let quote = jsonData.content;
            quoteDisplayEl.textContent = quote;
        });
}

getQuotation();
startCounting();

resetBtnEl.onclick = function() {
    getQuotation();
    counter = 0;
    startCounting();
    resultEl.textContent = "";
    quoteInputEl.value = "";
};

submitBtnEl.onclick = function() {
    if (quoteInputEl.value === quoteDisplayEl.textContent) {
        clearInterval(counterVal);
        resultEl.textContent = "You typed In " + counter + " Seconds";
    } else {
        resultEl.textContent = "You typed Incorrect sentence";
    }
};