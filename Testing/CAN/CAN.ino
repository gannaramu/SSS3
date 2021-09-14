// -------------------------------------------------------------
// CANtest for Teensy 3.6 dual CAN bus
// by Collin Kidder, Based on CANTest by Pawelsky (based on CANtest by teachop)
//
// Both buses are left at default 250k speed and the second bus sends frames to the first
// to do this properly you should have the two buses linked together. This sketch
// also assumes that you need to set enable pins active. Comment out if not using
// enable pins or set them to your correct pins.
//
// This sketch tests both buses as well as interrupt driven Rx and Tx. There are only
// two Tx buffers by default so sending 5 at a time forces the interrupt driven system
// to buffer the final three and send them via interrupts. All the while all Rx frames
// are internally saved to a software buffer by the interrupt handler.
//

#include "src/FlexCAN_Library/src/FlexCAN.h"
const int8_t greenLEDpin       = 2;
const int8_t redLEDpin         = 5;
const int8_t RelayPin         = 39;
//Create a counter to keep track of message traffic
uint32_t RXCount0 = 0;
uint32_t RXCount1 = 0;

//Define message structure from FlexCAN library
static CAN_message_t rxmsg;

boolean LED_state;

//A generic CAN Frame print function for the Serial terminal
void printFrame(CAN_message_t rxmsg, uint8_t channel, uint32_t RXCount)
{
  char CANdataDisplay[50];
  sprintf(CANdataDisplay, "%d %12lu %12lu %08X %d %d", channel, RXCount, micros(), rxmsg.id, rxmsg.ext, rxmsg.len);
  Serial.print(CANdataDisplay);
  for (uint8_t i = 0; i < rxmsg.len; i++) {
    char CANBytes[4];
    sprintf(CANBytes, " %02X", rxmsg.buf[i]);
    Serial.print(CANBytes);
  }
  Serial.println();
}

void setup()
{

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
  pinMode(LED_BUILTIN, OUTPUT);
  LED_state = true;
  digitalWrite(LED_BUILTIN, LED_state);

  while (!Serial);
  Serial.println("Starting CAN Autobaud Test.");

  //Initialize the CAN channels with autobaud setting
  Can0.begin(0);
#if defined(__MK66FX1M0__)
  Can1.begin(0);
#endif
}

void loop()
{
  while (Can0.read(rxmsg)) {
    printFrame(rxmsg, 0, RXCount0++);
    LED_state = !LED_state;
    digitalWrite(LED_BUILTIN, LED_state);
    digitalWrite(redLEDpin, LED_state);
  }
#if defined(__MK66FX1M0__)
  while (Can1.read(rxmsg)) {
    printFrame(rxmsg, 1, RXCount1++);
    LED_state = !LED_state;
    digitalWrite(LED_BUILTIN, LED_state);
    digitalWrite(redLEDpin, LED_state);
  }
#endif
}
