const int8_t greenLEDpin       = 2;
const int8_t redLEDpin         = 5;


void setup() {
  // put your setup code here, to run once:
 Serial.begin(9600);
  while(!Serial) {
  }  
  Serial.println("\nDemo app,written by Simon Platten, 31/01/2015");
  pinMode(PIN_D2, OUTPUT);
  pinMode(PIN_D5, OUTPUT);

//  digitalWrite(greenLEDpin, HIGH);
//  digitalWrite(redLEDpin, HIGH);
//  delay(1000);
//  digitalWrite(greenLEDpin, HIGH);
//  digitalWrite(redLEDpin, HIGH);

}

void loop() {
  // put your main code here, to run repeatedly:

  digitalWrite(PIN_D2, 1);
  digitalWrite(PIN_D5, 1);
  delay(1000);
    Serial.println("\nDemo app,written by Simon Platten, 31/01/2015");

  digitalWrite(PIN_D2, 0);
  digitalWrite(PIN_D5, 0);

}
