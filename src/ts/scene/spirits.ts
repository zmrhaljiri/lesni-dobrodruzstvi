import { Application, BlurFilter, Container, Graphics } from "pixi.js";
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

export function addSpiritsToLayers(app: Application, layers: Layer[]) {
  for (const layerIndex of SPIRIT_LAYERS) {
    for (let i = 0; i < SPIRIT_COUNT_PER_LAYER; i++) {
      const x = Math.random() * SCENE_WIDTH;
      const y = Math.random() * SCENE_HEIGHT;

      const spirit = createSpirit(x, y);
      layers[layerIndex].container.addChild(spirit);
      animateSpirit(app, spirit, x, y);
    }
  }
}

function createSpirit(x: number, y: number): Graphics {
  const radius = SPIRIT_RADIUS_MIN + Math.random() * SPIRIT_RADIUS_VARIANCE;

  const spirit = new Graphics()
    .fill({ color: SPIRIT_COLOR, alpha: 1 })
    .circle(0, 0, radius)
    .fill();

  spirit.x = x;
  spirit.y = y;

  const blur = new BlurFilter();
  blur.blur = radius;
  spirit.filters = [blur];

  return spirit;
}

function animateSpirit(
  app: Application,
  spirit: Graphics,
  offsetX: number,
  offsetY: number,
) {
  app.ticker.add(() => {
    const time = performance.now();
    spirit.y +=
      Math.sin(time * SPIRIT_FLOAT_FREQ_Y + offsetX) * SPIRIT_FLOAT_AMPLITUDE_Y;
    spirit.x +=
      Math.sin(time * SPIRIT_FLOAT_FREQ_X + offsetY) * SPIRIT_FLOAT_AMPLITUDE_X;
  });
}
