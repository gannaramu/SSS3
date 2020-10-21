const int8_t greenLEDpin       = 2;
const int8_t redLEDpin         = 5;
const int8_t RelayPin         = 39;


void setup() {
  // put your setup code here, to run once:

  pinMode(greenLEDpin, OUTPUT);
  pinMode(redLEDpin, OUTPUT);
  pinMode(RelayPin, OUTPUT);

  digitalWrite(greenLEDpin, HIGH);
  digitalWrite(redLEDpin, HIGH);
  digitalWrite(RelayPin, HIGH);

  delay(1000);
  digitalWrite(greenLEDpin, HIGH);
  digitalWrite(redLEDpin, HIGH);
  digitalWrite(RelayPin, HIGH);


}

void loop() {
  // put your main code here, to run repeatedly:

  digitalWrite(greenLEDpin, HIGH);
  digitalWrite(RelayPin, HIGH);
  delay(1000);
  digitalWrite(greenLEDpin, LOW);
  digitalWrite(RelayPin, LOW);
  delay(1000);



}
