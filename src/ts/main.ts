import { Application } from "pixi.js";
import { createScene } from "./scene/createScene";
import { resizeCanvasToFit } from "./utils/resize";
import { setupKeyboardHandlers } from "./input/keyboard";
import { setupPointerHandlers } from "./input/pointer";
import { loadLayers } from "./scene/loadLayers";
import { playBackgroundMusic } from "./sound/music";
import { STAGE_WIDTH, STAGE_HEIGHT, BACKGROUND_COLOR } from "./constants";

export async function startGame() {
  const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;

  const app = new Application();
  await app.init({
    canvas,
    autoStart: true,
    antialias: true,
    backgroundColor: BACKGROUND_COLOR,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    backgroundAlpha: 0,
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
  });

  app.stage.hitArea = app.screen;

  const { layers, charactersById } = await loadLayers();
  layers.forEach(({ container }) => app.stage.addChild(container));

  const scrollState = createScene(app, layers);
  setupKeyboardHandlers(scrollState, charactersById);
  setupPointerHandlers(
    canvas,
    scrollState.setScroll,
    scrollState.unsetMouseActive,
  );

  playBackgroundMusic();

  window.addEventListener("resize", () => resizeCanvasToFit(canvas));
  resizeCanvasToFit(canvas);
}

document.getElementById("start-button")?.addEventListener("click", () => {
  document.getElementById("start-overlay")?.classList.add("hidden");
  startGame();
});
