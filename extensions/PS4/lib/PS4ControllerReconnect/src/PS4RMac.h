#pragma once
#include <stdint.h>
#include <stdbool.h>
#include <string.h>
static inline int ps4rHex(char c) {
  if (c >= '0' && c <= '9') return c-'0';
  if (c >= 'a' && c <= 'f') return c-'a'+10;
  if (c >= 'A' && c <= 'F') return c-'A'+10;
  return -1;
}
static inline bool ps4rValidMac(const uint8_t* address) {
  if (!address || (address[0] & 1)) return false;
  uint8_t any = 0;
  for (int i=0;i<6;++i) any |= address[i];
  return any != 0;
}
static inline bool ps4rParseMac(const char* text, uint8_t* address) {
  if (!text || !address || strlen(text) != 17) return false;
  for (int i=0;i<6;++i) {
    int high=ps4rHex(text[3*i]), low=ps4rHex(text[3*i+1]);
    if (high < 0 || low < 0 || (i<5 && text[3*i+2] != ':')) return false;
    address[i]=(uint8_t)((high<<4)|low);
  }
  return ps4rValidMac(address);
}
static inline bool ps4rMakeBaseMac(const uint8_t* address, uint8_t* base) {
  if (!base || !ps4rValidMac(address)) return false;
  memcpy(base,address,6);
  unsigned borrow=2;
  for (int i=5;i>=0 && borrow;--i) {
    unsigned previous=base[i]; base[i]=(uint8_t)(previous-borrow);
    borrow=previous<borrow ? 1 : 0;
  }
  return !borrow && ps4rValidMac(base);
}
