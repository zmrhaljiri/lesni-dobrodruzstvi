export function setupPointerHandlers(
  canvas: HTMLCanvasElement,
  setScroll: (percent: number) => void,
  unsetMouseActive: () => void,
) {
  const applyScrollPosition = (clientX: number) => {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    setScroll(percent);
  };

  canvas.addEventListener("mousemove", (e) => {
    applyScrollPosition(e.clientX);
  });

  canvas.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      applyScrollPosition(e.touches[0].clientX);
    }
  });

  canvas.addEventListener("mouseleave", () => {
    unsetMouseActive();
  });
}
