import ImageLoader from './classes/ImageLoader.js';
import MapGenerator from "./classes/MapGenerator.js";
import MapRenderer from './classes/MapRenderer.js';
import ObjectRenderer from './classes/ObjectRenderer.js';
import {ROAD_DIRECTION_PATTERN_RULES, TILE_IMAGE_PATTERN_RULES, PatternMatcher} from './classes/PatternMatcher.js';

document.addEventListener('DOMContentLoaded', () => {
    const NEIGHBORHOOD_COUNT = 4;
    const NEIGHBORHOOD_SIZE = 6;
    const SIDEWALK_SIZE = 1;
    const ROAD_SIZE = 2;
    const BORDER_SIZE = 3;

    const OBJECT_TYPES = ['house-1.png', 'house-2.png', 'house-3.png', 'house-4.png', 'house-5.png', 'house-6.png', 'house-7.png', 'house-8.png', 'house-9.png', 'parking-3.png', 'park-1.png'];
    const TILE_SIZE = { width: 62, height: 32 };

    const imagePatternMatcher = new PatternMatcher(TILE_IMAGE_PATTERN_RULES);
    const directionPatternMatcher = new PatternMatcher(ROAD_DIRECTION_PATTERN_RULES);
    const mapGenerator = new MapGenerator(NEIGHBORHOOD_SIZE, SIDEWALK_SIZE, ROAD_SIZE, BORDER_SIZE, directionPatternMatcher);
    const mapRenderer = new MapRenderer(TILE_SIZE, imagePatternMatcher);
    const objectRenderer = new ObjectRenderer(TILE_SIZE, OBJECT_TYPES);
    const imageLoader = new ImageLoader(OBJECT_TYPES);

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const filenames = imageLoader.collectFilenames();

    imageLoader.preloadImages(filenames, () => {
        const imageStorage = imageLoader.getImageStorage();
        const map = mapGenerator.generateBaseMap(NEIGHBORHOOD_COUNT);
        mapGenerator.fillMapMetadata(map);

        canvas.width = map[0].length * TILE_SIZE.width + 100;
        canvas.height = map.length * TILE_SIZE.height + 100;

        mapRenderer.drawMap(ctx, map, imageStorage);
        objectRenderer.drawObjects(ctx, map, imageStorage);
    });
});
