export const deconv = (raw_text: string): string => {
  const strin = raw_text.toUpperCase();
  let str1: string = "";
  const strout = tansaku(strin, 1);
  str1 = fix(strout);
  return str1;
};

const tansaku = (str: string, nmode: number): string => {
  let val = "";
  let f = 0;
  let chr;
  let dtkind = 0;
  let err = 0;
  let strout = "";

  for (let i = 0; i < str.length; i++) {
    chr = str.charAt(i);
    if ((chr >= "\x30" && chr <= "\x39") || (chr >= "\x41" && chr <= "\x46")) {
      if (f < 8 && dtkind < 2) {
        f++;
        val += chr;
      }
    } else if (chr === "\x20" || chr === "\x0d" || chr === "\x0a") {
      if (f > 0) {
        for (let j = f; j < 8; j++) {
          val = "0" + val;
        }
        strout += convert_num(val, dtkind, nmode);
        if (chr === "\x20" && dtkind === 0) {
          dtkind++;
        } else {
          dtkind = 0;
        }
        val = "";
        strout += chr;
        f = 0;
      }
    } else {
      err = 1;
      break;
    }
  }

  if (err === 0 && f > 0) {
    for (let j = f; j < 8; j++) {
      val = "0" + val;
    }
    strout += convert_num(val, dtkind, nmode);
  }
  return strout;
};

const fix = (str: string): string => {
  var i;
  var chr;
  let str1: string = "";

  for (i = 0; i < str.length; i++) {
    chr = str.charAt(i);
    if (i % 18 === 0) {
      str1 += "patch=1,EE,0";
    } else if (chr === " ") {
      str1 += ",word,";
    } else {
      str1 += chr.toUpperCase();
    }
  }

  return str1;
};

const convert_num = (val: string, dtkind: number, nmode: number): string => {
  let i;
  let ret = "";

  const b1 = new Array(3);
  const b2 = new Array(3);
  let bxor = null;

  if (dtkind === 0) {
    bxor = [0xa6, 0x96, 0x01, 0x82];
  } else {
    bxor = [0xd9, 0x3b, 0x1b, 0xcc];
  }

  for (i = 0; i < 4; i++) {
    b1[i] = parseInt(val.substr(i * 2, 2), 16);
    if (nmode === 0) {
      b2[i] = b1[i] ^ bxor[i];
      b2[i] += bxor[(i + 1) & 3];
      b2[i] &= 0xff;
    } else {
      b1[i] += 256 - bxor[(i + 1) & 3];
      b1[i] &= 0xff;
      b2[i] = b1[i] ^ bxor[i];
    }
    if (b2[i] < 16) {
      ret += "0";
    }
    ret += b2[i].toString(16);
  }
  return ret;
};
