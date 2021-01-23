const audioJoke = document.getElementById("audio-joke");
const tellJoke = document.getElementById("tell-joke");
const dolfine = document.getElementById("dolfine");
const API_PARAMS = {
  key: "6f46543dc9044128bdfbe640e8853fba",
  src: "",
  hl: "en-us",
  v: "Linda",
  r: 0,
  c: "mp3",
  f: "44khz_16bit_stereo",
  ssml: false,
};

const API_URL = "https://official-joke-api.appspot.com/random_joke";

function onAudioCompletePlaying() {
  dolfine.src = "img/crazy_dolffine.gif";
  setTimeout(() => {
    dolfine.src = "img/dolfine.png";
    tellJoke.disabled = false;
  }, 3500);
}

async function getRandomJoke() {
  try {
    const respone = await fetch(API_URL);
    const data = await respone.json();
    API_PARAMS.src = `${data.setup}.  ${data.punchline} `;
  } catch (error) {
    console.log(error);
  }
}

async function playAudio() {
  // audioSdk.js
  tellJoke.disabled = true;
  await getRandomJoke();
  VoiceRSS.speech(API_PARAMS, audioJoke);
}

//Event listner

tellJoke.addEventListener("click", playAudio);

audioJoke.addEventListener("ended", onAudioCompletePlaying);
