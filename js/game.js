import TileMap from './classes/TileMap.js';
import ObjectRenderer from './classes/ObjectRenderer.js';
import ImageLoader from './classes/ImageLoader.js';
import { PATTERN_RULES, PatternMatcher } from './classes/PatternMatcher.js';

document.addEventListener('DOMContentLoaded', () => {
    const TILE_SIZE = { width: 62, height: 32 };
    const NEIGHBORHOOD_SIZE = 8;
    const SIDEWALK_SIZE = 1;
    const ROAD_SIZE = 2;
    const BORDER_SIZE = 3;
    const OBJECT_TYPES = ['house-1.png', 'house-2.png', 'house-3.png', 'house-4.png', 'house-5.png', 'house-6.png', 'house-7.png', 'house-8.png', 'house-9.png', 'parking-3.png', 'park-1.png'];

    const patternMatcher = new PatternMatcher(PATTERN_RULES);
    const tileMap = new TileMap(TILE_SIZE, NEIGHBORHOOD_SIZE, SIDEWALK_SIZE, ROAD_SIZE, BORDER_SIZE, patternMatcher);
    const objectRenderer = new ObjectRenderer(TILE_SIZE, OBJECT_TYPES);
    const imageLoader = new ImageLoader(OBJECT_TYPES);

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const neighborhoodCount = 9;
    const map = tileMap.generateMap(neighborhoodCount);

    const filenames = imageLoader.collectFilenames();

    imageLoader.preloadImages(filenames, () => {
        const imageStorage = imageLoader.getImageStorage();

        canvas.width = map[0].length * TILE_SIZE.width + 100;
        canvas.height = map.length * TILE_SIZE.height + 100;

        tileMap.drawMap(ctx, map, imageStorage);
        objectRenderer.drawObjects(ctx, map, imageStorage);
    });
});
