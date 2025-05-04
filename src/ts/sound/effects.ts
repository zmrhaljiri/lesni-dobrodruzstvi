import { Howl } from "howler";
import { SOUND_FADE_DURATION, SOUND_VOLUME, PATHS } from "../constants";

const cache: Record<string, Howl> = {};
const active: Record<string, Set<number>> = {};

export function playItemSound(id: string) {
  if (!cache[id]) {
    cache[id] = new Howl({
      src: [PATHS.sound(id)],
      volume: SOUND_VOLUME,
    });
  }

  const sound = cache[id];
  const soundId = sound.play();

  active[id] ??= new Set();
  active[id].add(soundId);

  sound.once("end", () => active[id]?.delete(soundId));
}

export function fadeOutItemSound(id: string) {
  const sound = cache[id];
  const ids = active[id];
  if (!sound || !ids) return;

  ids.forEach((soundId) => {
    if (sound.playing(soundId)) {
      sound.fade(1, 0, SOUND_FADE_DURATION, soundId);
      setTimeout(() => {
        sound.stop(soundId);
        ids.delete(soundId);
      }, SOUND_FADE_DURATION);
    } else {
      ids.delete(soundId);
    }
  });
}
