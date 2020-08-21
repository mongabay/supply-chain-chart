export const initialState = {
  contextsLoading: false,
  contexts: [],
  country: null,
  commodity: null,
  unit: null,
  year: null,
  regionsLoading: false,
  regions: [],
  region: '', // '' is the value of the “All” option
  exportersLoading: false,
  exporters: [],
  exporter: '', // '' is the value of the “All” option
  flowsLoading: false,
  flows: [],
  countriesLoading: false,
  countries: [], // List of destination countries
};

// FIXME: some coordinates are wrong (e.g. France)
export const COUNTRIES_COORDINATES = {
  AD: [1.56054378, 42.54229102],
  AE: [54.3001671, 23.90528188],
  AF: [66.00473366, 33.83523073],
  AG: [-61.79469343, 17.2774996],
  AI: [-63.06498927, 18.2239595],
  AL: [20.04983396, 41.14244989],
  AM: [44.92993276, 40.28952569],
  AO: [17.53736768, -12.29336054],
  AQ: [19.92108951, -80.50857913],
  AR: [-65.17980692, -35.3813488],
  AS: [-170.7180258, -14.30445997],
  AT: [14.1264761, 47.58549439],
  AU: [134.4910001, -25.73288704],
  AW: [-69.98267711, 12.52088038],
  AX: [19.95328768, 60.21488688],
  AZ: [47.54599879, 40.28827235],
  BA: [17.76876733, 44.17450125],
  BB: [-59.559797, 13.18145428],
  BD: [90.23812743, 23.86731158],
  BE: [4.64065114, 50.63981576],
  BF: [-1.75456601, 12.26953846],
  BG: [25.21552909, 42.76890318],
  BH: [50.54196932, 26.04205135],
  BI: [29.87512156, -3.35939666],
  BJ: [2.32785254, 9.6417597],
  BL: [-62.84067779, 17.89880451],
  BM: [-64.7545589, 32.31367802],
  BN: [114.7220304, 4.51968958],
  BO: [-64.68538645, -16.70814787],
  BR: [-53.09783113, -10.78777702],
  BS: [-76.62843038, 24.29036702],
  BT: [90.40188155, 27.41106589],
  BW: [23.79853368, -22.18403213],
  BY: [28.03209307, 53.53131377],
  BZ: [-88.71010486, 17.20027509],
  CA: [-98.30777028, 61.36206324],
  CD: [23.64396107, -2.87746289],
  CF: [20.46826831, 6.56823297],
  CG: [15.21965762, -0.83787463],
  CH: [8.20867471, 46.79785878],
  CI: [-5.5692157, 7.6284262],
  CK: [-159.7872422, -21.21927288],
  CL: [-71.38256213, -37.73070989],
  CM: [12.73964156, 5.69109849],
  CN: [103.8190735, 36.56176546],
  CO: [-73.08114582, 3.91383431],
  CR: [-84.19208768, 9.97634464],
  CU: [-79.01605384, 21.62289528],
  CV: [-23.9598882, 15.95523324],
  CW: [-68.97119369, 12.19551675],
  CY: [33.0060022, 34.91667211],
  CZ: [15.31240163, 49.73341233],
  DE: [10.38578051, 51.10698181],
  DJ: [42.5606754, 11.74871806],
  DK: [10.02800992, 55.98125296],
  DM: [-61.357726, 15.4394702],
  DO: [-70.50568896, 18.89433082],
  DZ: [2.61732301, 28.15893849],
  EC: [-78.75201922, -1.42381612],
  EE: [25.54248537, 58.67192972],
  EG: [29.86190099, 26.49593311],
  EH: [-12.21982755, 24.22956739],
  ER: [38.84617011, 15.36186618],
  ES: [-3.64755047, 40.24448698],
  ET: [39.60080098, 8.62278679],
  FI: [26.2746656, 64.49884603],
  FJ: [165.4519543, -17.42858032],
  FK: [-59.35238956, -51.74483954],
  FM: [153.2394379, 7.45246814],
  FO: [-6.88095423, 62.05385403],
  FR: [-2.76172945, 42.17344011],
  GA: [11.7886287, -0.58660025],
  GB: [-2.86563164, 54.12387156],
  GD: [-61.68220189, 12.11725044],
  GE: [43.50780252, 42.16855755],
  GG: [-2.57239064, 49.46809761],
  GH: [-1.21676566, 7.95345644],
  GL: [-41.34191127, 74.71051289],
  GM: [-15.39601295, 13.44965244],
  GN: [-10.94066612, 10.43621593],
  GQ: [10.34137924, 1.70555135],
  GR: [22.95555794, 39.07469623],
  GS: [-36.43318388, -54.46488248],
  GT: [-90.36482009, 15.69403664],
  GU: [144.7679102, 13.44165626],
  GW: [-14.94972445, 12.04744948],
  GY: [-58.98202459, 4.79378034],
  HK: [114.1138045, 22.39827737],
  HM: [73.5205171, -53.08724656],
  HN: [-86.6151661, 14.82688165],
  HR: [16.40412899, 45.08047631],
  HT: [-72.68527509, 18.93502563],
  HU: [19.39559116, 47.16277506],
  ID: [117.2401137, -2.21505456],
  IE: [-8.13793569, 53.1754487],
  IL: [35.00444693, 31.46110101],
  IM: [-4.53873952, 54.22418911],
  IN: [79.6119761, 22.88578212],
  IO: [72.44541229, -7.33059751],
  IQ: [43.74353149, 33.03970582],
  IR: [54.27407004, 32.57503292],
  IS: [-18.57396167, 64.99575386],
  IT: [12.07001339, 42.79662641],
  JE: [-2.12689938, 49.21837377],
  JM: [-77.31482593, 18.15694878],
  JO: [36.77136104, 31.24579091],
  JP: [138.0308956, 37.59230135],
  KE: [37.79593973, 0.59988022],
  KG: [74.54165513, 41.46221943],
  KH: [104.9069433, 12.72004786],
  KI: [-45.61110513, 0.86001503],
  KM: [43.68253968, -11.87783444],
  KN: [-62.68755265, 17.2645995],
  KP: [127.1924797, 40.15350311],
  KR: [127.8391609, 36.38523983],
  KW: [47.58700459, 29.33431262],
  KY: [-80.91213321, 19.42896497],
  KZ: [67.29149357, 48.15688067],
  LA: [103.7377241, 18.50217433],
  LB: [35.88016072, 33.92306631],
  LC: [-60.96969923, 13.89479481],
  LI: [9.53574312, 47.13665835],
  LK: [80.70108238, 7.61266509],
  LR: [-9.32207573, 6.45278492],
  LS: [28.22723131, -29.58003188],
  LT: [23.88719355, 55.32610984],
  LU: [6.07182201, 49.76725361],
  LV: [24.91235983, 56.85085163],
  LY: [18.00866169, 27.03094495],
  MA: [-8.45615795, 29.83762955],
  MC: [7.40627677, 43.75274627],
  MD: [28.45673372, 47.19498804],
  ME: [19.23883939, 42.78890259],
  MF: [-63.05972851, 18.08888611],
  MG: [46.70473674, -19.37189587],
  MH: [170.3397612, 7.00376358],
  MK: [21.68211346, 41.59530893],
  ML: [-3.54269065, 17.34581581],
  MM: [96.48843321, 21.18566599],
  MN: [103.0529977, 46.82681544],
  MO: [113.5093212, 22.22311688],
  MP: [145.6196965, 15.82927563],
  MR: [-10.34779815, 20.25736706],
  MS: [-62.18518546, 16.73941406],
  MT: [14.40523316, 35.92149632],
  MU: [57.57120551, -20.27768704],
  MV: [73.45713004, 3.7287092],
  MW: [34.28935599, -13.21808088],
  MX: [-102.5234517, 23.94753724],
  MY: [109.6976228, 3.78986846],
  MZ: [35.53367543, -17.27381643],
  NA: [17.20963567, -22.13032568],
  NC: [165.6849237, -21.29991806],
  NE: [9.38545882, 17.41912493],
  NF: [167.9492168, -29.0514609],
  NG: [8.08943895, 9.59411452],
  NI: [-85.0305297, 12.84709429],
  NL: [5.28144793, 52.1007899],
  NO: [15.34834656, 68.75015572],
  NP: [83.9158264, 28.24891365],
  NR: [166.9325682, -0.51912639],
  NU: [-169.8699468, -19.04945708],
  NZ: [171.4849235, -41.81113557],
  OM: [56.09166155, 20.60515333],
  PA: [-80.11915156, 8.51750797],
  PE: [-74.38242685, -9.15280381],
  PF: [-144.9049439, -14.72227409],
  PG: [145.2074475, -6.46416646],
  PH: [122.8839325, 11.77536778],
  PK: [69.33957937, 29.9497515],
  PL: [19.39012835, 52.12759564],
  PM: [-56.30319779, 46.91918789],
  PN: [-128.317042, -24.36500535],
  PR: [-66.47307604, 18.22813055],
  PS: [35.19628705, 31.91613893],
  PT: [-8.50104361, 39.59550671],
  PW: [134.4080797, 7.28742784],
  PY: [-58.40013703, -23.22823913],
  QA: [51.18479632, 25.30601188],
  RO: [24.97293039, 45.85243127],
  RS: [20.78958334, 44.2215032],
  RU: [96.68656112, 61.98052209],
  RW: [29.91988515, -1.99033832],
  SA: [44.53686271, 24.12245841],
  SB: [159.6328767, -8.92178022],
  SC: [55.47603279, -4.66099094],
  SD: [29.94046812, 15.99035669],
  SE: [16.74558049, 62.77966519],
  SG: [103.8172559, 1.35876087],
  SH: [-9.54779416, -12.40355951],
  SI: [14.80444238, 46.11554772],
  SK: [19.47905218, 48.70547528],
  SL: [-11.79271247, 8.56329593],
  SM: [12.45922334, 43.94186747],
  SN: [-14.4734924, 14.36624173],
  SO: [45.70714487, 4.75062876],
  SR: [-55.9123457, 4.13055413],
  SS: [30.24790002, 7.30877945],
  ST: [6.72429658, 0.44391445],
  SV: [-88.87164469, 13.73943744],
  SX: [-63.05713363, 18.05081728],
  SY: [38.50788204, 35.02547389],
  SZ: [31.4819369, -26.55843045],
  TC: [-71.97387881, 21.83047572],
  TD: [18.64492513, 15.33333758],
  TF: [69.22666758, -49.24895485],
  TG: [0.96232845, 8.52531356],
  TH: [101.0028813, 15.11815794],
  TJ: [71.01362631, 38.5304539],
  TL: [125.8443898, -8.82889162],
  TM: [59.37100021, 39.11554137],
  TN: [9.55288359, 34.11956246],
  TO: [-174.8098734, -20.42843174],
  TR: [35.16895346, 39.0616029],
  TT: [-61.26567923, 10.45733408],
  TW: [120.9542728, 23.7539928],
  TZ: [34.81309981, -6.27565408],
  UA: [31.38326469, 48.99656673],
  UG: [32.36907971, 1.27469299],
  US: [-112.4616737, 45.6795472],
  UY: [-56.01807053, -32.79951534],
  UZ: [63.14001528, 41.75554225],
  VA: [12.43387177, 41.90174985],
  VC: [-61.20129695, 13.22472269],
  VE: [-66.18184123, 7.12422421],
  VG: [-64.47146992, 18.52585755],
  VI: [-64.80301538, 17.95500624],
  VN: [106.299147, 16.6460167],
  VU: [167.6864464, -16.22640909],
  WF: [-177.3483483, -13.88737039],
  WS: [-172.1648506, -13.75324346],
  YE: [47.58676189, 15.90928005],
  ZA: [25.08390093, -29.00034095],
  ZM: [27.77475946, -13.45824152],
  ZW: [29.8514412, -19.00420419],
};
