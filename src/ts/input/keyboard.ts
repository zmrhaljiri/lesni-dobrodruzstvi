import type { InteractiveItem } from "../types/interactiveItem";
import {
  CHARACTERS_FOCUS_ORDER,
  STAGE_WIDTH,
  SCENE_WIDTH,
  SCROLL_STEP,
} from "../constants";
import { playItemSound, fadeOutItemSound } from "../sound/effects";

interface ScrollState {
  scrollPercent: number;
  setScroll: (percent: number) => void;
}

export function setupKeyboardHandlers(
  scrollState: ScrollState,
  charactersById: Map<string, InteractiveItem>,
) {
  let focusedItemIndex = -1;

  window.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      scrollRight();
    }

    if (event.key === "ArrowLeft") {
      scrollLeft();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      focusNextItem(event.shiftKey);
    }
  });

  function scrollRight() {
    const newScrollValue = scrollState.scrollPercent + SCROLL_STEP;
    scrollState.setScroll(Math.min(1, newScrollValue));
  }

  function scrollLeft() {
    const newScrollValue = scrollState.scrollPercent - SCROLL_STEP;
    scrollState.setScroll(Math.max(0, newScrollValue));
  }

  function focusNextItem(isShiftHeld: boolean) {
    clearCurrentFocus();
    updateFocusedIndex(isShiftHeld);
    applyNewFocus();
  }

  function clearCurrentFocus() {
    if (focusedItemIndex < 0) return;

    const previousId = CHARACTERS_FOCUS_ORDER[focusedItemIndex];
    const previousItem = charactersById.get(previousId);
    if (!previousItem) return;

    previousItem.sprite.filters = [];
    previousItem.sprite.texture = previousItem.textureDefault;
    fadeOutItemSound(previousId);
  }

  function updateFocusedIndex(isShiftHeld: boolean) {
    const total = CHARACTERS_FOCUS_ORDER.length;
    focusedItemIndex = isShiftHeld
      ? (focusedItemIndex - 1 + total) % total
      : (focusedItemIndex + 1) % total;
  }

  function applyNewFocus() {
    const nextId = CHARACTERS_FOCUS_ORDER[focusedItemIndex];
    const nextItem = charactersById.get(nextId);
    if (!nextItem) return;

    nextItem.sprite.texture = nextItem.textureHover;

    playItemSound(nextId);
    scrollToItem(nextItem);
  }

  function scrollToItem(item: InteractiveItem) {
    const centerX = item.sprite.x + item.sprite.width / 2;
    const scrollableWidth = SCENE_WIDTH - STAGE_WIDTH;
    const newScrollValue = (centerX - STAGE_WIDTH / 2) / scrollableWidth;

    scrollState.setScroll(Math.max(0, Math.min(1, newScrollValue)));
  }
}
