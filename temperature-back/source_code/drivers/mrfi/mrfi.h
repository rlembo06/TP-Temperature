/**************************************************************************************************
  Revised:        $Date: 2007-07-06 11:19:00 -0700 (Fri, 06 Jul 2007) $
  Revision:       $Revision: 13579 $

  Copyright 2007 Texas Instruments Incorporated.  All rights reserved.

  IMPORTANT: Your use of this Software is limited to those specific rights granted under
  the terms of a software license agreement between the user who downloaded the software,
  his/her employer (which must be your employer) and Texas Instruments Incorporated (the
  "License"). You may not use this Software unless you agree to abide by the terms of the
  License. The License limits your use, and you acknowledge, that the Software may not be
  modified, copied or distributed unless embedded on a Texas Instruments microcontroller
  or used solely and exclusively in conjunction with a Texas Instruments radio frequency
  transceiver, which is integrated into your product. Other than for the foregoing purpose,
  you may not use, reproduce, copy, prepare derivative works of, modify, distribute,
  perform, display or sell this Software and/or its documentation for any purpose.

  YOU FURTHER ACKNOWLEDGE AND AGREE THAT THE SOFTWARE AND DOCUMENTATION ARE PROVIDED �AS IS�
  WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY
  WARRANTY OF MERCHANTABILITY, TITLE, NON-INFRINGEMENT AND FITNESS FOR A PARTICULAR PURPOSE.
  IN NO EVENT SHALL TEXAS INSTRUMENTS OR ITS LICENSORS BE LIABLE OR OBLIGATED UNDER CONTRACT,
  NEGLIGENCE, STRICT LIABILITY, CONTRIBUTION, BREACH OF WARRANTY, OR OTHER LEGAL EQUITABLE
  THEORY ANY DIRECT OR INDIRECT DAMAGES OR EXPENSES INCLUDING BUT NOT LIMITED TO ANY
  INCIDENTAL, SPECIAL, INDIRECT, PUNITIVE OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST
  DATA, COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY, SERVICES, OR ANY CLAIMS BY
  THIRD PARTIES (INCLUDING BUT NOT LIMITED TO ANY DEFENSE THEREOF), OR OTHER SIMILAR COSTS.

  Should you have any questions regarding your right to use this Software,
  contact Texas Instruments Incorporated at www.TI.com.
**************************************************************************************************/

/* ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
 *   MRFI (Minimal RF Interface)
 *   Include file for all MRFI services.
 * ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
 */

#ifndef MRFI_H
#define MRFI_H


/* ------------------------------------------------------------------------------------------------
 *                                          Includes
 * ------------------------------------------------------------------------------------------------
 */
#include "bsp.h"
#include "mrfi_defs.h"
#include "mrfi.h"


/* ------------------------------------------------------------------------------------------------
 *                                          Defines
 * ------------------------------------------------------------------------------------------------
 */
#define MRFI_NUM_LOGICAL_CHANS           __mrfi_NUM_LOGICAL_CHANS__

/* return values for MRFI_Transmit */
#define MRFI_TX_RESULT_SUCCESS        0
#define MRFI_TX_RESULT_FAILED         1

/* transmit type parameter for MRFI_Transmit */
#define MRFI_TX_TYPE_FORCED           0
#define MRFI_TX_TYPE_CCA              1

/* if external code has defined a maximum payload, use that instead of default */
#ifdef MAX_APP_PAYLOAD
#define MRFI_MAX_PAYLOAD_SIZE  (MAX_APP_PAYLOAD+3) /* SimpliciTI payload size plus three byte overhead */
#endif

/* frame definitions */
#define MRFI_ADDR_SIZE              __mrfi_ADDR_SIZE__
#ifndef MRFI_MAX_PAYLOAD_SIZE
#define MRFI_MAX_PAYLOAD_SIZE       __mrfi_MAX_PAYLOAD_SIZE__
#endif
#define MRFI_MAX_FRAME_SIZE         (MRFI_MAX_PAYLOAD_SIZE + __mrfi_FRAME_OVERHEAD_SIZE__)
#define MRFI_RX_METRICS_SIZE        __mrfi_RX_METRICS_SIZE__
#define MRFI_RX_METRICS_RSSI_OFS    __mrfi_RX_METRICS_RSSI_OFS__
#define MRFI_RX_METRICS_CRC_LQI_OFS __mrfi_RX_METRICS_CRC_LQI_OFS__

/* Radio States */
#define MRFI_RADIO_STATE_UNKNOWN  0
#define MRFI_RADIO_STATE_OFF      1
#define MRFI_RADIO_STATE_IDLE     2
#define MRFI_RADIO_STATE_RX       3

/* ------------------------------------------------------------------------------------------------
 *                                          Macros
 * ------------------------------------------------------------------------------------------------
 */
#define MRFI_GET_PAYLOAD_LEN(p)         __mrfi_GET_PAYLOAD_LEN__(p)
#define MRFI_SET_PAYLOAD_LEN(p,x)       __mrfi_SET_PAYLOAD_LEN__(p,x)

#define MRFI_P_DST_ADDR(p)              __mrfi_P_DST_ADDR__(p)
#define MRFI_P_SRC_ADDR(p)              __mrfi_P_SRC_ADDR__(p)
#define MRFI_P_PAYLOAD(p)               __mrfi_P_PAYLOAD__(p)

/* ------------------------------------------------------------------------------------------------
 *                                          Typdefs
 * ------------------------------------------------------------------------------------------------
 */
typedef struct
{
  uint8_t frame[MRFI_MAX_FRAME_SIZE];
  uint8_t rxMetrics[MRFI_RX_METRICS_SIZE];
} mrfiPacket_t;


/* ------------------------------------------------------------------------------------------------
 *                                         Prototypes
 * ------------------------------------------------------------------------------------------------
 */
void MRFI_Init(void);

uint8_t MRFI_Transmit(mrfiPacket_t * pPacket, uint8_t txType);

void MRFI_justTransmit(mrfiPacket_t * pPacket); //poipoi
int8_t Mrfi_CalculateRssi(uint8_t rawValue); //poipoi

void MRFI_Receive(mrfiPacket_t * pPacket);
void MRFI_RxCompleteISR(void); /* populated by code using MRFI */

uint8_t MRFI_GetRadioState(void);

void MRFI_RxOn(void);
void MRFI_RxWor(void); //poipoi
void MRFI_RxIdle(void);
void Mrfi_RxModeOff(void);//poipoi

int8_t MRFI_Rssi(void);

void MRFI_SetLogicalChannel(uint8_t chan);

uint8_t MRFI_SetRxAddrFilter(uint8_t * pAddr);
void MRFI_EnableRxAddrFilter(void);
void MRFI_DisableRxAddrFilter(void);

void MRFI_Sleep(void);
void MRFI_WakeUp(void);

uint8_t MRFI_RandomByte(void);
void MRFI_DelayMs(uint16_t milliseconds);
void MRFI_ReplyDelay(void);
void MRFI_PostKillSem(void);

/* ------------------------------------------------------------------------------------------------
 *                                       Global Constants
 * ------------------------------------------------------------------------------------------------
 */
extern const uint8_t mrfiBroadcastAddr[];


/**************************************************************************************************
 */
#endif
