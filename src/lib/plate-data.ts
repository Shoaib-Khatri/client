export type PlateSize = {
  id: string;
  label: string;
  width: number;
  height: number;
  multiline?: boolean;
};

export const FRONT_SIZES: PlateSize[] = [
  {
    id: "standard",
    label: "Standard Car (520mm x 111mm)",
    width: 520,
    height: 111,
  },
  {
    id: "square",
    label: "Standard Square (279mm x 203mm)",
    width: 279,
    height: 203,
    multiline: true,
  },
  {
    id: "motorbike",
    label: "Standard Motorbike (229mm x 178mm)",
    width: 229,
    height: 178,
    multiline: true,
  },
];

export const REAR_SIZES: PlateSize[] = [
  {
    id: "standard",
    label: "Standard Car (520mm x 111mm)",
    width: 520,
    height: 111,
  },
  {
    id: "rr_sport_v1",
    label: "Range Rover Sport v1 (615mm x 150mm)",
    width: 615,
    height: 150,
  },
  {
    id: "rr_sport_v2",
    label: "Range Rover Sport v2 (560mm x 165mm)",
    width: 560,
    height: 165,
  },
  {
    id: "jag_x_type",
    label: "Jaguar X-Type Saloon (560mm x 162mm)",
    width: 560,
    height: 162,
  },
  {
    id: "jag_s_type_v1",
    label: "Jaguar S-Type v1 (585mm x 175mm)",
    width: 585,
    height: 175,
  },
  {
    id: "jag_s_type_v2",
    label: "Jaguar S-Type v2 (565mm x 165mm)",
    width: 565,
    height: 165,
  },
  {
    id: "jag_xk8",
    label: "Jaguar XK8/DB9 (552mm x 171mm)",
    width: 552,
    height: 171,
  },
  {
    id: "jag_xj_v1",
    label: "Jaguar XJ v1 (610mm x 150mm)",
    width: 610,
    height: 150,
  },
  {
    id: "jag_xj_v2",
    label: "Jaguar XJ v2 (530mm x 150mm)",
    width: 530,
    height: 150,
  },
  {
    id: "over_v2",
    label: "Oversized Oblong v2 (533mm x 152mm)",
    width: 533,
    height: 152,
  },
  {
    id: "over_v3",
    label: "Oversized Oblong v3 (520mm x 152mm)",
    width: 520,
    height: 152,
  },
  {
    id: "over_v4",
    label: "Oversized Oblong v4 (520mm x 165mm)",
    width: 520,
    height: 165,
  },
  {
    id: "over_v5",
    label: "Oversized Oblong v5 (559mm x 152mm)",
    width: 559,
    height: 152,
  },
];
