/* RGB Analog Example, Teensyduino Tutorial #2
   http://www.pjrc.com/teensy/tutorial2.html

   This example code is in the public domain.
*/
#include <SPI.h>
#include "SSS3_board_defs_rev_1.h"

const int pwm1 =  29;
const int pwm2 =  30;
const int pwm3 =  14;
const int pwm4 =  22;

void setup()   {
  pinMode(pwm1, OUTPUT);
  pinMode(pwm1, OUTPUT);
  pinMode(pwm3, OUTPUT);
  pinMode(pwm4, OUTPUT);
  pinMode(CSconfigBPin, OUTPUT);
  while (! Serial); 
  Serial.println("Starting PWM Test.");
  SPI1.begin();

}
boolean flag = true;
void loop()
{

  if (flag) {
    uint8_t PWMSettings =  uint8_t( true | true << 1 | true << 2 |  true << 3 |
                                    true << 4 | true << 5 | true << 6 | true << 7);
    //  uint8_t PWMSettings =  uint8_t( false | false << 1 | false << 2 |  false << 3 |
    //                                 false << 4 | false << 5 | false << 6 | false << 7);
                                    
  // uint8_t PWMSettings =  uint8_t( CAN0term | CAN1term << 1 | CAN2term << 2 |  LINmaster << 3 |
  //                                PWM1Out << 4 | PWM2Out << 5 | PWM3Out << 6 | PWM4Out << 7);
//  
    Serial.print("CSconfigBpin: ");
    Serial.println(CSconfigBPin);
    Serial.print(" PWMSettings: ");
    Serial.println(PWMSettings, BIN);
    digitalWrite(CSconfigBPin, LOW);
    SPI1.transfer(PWMSettings);
    digitalWrite(CSconfigBPin, HIGH);
//    flag = false;
  }
    analogWrite(pwm1, 10);
    analogWrite(pwm2, 125);
    analogWrite(pwm3, 125);
    analogWrite(pwm4, 125);
    delay(100);

}
