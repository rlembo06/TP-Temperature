#include "mrfi.h"
#include "radios/family1/mrfi_spi.h"

int main(void)
{
  BSP_Init();
  P1REN |= 0x04;
  P1IE |= 0x04;
  MRFI_Init();
  MRFI_WakeUp();
  //mrfiSpiWriteReg(CHANNR, 0x15); // Indication du port de communication
  MRFI_RxOn();
  
  // Initialisation UART :
  P3SEL |= 0x30;
  UCA0CTL1 = UCSSEL_2;
  UCA0BR0 = 0x41;
  UCA0BR1 = 0x3;
  UCA0MCTL = UCBRS_2;
  UCA0CTL1 &=~UCSWRST;
  
  __bis_SR_register(GIE+LPM4_bits);
}

void MRFI_RxCompleteISR()
{
  int i;
  mrfiPacket_t packet;
  
  MRFI_Receive(&packet);
  //char output [] = {"   \r\n"};
  char output[] = {"                  "};
  for (i=9; i<26; i++){
    output[i-9] = packet.frame[i];
  }
  
  TXString(output, sizeof output);
  TXString("\n\r", 1);
  //TXString("essai\n\r", 6);
  
  P1OUT ^= 0x02;
} 

/* 
?~??????23.5C 00.5

void MRFI_RxCompleteISR()
{
  int i;
  mrfiPacket_t packet;
  
  MRFI_Receive(&packet);
  //char output [] = {"   \r\n"};
  char output[] = {"                  "};
  for (i=1; i<26; i++){
    output[i] = packet.frame[i];
  }
  
  TXString(output, sizeof output);
  TXString("\n\r", 1);
  //TXString("essai\n\r", 6);
  
  P1OUT ^= 0x02;
}
*/

/*
Origine

void MRFI_RxCompleteISR()
{
  int i;
  mrfiPacket_t packet;
  
  MRFI_Receive(&packet);
  //char output [] = {"   \r\n"};
  char output[] = {"                  "};
  for (i=9; i<26; i++){
    output[i-9] = packet.frame[i];
  }
  
  TXString(output, sizeof output);
  TXString("\n\r", 1);
  //TXString("essai\n\r", 6);
  
  P1OUT ^= 0x02;
} 
*/

#pragma vector=PORT1_VECTOR
__interrupt void Port_1 (void)
{
  P1IFG &= ~0x04;
  mrfiPacket_t packet;
  packet.frame[0]=8+20;
  MRFI_Transmit(&packet, MRFI_TX_TYPE_FORCED);
  P1OUT ^= 0x01;
}


// ------------------------------------------- //
// Origine :
/*
#include "mrfi.h"
#include "radios/family1/mrfi_spi.h"

int main(void)
{
  BSP_Init();
  P1REN |= 0x04;
  P1IE |= 0x04;
  MRFI_Init();
  MRFI_WakeUp();
  MRFI_RxOn();
  __bis_SR_register(GIE+LPM4_bits);
}

void MRFI_RxCompleteISR()
{
  P1OUT ^= 0x02;
}

#pragma vector=PORT1_VECTOR
__interrupt void Port_1 (void)
{
  P1IFG &= ~0x04;
  mrfiPacket_t packet;
  packet.frame[0]=8+20;
  MRFI_Transmit(&packet, MRFI_TX_TYPE_FORCED);
  P1OUT ^= 0x01;
}
*/