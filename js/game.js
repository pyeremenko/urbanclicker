import ImageLoader from './classes/ImageLoader.js';
import IsometricCanvas from "./classes/IsometricCanvas.js";
import MapGenerator from "./classes/MapGenerator.js";
import MapRenderer from './classes/MapRenderer.js';
import ObjectRenderer from './classes/ObjectRenderer.js';
import animateTrip from './trip.js';
import { ROAD_DIRECTION_PATTERN_RULES, TILE_IMAGE_PATTERN_RULES, PatternMatcher } from './classes/PatternMatcher.js';

document.addEventListener('DOMContentLoaded', () => {
    const NEIGHBORHOOD_COUNT = 9;
    const NEIGHBORHOOD_SIZE = 6;
    const SIDEWALK_SIZE = 1;
    const ROAD_SIZE = 2;
    const BORDER_SIZE = 3;

    const OBJECT_TYPES = ['house-1.png', 'house-2.png', 'house-3.png', 'house-4.png', 'house-5.png', 'house-6.png', 'house-7.png', 'house-8.png', 'house-9.png', 'parking-3.png', 'park-1.png'];
    const TILE_SIZE = { width: 62, height: 32 };

    const imagePatternMatcher = new PatternMatcher(TILE_IMAGE_PATTERN_RULES);
    const directionPatternMatcher = new PatternMatcher(ROAD_DIRECTION_PATTERN_RULES);
    const mapGenerator = new MapGenerator(NEIGHBORHOOD_SIZE, SIDEWALK_SIZE, ROAD_SIZE, BORDER_SIZE, directionPatternMatcher, OBJECT_TYPES);
    const objectRenderer = new ObjectRenderer(TILE_SIZE);
    const imageLoader = new ImageLoader(OBJECT_TYPES);

    const canvas = document.getElementById('gameCanvas');

    const map = mapGenerator.generateBaseMap(NEIGHBORHOOD_COUNT);
    canvas.width = map[0].length * TILE_SIZE.width + 100 + 400; // TODO: extract this 400px shift
    canvas.height = map.length * TILE_SIZE.height + 100;
    const ctx = canvas.getContext('2d');

    const isoCanvas = new IsometricCanvas(ctx, {
        tileSize: TILE_SIZE,
        width: canvas.width,
        height: canvas.height,
    });
    const mapRenderer = new MapRenderer(imagePatternMatcher, isoCanvas);

    const filenames = imageLoader.collectFilenames();

    imageLoader.preloadImages(filenames, () => {
        const imageStorage = imageLoader.getImageStorage();
        mapGenerator.fillMapMetadata(map);

        mapRenderer.drawMap(map, imageStorage);
        objectRenderer.drawObjects(map, isoCanvas, imageStorage);

        const gameWrapper = document.getElementById('game-container');
        document.scrollingElement.scrollLeft = (canvas.width - gameWrapper.clientWidth) / 2;

        animateTrip(map, imageStorage, mapRenderer, objectRenderer, isoCanvas, {x: 10, y: 33}, {x: 21, y: 14});

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const mapCoords = isoCanvas.canvasToMapCoords(x, y);
            console.log('Map Coordinates:', mapCoords);
        });

    });
});
