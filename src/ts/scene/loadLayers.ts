import { Container, Sprite, Assets, Texture } from "pixi.js";
import { positionsConfig } from "../positionsConfig";
import type { InteractiveItem } from "../types/interactiveItem";
import { playItemSound, fadeOutItemSound } from "../sound/effects";
import { STAGE_WIDTH, SCENE_WIDTH, PATHS } from "../constants";

interface BackgroundConfig {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface CharacterConfig {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LayerRegistry {
  interactiveItems: InteractiveItem[];
  charactersById: Map<string, InteractiveItem>;
  scrollableWidth: number;
}

export async function loadLayers() {
  const interactiveItems: InteractiveItem[] = [];
  const charactersById = new Map<string, InteractiveItem>();
  const scrollableWidth = SCENE_WIDTH - STAGE_WIDTH;

  const layers = await Promise.all(
    positionsConfig.reverse().map((layer) =>
      createLayer(layer.name, layer.bg, layer.items ?? [], {
        interactiveItems,
        charactersById,
        scrollableWidth,
      }),
    ),
  );

  return { layers, interactiveItems, charactersById };
}

async function createLayer(
  layerName: string,
  bg: BackgroundConfig,
  items: CharacterConfig[],
  registry: LayerRegistry,
) {
  const container = new Container();
  await addBackground(container, layerName, bg);
  await addCharacters(container, layerName, items, registry);

  const layerScrollRange = bg.w - STAGE_WIDTH;
  const parallaxFactor = Math.max(
    0,
    Math.min(1, layerScrollRange / registry.scrollableWidth),
  );

  return { container, parallaxFactor, baseX: bg.x };
}

async function addBackground(
  container: Container,
  layerName: string,
  bg: BackgroundConfig,
) {
  const texture = await Assets.load(PATHS.backgroundImage(layerName, bg.id));
  const sprite = new Sprite(texture);
  Object.assign(sprite, { x: bg.x, y: bg.y, width: bg.w, height: bg.h });
  container.addChild(sprite);
}

async function addCharacters(
  container: Container,
  layerName: string,
  items: CharacterConfig[],
  registry: LayerRegistry,
) {
  await Promise.all(
    items.map((item) =>
      createCharacterItem(container, layerName, item, registry),
    ),
  );
}

async function createCharacterItem(
  container: Container,
  layerName: string,
  item: CharacterConfig,
  registry: Omit<LayerRegistry, "scrollableWidth">,
) {
  const [defaultTexture, hoverTexture] = await Promise.all([
    Assets.load(PATHS.itemImage(layerName, item.id, 0)) as Promise<Texture>,
    Assets.load(PATHS.itemImage(layerName, item.id, 1)) as Promise<Texture>,
  ]);

  const sprite = new Sprite(defaultTexture);
  Object.assign(sprite, {
    x: item.x,
    y: item.y,
    width: item.w,
    height: item.h,
    eventMode: "static",
  });

  sprite.on("pointerover", () => {
    sprite.texture = hoverTexture;
    playItemSound(item.id);
  });

  sprite.on("pointerout", () => {
    sprite.texture = defaultTexture;
    fadeOutItemSound(item.id);
  });

  const characterItem: InteractiveItem = {
    id: item.id,
    sprite,
    textureDefault: defaultTexture,
    textureHover: hoverTexture,
  };

  registry.interactiveItems.push(characterItem);
  registry.charactersById.set(item.id, characterItem);
  container.addChild(sprite);
}
