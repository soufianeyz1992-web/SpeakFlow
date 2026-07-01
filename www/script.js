const synth = window.speechSynthesis;

const voiceSelect = document.getElementById("voice");
const langSelect = document.getElementById("lang");

let voices = [];

function loadVoices() {

    voices = synth.getVoices();

    voiceSelect.innerHTML = "";

    const selected = langSelect.value.substring(0,2);

    voices.forEach((voice,index)=>{

        if(voice.lang.startsWith(selected)){

            const option=document.createElement("option");

            option.value=index;

            option.textContent=voice.name+" ("+voice.lang+")";

            voiceSelect.appendChild(option);

        }

    });

    if(voiceSelect.options.length===0){

        voices.forEach((voice,index)=>{

            const option=document.createElement("option");

            option.value=index;

            option.textContent=voice.name+" ("+voice.lang+")";

            voiceSelect.appendChild(option);

        });

    }

}

speechSynthesis.onvoiceschanged = loadVoices;

setTimeout(loadVoices,1000);

langSelect.addEventListener("change",loadVoices);

function speak(){

    synth.cancel();

    const text=document.getElementById("text").value;

    if(text.trim()==="") return;

    const utter=new SpeechSynthesisUtterance(text);

    utter.lang=langSelect.value;

    utter.rate=parseFloat(document.getElementById("rate").value);

    utter.pitch=parseFloat(document.getElementById("pitch").value);

    if(voiceSelect.value!==""){

        utter.voice=voices[voiceSelect.value];

    }

    synth.speak(utter);

}

function pauseSpeech(){

    synth.pause();

}

function resumeSpeech(){

    synth.resume();

}

function stopSpeech(){

    synth.cancel();

}