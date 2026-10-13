export type FloatingIconType =
  | 'plane'
  | 'baggage-claim'
  | 'map'
  | 'compass'
  | 'camera'
  | 'tent'
  | 'sun'
  | 'tree-palm'
  | 'navigation'
  | 'ticket';

export interface FloatingIconItem {
  top: string;
  left: string;
  opacity: number;
  yOffset: string;
  duration: string;
  delay: string;
  icon: FloatingIconType;
  size: number;
  rotate: string;
}

export const FLOATING_ICONS_DATA: FloatingIconItem[] = [
  {
    "top": "1%",
    "left": "5%",
    "opacity": 0.15,
    "yOffset": "-10px",
    "duration": "6s",
    "delay": "0s",
    "icon": "plane",
    "size": 24,
    "rotate": "-45deg"
  },
  {
    "top": "2.66102%",
    "left": "34%",
    "opacity": 0.15,
    "yOffset": "-21px",
    "duration": "9s",
    "delay": "0.5s",
    "icon": "baggage-claim",
    "size": 31,
    "rotate": "-14deg"
  },
  {
    "top": "4.32203%",
    "left": "63%",
    "opacity": 0.15,
    "yOffset": "-12px",
    "duration": "8s",
    "delay": "1s",
    "icon": "map",
    "size": 38,
    "rotate": "17deg"
  },
  {
    "top": "5.98305%",
    "left": "92%",
    "opacity": 0.15,
    "yOffset": "-23px",
    "duration": "7s",
    "delay": "1.5s",
    "icon": "compass",
    "size": 25,
    "rotate": "-42deg"
  },
  {
    "top": "7.64407%",
    "left": "31%",
    "opacity": 0.15,
    "yOffset": "-14px",
    "duration": "6s",
    "delay": "2s",
    "icon": "camera",
    "size": 32,
    "rotate": "-11deg"
  },
  {
    "top": "9.30508%",
    "left": "60%",
    "opacity": 0.15,
    "yOffset": "-25px",
    "duration": "9s",
    "delay": "0s",
    "icon": "tent",
    "size": 39,
    "rotate": "20deg"
  },
  {
    "top": "10.9661%",
    "left": "89%",
    "opacity": 0.15,
    "yOffset": "-16px",
    "duration": "8s",
    "delay": "0.5s",
    "icon": "sun",
    "size": 26,
    "rotate": "-39deg"
  },
  {
    "top": "12.6271%",
    "left": "28%",
    "opacity": 0.15,
    "yOffset": "-27px",
    "duration": "7s",
    "delay": "1s",
    "icon": "tree-palm",
    "size": 33,
    "rotate": "-8deg"
  },
  {
    "top": "14.2881%",
    "left": "57%",
    "opacity": 0.15,
    "yOffset": "-18px",
    "duration": "6s",
    "delay": "1.5s",
    "icon": "navigation",
    "size": 40,
    "rotate": "23deg"
  },
  {
    "top": "15.9492%",
    "left": "86%",
    "opacity": 0.15,
    "yOffset": "-29px",
    "duration": "9s",
    "delay": "2s",
    "icon": "ticket",
    "size": 27,
    "rotate": "-36deg"
  },
  {
    "top": "17.6102%",
    "left": "25%",
    "opacity": 0.15,
    "yOffset": "-20px",
    "duration": "8s",
    "delay": "0s",
    "icon": "plane",
    "size": 34,
    "rotate": "-5deg"
  },
  {
    "top": "19.2712%",
    "left": "54%",
    "opacity": 0.15,
    "yOffset": "-11px",
    "duration": "7s",
    "delay": "0.5s",
    "icon": "baggage-claim",
    "size": 41,
    "rotate": "26deg"
  },
  {
    "top": "20.9322%",
    "left": "83%",
    "opacity": 0.15,
    "yOffset": "-22px",
    "duration": "6s",
    "delay": "1s",
    "icon": "map",
    "size": 28,
    "rotate": "-33deg"
  },
  {
    "top": "22.5932%",
    "left": "22%",
    "opacity": 0.15,
    "yOffset": "-13px",
    "duration": "9s",
    "delay": "1.5s",
    "icon": "compass",
    "size": 35,
    "rotate": "-2deg"
  },
  {
    "top": "24.2542%",
    "left": "51%",
    "opacity": 0.15,
    "yOffset": "-24px",
    "duration": "8s",
    "delay": "2s",
    "icon": "camera",
    "size": 42,
    "rotate": "29deg"
  },
  {
    "top": "25.9153%",
    "left": "80%",
    "opacity": 0.15,
    "yOffset": "-15px",
    "duration": "7s",
    "delay": "0s",
    "icon": "tent",
    "size": 29,
    "rotate": "-30deg"
  },
  {
    "top": "27.5763%",
    "left": "19%",
    "opacity": 0.15,
    "yOffset": "-26px",
    "duration": "6s",
    "delay": "0.5s",
    "icon": "sun",
    "size": 36,
    "rotate": "1deg"
  },
  {
    "top": "29.2373%",
    "left": "48%",
    "opacity": 0.15,
    "yOffset": "-17px",
    "duration": "9s",
    "delay": "1s",
    "icon": "tree-palm",
    "size": 43,
    "rotate": "32deg"
  },
  {
    "top": "30.8983%",
    "left": "77%",
    "opacity": 0.15,
    "yOffset": "-28px",
    "duration": "8s",
    "delay": "1.5s",
    "icon": "navigation",
    "size": 30,
    "rotate": "-27deg"
  },
  {
    "top": "32.5593%",
    "left": "16%",
    "opacity": 0.15,
    "yOffset": "-19px",
    "duration": "7s",
    "delay": "2s",
    "icon": "ticket",
    "size": 37,
    "rotate": "4deg"
  },
  {
    "top": "34.2203%",
    "left": "45%",
    "opacity": 0.15,
    "yOffset": "-10px",
    "duration": "6s",
    "delay": "0s",
    "icon": "plane",
    "size": 24,
    "rotate": "35deg"
  },
  {
    "top": "35.8814%",
    "left": "74%",
    "opacity": 0.15,
    "yOffset": "-21px",
    "duration": "9s",
    "delay": "0.5s",
    "icon": "baggage-claim",
    "size": 31,
    "rotate": "-24deg"
  },
  {
    "top": "37.5424%",
    "left": "13%",
    "opacity": 0.15,
    "yOffset": "-12px",
    "duration": "8s",
    "delay": "1s",
    "icon": "map",
    "size": 38,
    "rotate": "7deg"
  },
  {
    "top": "39.2034%",
    "left": "42%",
    "opacity": 0.15,
    "yOffset": "-23px",
    "duration": "7s",
    "delay": "1.5s",
    "icon": "compass",
    "size": 25,
    "rotate": "38deg"
  },
  {
    "top": "40.8644%",
    "left": "71%",
    "opacity": 0.15,
    "yOffset": "-14px",
    "duration": "6s",
    "delay": "2s",
    "icon": "camera",
    "size": 32,
    "rotate": "-21deg"
  },
  {
    "top": "42.5254%",
    "left": "10%",
    "opacity": 0.15,
    "yOffset": "-25px",
    "duration": "9s",
    "delay": "0s",
    "icon": "tent",
    "size": 39,
    "rotate": "10deg"
  },
  {
    "top": "44.1864%",
    "left": "39%",
    "opacity": 0.15,
    "yOffset": "-16px",
    "duration": "8s",
    "delay": "0.5s",
    "icon": "sun",
    "size": 26,
    "rotate": "41deg"
  },
  {
    "top": "45.8475%",
    "left": "68%",
    "opacity": 0.15,
    "yOffset": "-27px",
    "duration": "7s",
    "delay": "1s",
    "icon": "tree-palm",
    "size": 33,
    "rotate": "-18deg"
  },
  {
    "top": "47.5085%",
    "left": "7%",
    "opacity": 0.15,
    "yOffset": "-18px",
    "duration": "6s",
    "delay": "1.5s",
    "icon": "navigation",
    "size": 40,
    "rotate": "13deg"
  },
  {
    "top": "49.1695%",
    "left": "36%",
    "opacity": 0.15,
    "yOffset": "-29px",
    "duration": "9s",
    "delay": "2s",
    "icon": "ticket",
    "size": 27,
    "rotate": "44deg"
  },
  {
    "top": "50.8305%",
    "left": "65%",
    "opacity": 0.15,
    "yOffset": "-20px",
    "duration": "8s",
    "delay": "0s",
    "icon": "plane",
    "size": 34,
    "rotate": "-15deg"
  },
  {
    "top": "52.4915%",
    "left": "94%",
    "opacity": 0.15,
    "yOffset": "-11px",
    "duration": "7s",
    "delay": "0.5s",
    "icon": "baggage-claim",
    "size": 41,
    "rotate": "16deg"
  },
  {
    "top": "54.1525%",
    "left": "33%",
    "opacity": 0.15,
    "yOffset": "-22px",
    "duration": "6s",
    "delay": "1s",
    "icon": "map",
    "size": 28,
    "rotate": "-43deg"
  },
  {
    "top": "55.8136%",
    "left": "62%",
    "opacity": 0.15,
    "yOffset": "-13px",
    "duration": "9s",
    "delay": "1.5s",
    "icon": "compass",
    "size": 35,
    "rotate": "-12deg"
  },
  {
    "top": "57.4746%",
    "left": "91%",
    "opacity": 0.15,
    "yOffset": "-24px",
    "duration": "8s",
    "delay": "2s",
    "icon": "camera",
    "size": 42,
    "rotate": "19deg"
  },
  {
    "top": "59.1356%",
    "left": "30%",
    "opacity": 0.15,
    "yOffset": "-15px",
    "duration": "7s",
    "delay": "0s",
    "icon": "tent",
    "size": 29,
    "rotate": "-40deg"
  },
  {
    "top": "60.7966%",
    "left": "59%",
    "opacity": 0.15,
    "yOffset": "-26px",
    "duration": "6s",
    "delay": "0.5s",
    "icon": "sun",
    "size": 36,
    "rotate": "-9deg"
  },
  {
    "top": "62.4576%",
    "left": "88%",
    "opacity": 0.15,
    "yOffset": "-17px",
    "duration": "9s",
    "delay": "1s",
    "icon": "tree-palm",
    "size": 43,
    "rotate": "22deg"
  },
  {
    "top": "64.1186%",
    "left": "27%",
    "opacity": 0.15,
    "yOffset": "-28px",
    "duration": "8s",
    "delay": "1.5s",
    "icon": "navigation",
    "size": 30,
    "rotate": "-37deg"
  },
  {
    "top": "65.7797%",
    "left": "56%",
    "opacity": 0.15,
    "yOffset": "-19px",
    "duration": "7s",
    "delay": "2s",
    "icon": "ticket",
    "size": 37,
    "rotate": "-6deg"
  },
  {
    "top": "67.4407%",
    "left": "85%",
    "opacity": 0.15,
    "yOffset": "-10px",
    "duration": "6s",
    "delay": "0s",
    "icon": "plane",
    "size": 24,
    "rotate": "25deg"
  },
  {
    "top": "69.1017%",
    "left": "24%",
    "opacity": 0.15,
    "yOffset": "-21px",
    "duration": "9s",
    "delay": "0.5s",
    "icon": "baggage-claim",
    "size": 31,
    "rotate": "-34deg"
  },
  {
    "top": "70.7627%",
    "left": "53%",
    "opacity": 0.15,
    "yOffset": "-12px",
    "duration": "8s",
    "delay": "1s",
    "icon": "map",
    "size": 38,
    "rotate": "-3deg"
  },
  {
    "top": "72.4237%",
    "left": "82%",
    "opacity": 0.15,
    "yOffset": "-23px",
    "duration": "7s",
    "delay": "1.5s",
    "icon": "compass",
    "size": 25,
    "rotate": "28deg"
  },
  {
    "top": "74.0847%",
    "left": "21%",
    "opacity": 0.15,
    "yOffset": "-14px",
    "duration": "6s",
    "delay": "2s",
    "icon": "camera",
    "size": 32,
    "rotate": "-31deg"
  },
  {
    "top": "75.7458%",
    "left": "50%",
    "opacity": 0.15,
    "yOffset": "-25px",
    "duration": "9s",
    "delay": "0s",
    "icon": "tent",
    "size": 39,
    "rotate": "0deg"
  },
  {
    "top": "77.4068%",
    "left": "79%",
    "opacity": 0.15,
    "yOffset": "-16px",
    "duration": "8s",
    "delay": "0.5s",
    "icon": "sun",
    "size": 26,
    "rotate": "31deg"
  },
  {
    "top": "79.0678%",
    "left": "18%",
    "opacity": 0.15,
    "yOffset": "-27px",
    "duration": "7s",
    "delay": "1s",
    "icon": "tree-palm",
    "size": 33,
    "rotate": "-28deg"
  },
  {
    "top": "80.7288%",
    "left": "47%",
    "opacity": 0.15,
    "yOffset": "-18px",
    "duration": "6s",
    "delay": "1.5s",
    "icon": "navigation",
    "size": 40,
    "rotate": "3deg"
  },
  {
    "top": "82.3898%",
    "left": "76%",
    "opacity": 0.15,
    "yOffset": "-29px",
    "duration": "9s",
    "delay": "2s",
    "icon": "ticket",
    "size": 27,
    "rotate": "34deg"
  },
  {
    "top": "84.0508%",
    "left": "15%",
    "opacity": 0.15,
    "yOffset": "-20px",
    "duration": "8s",
    "delay": "0s",
    "icon": "plane",
    "size": 34,
    "rotate": "-25deg"
  },
  {
    "top": "85.7119%",
    "left": "44%",
    "opacity": 0.15,
    "yOffset": "-11px",
    "duration": "7s",
    "delay": "0.5s",
    "icon": "baggage-claim",
    "size": 41,
    "rotate": "6deg"
  },
  {
    "top": "87.3729%",
    "left": "73%",
    "opacity": 0.15,
    "yOffset": "-22px",
    "duration": "6s",
    "delay": "1s",
    "icon": "map",
    "size": 28,
    "rotate": "37deg"
  },
  {
    "top": "89.0339%",
    "left": "12%",
    "opacity": 0.15,
    "yOffset": "-13px",
    "duration": "9s",
    "delay": "1.5s",
    "icon": "compass",
    "size": 35,
    "rotate": "-22deg"
  },
  {
    "top": "90.6949%",
    "left": "41%",
    "opacity": 0.15,
    "yOffset": "-24px",
    "duration": "8s",
    "delay": "2s",
    "icon": "camera",
    "size": 42,
    "rotate": "9deg"
  },
  {
    "top": "92.3559%",
    "left": "70%",
    "opacity": 0.15,
    "yOffset": "-15px",
    "duration": "7s",
    "delay": "0s",
    "icon": "tent",
    "size": 29,
    "rotate": "40deg"
  },
  {
    "top": "94.0169%",
    "left": "9%",
    "opacity": 0.15,
    "yOffset": "-26px",
    "duration": "6s",
    "delay": "0.5s",
    "icon": "sun",
    "size": 36,
    "rotate": "-19deg"
  },
  {
    "top": "95.678%",
    "left": "38%",
    "opacity": 0.15,
    "yOffset": "-17px",
    "duration": "9s",
    "delay": "1s",
    "icon": "tree-palm",
    "size": 43,
    "rotate": "12deg"
  },
  {
    "top": "97.339%",
    "left": "67%",
    "opacity": 0.15,
    "yOffset": "-28px",
    "duration": "8s",
    "delay": "1.5s",
    "icon": "navigation",
    "size": 30,
    "rotate": "43deg"
  },
  {
    "top": "99%",
    "left": "6%",
    "opacity": 0.15,
    "yOffset": "-19px",
    "duration": "7s",
    "delay": "2s",
    "icon": "ticket",
    "size": 37,
    "rotate": "-16deg"
  }
];
