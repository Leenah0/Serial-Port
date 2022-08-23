
void setup() {
 Serial.begin(9600);
 //pinMode(13 ,OUTPUT);

}

void loop() {
  String data = Serial.readString();

  if(data.indexOf("open") > -1){
   // digitalWrite(13, HIGH)
    //delay(2000);
    Serial.println(2);
 
    
  }else if(data.indexOf("close") > -1){
   // digitalWrite(13, LOW)
    //delay(2000);
    Serial.println(3);

  } 
  

}
