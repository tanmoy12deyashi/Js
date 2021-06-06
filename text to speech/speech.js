// speak "Hello World" in the browser default language
//window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hello World'));

// get text
let speechText = document.getElementById('speech-text').innerText;
// get speech array
let speechTextArr = speechText.split(' ');
// set default variable
let t, s, e;
// init obj
let utterance = new SpeechSynthesisUtterance(speechText);

utterance.onstart  = function() {
    t = 0, s= 0, e = 0;
	console.log('Speech has started');
}

utterance.onend = function() {
    // finished speech
	console.log('Speech has finished');
    // update html
    document.getElementById('speech-text').innerHTML = speechText;
    // show read again btn
    document.getElementById('read-again').classList.remove('hide');
}

utterance.onboundary  = function() {
    // update start
    s = e;
    // update end
    e = s + speechTextArr[t].length + 1;

    //console.log(speechText.substring(0,s) + '"' +speechText.substring(s,e-1) + '"' + speechText.substring(e,speechText.length))
    // mark current text
    innerHTML = speechText.substring(0,s) + '<mark>' +speechText.substring(s,e-1) + '</mark> ' + speechText.substring(e,speechText.length);
    // update text
    document.getElementById('speech-text').innerHTML = innerHTML;
    // next word
    t++;
}
function speak() {
    // speeck start
    window.speechSynthesis.speak(utterance);
}
// init speak
speak();

document.getElementById('pause-speech').onclick = () => {
    // pause if speech
    if (speechSynthesis) speechSynthesis.pause();
    // hide pause speech btn
    document.getElementById('pause-speech').classList.add('hide');
    // show play speech btn
    document.getElementById('play-speech').classList.remove('hide');
}

document.getElementById('play-speech').onclick = () => {
    // play if speech
    if (speechSynthesis) speechSynthesis.resume();
    // hide play speech btn
    document.getElementById('play-speech').classList.add('hide');
    // show pause speech btn
    document.getElementById('pause-speech').classList.remove('hide');
}

document.getElementById('read-again').onclick = () => {
    // speak again
    speak();
    // hide read again btn
    document.getElementById('read-again').classList.add('hide');
}