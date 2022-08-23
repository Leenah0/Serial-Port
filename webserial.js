
  
  
  var port; 
  
  document.querySelector('#connect').addEventListener('click', async () => {
  // Prompt user to select any serial port.

  port = await navigator.serial.requestPort();
  await port.open({baudRate: 9600});

  
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();
  
 while(true){
     const{value, done} = await reader.read();
     if(done){
      reader.releaseLock();
      break;
     }
console.log(value);
 }

});


function Speech_To_Text() {
var output = document.getElementById("output")
var SpeechToText = document.getElementById("SpeechToText")

window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();


  recognition.onstart = function(){
    SpeechToText.innerHTML = " تحدث من فضلك ... تستطيع أن تقول افتح أو اقفل "
  };

  recognition.onspeechend = function() {
    SpeechToText.innerHTML = "<small>توقف الاستماع ... </small>";
    recognition.stop();
}

recognition.onresult = function(event){
var transcript = event.results[0][0].transcript;
output.innerHTML = transcript;
output.classList.remove("hide");

if (transcript == "افتح"){
  console.log(transcript);
  send("open");
} 
else if (transcript == "اقفل") {
  console.log(transcript);
  send("close");
} } ;


recognition.start();

}


async function send(text){
  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter();
  await writer.write(text);
  writer.close();
  await writableStreamClosed;			
}


