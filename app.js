const buttonTalk = document.querySelector(".talk");
const talkBtn = document.getElementById("talk");
const readBtn = document.getElementById("read");
const content = document.querySelector(".content");
const buttonRead = document.querySelector(".read");
const contentToRead = document.querySelector(".contentToRead");
const clearButton = document.querySelector(".clear");
const alerts = document.querySelector(".alerts");
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

clearButton.addEventListener("click", () => {
  content.textContent = "";
  contentToRead.value = "";
  alerts.textContent = "";
});

buttonTalk.addEventListener("click", () => {
  talkBtn.classList.add("active");
  recognition.start();
});

buttonRead.addEventListener("click", () => {
  const readit = contentToRead.value;
  if (readit !== "") {
    readBtn.classList.add("active");
    readLoud(readit);
  } else {
    alerts.textContent = "No text to read";
  }
});

// Functions
recognition.onstart = function () {
  console.log("voice is active, shoot!");
};

recognition.onresult = function (event) {
  talkBtn.classList.remove("active");
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
};

function readLoud(content) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = content;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
  setTimeout(function () {
    readBtn.classList.remove("active");
  }, 2000);
}
