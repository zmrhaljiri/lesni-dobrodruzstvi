import { Application, Container, Graphics } from "pixi.js";
import {
  SCENE_WIDTH,
  SCENE_HEIGHT,
  SPIRIT_COLOR,
  SPIRIT_RADIUS_MIN,
  SPIRIT_RADIUS_VARIANCE,
  SPIRIT_FLOAT_FREQ_X,
  SPIRIT_FLOAT_FREQ_Y,
  SPIRIT_FLOAT_AMPLITUDE_X,
  SPIRIT_FLOAT_AMPLITUDE_Y,
  SPIRIT_COUNT_PER_LAYER,
  SPIRIT_LAYERS,
} from "../constants";

interface Layer {
  container: Container;
}

interface SpiritData {
  sprite: Graphics;
  offsetX: number;
  offsetY: number;
}

export function addSpiritsToLayers(app: Application, layers: Layer[]) {
  const spirits: SpiritData[] = [];

  for (const layerIndex of SPIRIT_LAYERS) {
    const layer = layers[layerIndex];
    for (let i = 0; i < SPIRIT_COUNT_PER_LAYER; i++) {
      const offsetX = Math.random() * SCENE_WIDTH;
      const offsetY = Math.random() * SCENE_HEIGHT;
      const spirit = createSpirit(offsetX, offsetY);
      layer.container.addChild(spirit);

      spirits.push({ sprite: spirit, offsetX, offsetY });
    }
  }

  app.ticker.add(() => animateSpirits(spirits));
}

function createSpirit(x: number, y: number): Graphics {
  const radius = SPIRIT_RADIUS_MIN + Math.random() * SPIRIT_RADIUS_VARIANCE;

  const spirit = new Graphics()
    .fill({ color: SPIRIT_COLOR, alpha: 1 })
    .circle(0, 0, radius)
    .fill();

  spirit.x = x;
  spirit.y = y;

  return spirit;
}

function animateSpirits(spirits: SpiritData[]) {
  const time = performance.now();

  for (const { sprite, offsetX, offsetY } of spirits) {
    sprite.x +=
      Math.sin(time * SPIRIT_FLOAT_FREQ_X + offsetY) * SPIRIT_FLOAT_AMPLITUDE_X;
    sprite.y +=
      Math.sin(time * SPIRIT_FLOAT_FREQ_Y + offsetX) * SPIRIT_FLOAT_AMPLITUDE_Y;
  }
}
