import { Howl } from "howler";
import { MUSIC_VOLUME, PATHS, MAIN_THEME } from "../constants";

let music: Howl | null = null;

export function playBackgroundMusic() {
  if (music) return;

  music = new Howl({
    src: [PATHS.music(MAIN_THEME)],
    loop: true,
    volume: MUSIC_VOLUME,
  });

  music.play();
}
