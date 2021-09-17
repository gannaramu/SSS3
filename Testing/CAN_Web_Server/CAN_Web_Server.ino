#include <SPI.h>
#include <Ethernet.h>
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


byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 1, 177);
IPAddress gateway(192, 168, 1, 1);
byte subnet[] = { 255, 255, 0, 0 };

// Ethernet client library.
EthernetServer server(9001);

// Command sent by the server.
byte command;

//A generic CAN Frame print function for the Serial terminal
void printFrame(CAN_message_t rxmsg, uint8_t channel, uint32_t RXCount)
{
  char CANdataDisplay[50];
  char CANBytes[4];
  char* name_with_extension;
  name_with_extension = malloc(strlen(CANdataDisplay) + strlen(CANBytes));
  sprintf(CANdataDisplay, "%d %12lu %12lu %08X %d %d", channel, RXCount, micros(), rxmsg.id, rxmsg.ext, rxmsg.len);
  strcpy(name_with_extension, CANdataDisplay); /* copy name into the new var */

  //  Serial.print(CANdataDisplay);
  for (uint8_t i = 0; i < rxmsg.len; i++) {

    sprintf(CANBytes, " %02X", rxmsg.buf[i]);
    strcat(name_with_extension, CANBytes);

    //    Serial.print(CANBytes);
  }
  Serial.println();
  Serial.print(name_with_extension);
  Serial.println();

//  server.write(name_with_extension, strlen(name_with_extension));

}
// The setup routine runs once when you press reset.
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

  // Initialize serial communication.
  Ethernet.init(10);  // Most Arduino shields
  Serial.begin(9600);
  Ethernet.begin(mac, ip, gateway, subnet);
  Serial.print("Manually assigned the following IP address to the Arduino:");
  Serial.println();
  Serial.println(Ethernet.localIP());

  // Check for Ethernet hardware.
  if (Ethernet.hardwareStatus() == EthernetNoHardware)
  {
    Serial.println("Ethernet shield was not found.");
  }

  // Check for Ethernet cable connection.
  if (Ethernet.linkStatus() == LinkOFF)
  {
    Serial.println("Ethernet cable is not connected.");
  }

  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  Serial.println("Starting CAN Autobaud Test.");

  //Initialize the CAN channels with autobaud setting
  Can0.begin(0);
#if defined(__MK66FX1M0__)
  Can1.begin(0);
#endif
}

// Main processing loop
void loop()
{
  // if an incoming client connects, there will be bytes available to read:
  EthernetClient client = server.available();

  if (client) {

    while (client.connected()) {
      if (client.available()) {
        Serial.println(client.read());
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
    }
  }
}
