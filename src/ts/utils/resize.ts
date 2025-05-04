import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants";

export function resizeCanvasToFit(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement || document.body;
  const screenWidth = parent.clientWidth;
  const screenHeight = parent.clientHeight;

  const scaleX = Math.min(1, screenWidth / STAGE_WIDTH);
  const scaleY = Math.min(1, screenHeight / STAGE_HEIGHT);
  const scale = Math.min(scaleX, scaleY);

  canvas.style.width = `${Math.round(STAGE_WIDTH * scale)}px`;
  canvas.style.height = `${Math.round(STAGE_HEIGHT * scale)}px`;
}
