export const SCENE_WIDTH = 2800;
export const SCENE_HEIGHT = 800;
export const STAGE_WIDTH = 1600;
export const STAGE_HEIGHT = 800;

export const BACKGROUND_COLOR = 0x141414;

export const MAIN_THEME = "podmaz.mp3";

export const SOUND_VOLUME = 1;
export const SOUND_FADE_DURATION = 300;
export const MUSIC_VOLUME = 0.3;

export const SCROLL_INITIAL_PERCENT = 0.5;
export const SCROLL_EASING_FAST = 0.05;
export const SCROLL_EASING_SLOW = 0.015;
export const SCROLL_STEP = 0.05;

export const SPIRIT_COLOR = 0xfffc14;
export const SPIRIT_RADIUS_MIN = 1;
export const SPIRIT_RADIUS_VARIANCE = 2;
export const SPIRIT_FLOAT_FREQ_Y = 0.001;
export const SPIRIT_FLOAT_FREQ_X = 0.0001;
export const SPIRIT_FLOAT_AMPLITUDE_Y = 0.05;
export const SPIRIT_FLOAT_AMPLITUDE_X = 0.2;
export const SPIRIT_COUNT_PER_LAYER = 15;
export const SPIRIT_LAYERS = [1, 2, 3];

export const CHARACTERS = {
  VODNIK: "vodnik",
  HEJKAL: "hejkal",
  DRAK: "drak",
  CERTI_RODINKA: "certi_rodinka",
  DED_VSEVED: "ded_vseved",
  JEZIBABA: "jezibaba",
};

export const CHARACTERS_FOCUS_ORDER = [
  CHARACTERS.VODNIK,
  CHARACTERS.HEJKAL,
  CHARACTERS.DRAK,
  CHARACTERS.CERTI_RODINKA,
  CHARACTERS.DED_VSEVED,
  CHARACTERS.JEZIBABA,
];

export const PATHS = {
  sound: (id: string) => `/audio/sound/${id}.mp3`,
  music: (filename: string) => `/audio/music/${filename}`,
  itemImage: (layer: string, id: string, variant = 0) =>
    `/images/${layer}/items/${id}_${variant}.png`,
  backgroundImage: (layer: string, bgId: string) =>
    `/images/${layer}/${bgId}.png`,
};
