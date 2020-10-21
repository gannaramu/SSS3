const int8_t greenLEDpin       = 2;
const int8_t redLEDpin         = 5;


void setup() {
  // put your setup code here, to run once:
// Serial.begin(9600);
//  while(!Serial) {
//  }  
  Serial.println("\nDemo app,written by Simon Platten, 31/01/2015");
  pinMode(redLEDpin, OUTPUT);
  pinMode(greenLEDpin, OUTPUT);

//  digitalWrite(greenLEDpin, HIGH);
//  digitalWrite(redLEDpin, HIGH);
//  delay(1000);
//  digitalWrite(greenLEDpin, HIGH);
//  digitalWrite(redLEDpin, HIGH);

}

void loop() {
  // put your main code here, to run repeatedly:

  digitalWrite(greenLEDpin, 1);
  digitalWrite(redLEDpin, 1);
  delay(1000);
    Serial.println("\nDemo app,written by Simon Platten, 31/01/2015");

  digitalWrite(greenLEDpin, 0);
  digitalWrite(redLEDpin, 0);
    delay(1000);


}
