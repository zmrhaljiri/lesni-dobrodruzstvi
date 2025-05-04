import type { Application, Container } from "pixi.js";
import {
  SCENE_WIDTH,
  STAGE_WIDTH,
  SCROLL_INITIAL_PERCENT,
  SCROLL_EASING_FAST,
  SCROLL_EASING_SLOW,
} from "../constants";
import { addSpiritsToLayers } from "./spirits";

interface Layer {
  container: Container;
  parallaxFactor: number;
  baseX: number;
}

export function createScene(app: Application, layers: Layer[]) {
  let scrollPercent = SCROLL_INITIAL_PERCENT;
  let easedScroll = SCROLL_INITIAL_PERCENT;
  let isMouseActive = false;

  startParallaxTicker(app, layers);
  addSpiritsToLayers(app, layers);

  return {
    get scrollPercent() {
      return scrollPercent;
    },
    setScroll(percent: number) {
      scrollPercent = Math.max(0, Math.min(1, percent));
      isMouseActive = true;
    },
    unsetMouseActive() {
      isMouseActive = false;
      scrollPercent = SCROLL_INITIAL_PERCENT;
    },
  };

  function startParallaxTicker(app: Application, layers: Layer[]) {
    const maxScrollX = SCENE_WIDTH - STAGE_WIDTH;

    app.ticker.add(() => {
      const easing = isMouseActive ? SCROLL_EASING_FAST : SCROLL_EASING_SLOW;
      easedScroll += (scrollPercent - easedScroll) * easing;
      const scrollX = easedScroll * maxScrollX;

      layers.forEach(({ container, parallaxFactor, baseX }) => {
        container.x = -scrollX * parallaxFactor - baseX;
      });
    });
  }
}
