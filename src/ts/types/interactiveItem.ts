import type { Sprite, Texture } from "pixi.js";

export interface InteractiveItem {
  id: string;
  sprite: Sprite;
  textureDefault: Texture;
  textureHover: Texture;
}
