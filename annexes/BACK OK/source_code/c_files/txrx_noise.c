#include "mrfi.h"
#include "radios/family1/mrfi_spi.h"
void print_rssi(int8_t rssi)
{
  char output[] = {" 000 "};
  if (rssi<0) {output[0]='-';rssi=-rssi;}
  output[1] = '0'+((rssi/100)%10);
  output[2] = '0'+((rssi/10)%10);
  output[3] = '0'+ (rssi%10);
  TXString(output, (sizeof output)-1);
}
int main(void)
{
  int8_t rssi;
  uint8_t channel;
  BSP_Init();
  MRFI_Init();
  P3SEL    |= 0x30;
  UCA0CTL1  = UCSSEL_2;
  UCA0BR0   = 0x41;
  UCA0BR1   = 0x3;
  UCA0MCTL  = UCBRS_2;                     
  UCA0CTL1 &= ~UCSWRST;
  MRFI_WakeUp();
  __bis_SR_register(GIE);
  while(1) {
    for (channel=0;channel<200;channel++) {
      MRFI_RxIdle();
      mrfiSpiWriteReg(CHANNR,channel);
      MRFI_RxOn();
      rssi=MRFI_Rssi();
      print_rssi(rssi);
    }
    TXString("\n",1);
  }
}
void MRFI_RxCompleteISR()
{
}
