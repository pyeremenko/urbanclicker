import { TILE_TYPES, PATTERN_RULES } from './patternRules.js';

document.addEventListener('DOMContentLoaded', () => {
    const NEIGHBORHOOD_SIZE = 6;
    const SIDEWALK_SIZE = 1;
    const ROAD_SIZE = 2;
    const BORDER_SIZE = 3;

    const TILE_SIZE = { width: 62, height: 32 }; // Dimensions of the tile images
    const OBJECT_TYPES = ['house-1.png', 'house-2.png', 'house-3.png', 'house-4.png', 'house-5.png', 'house-6.png', 'house-7.png', 'house-8.png', 'parking-3.png'];
    const IMAGE_STORAGE = {};

    function collectFilenames() {
        const filenames = new Set();

        for (const type in TILE_TYPES) {
            filenames.add(`assets/tiles/${TILE_TYPES[type]}.png`);
        }

        for (const rule of PATTERN_RULES) {
            filenames.add(rule.image);
        }

        OBJECT_TYPES.forEach(type => {
            filenames.add(`assets/objects/${type}`);
        });

        return Array.from(filenames);
    }

    function preloadImages(filenames, callback) {
        let loadedImages = 0;
        const totalImages = filenames.length;

        filenames.forEach(filename => {
            const img = new Image();
            img.src = filename;
            img.onload = () => {
                if (++loadedImages >= totalImages) {
                    callback();
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${filename}`);
            };
            IMAGE_STORAGE[filename] = img;
        });
    }

    function generateMap(neighborhoodCount) {
        const mapSize = Math.ceil(Math.sqrt(neighborhoodCount));
        const totalNeighborhoodSize = mapSize * (NEIGHBORHOOD_SIZE + SIDEWALK_SIZE * 2 + ROAD_SIZE) + ROAD_SIZE + BORDER_SIZE * 2;

        const map = Array.from(
            { length: totalNeighborhoodSize },
            () => Array(totalNeighborhoodSize).fill(TILE_TYPES.GRASS)
        );

        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {
                const neighborhoodStartY = BORDER_SIZE + i * (NEIGHBORHOOD_SIZE + SIDEWALK_SIZE * 2 + ROAD_SIZE) + ROAD_SIZE + SIDEWALK_SIZE;
                const neighborhoodStartX = BORDER_SIZE + j * (NEIGHBORHOOD_SIZE + SIDEWALK_SIZE * 2 + ROAD_SIZE) + ROAD_SIZE + SIDEWALK_SIZE;

                for (let y = 0; y < NEIGHBORHOOD_SIZE; y++) {
                    for (let x = 0; x < NEIGHBORHOOD_SIZE; x++) {
                        map[neighborhoodStartY + y][neighborhoodStartX + x] = TILE_TYPES.NOTHING;
                    }
                }

                for (let k = 0; k < NEIGHBORHOOD_SIZE; k += 2) {
                    for (let l = 0; l < NEIGHBORHOOD_SIZE; l += 2) {
                        if (Math.random() > 0.04) {
                            map[neighborhoodStartY + k][neighborhoodStartX + l] = TILE_TYPES.NEIGHBORHOOD;
                        }
                    }
                }

                for (let y = -1; y <= NEIGHBORHOOD_SIZE; y++) {
                    map[neighborhoodStartY + y][neighborhoodStartX - 1] = TILE_TYPES.SIDEWALK;
                    map[neighborhoodStartY + y][neighborhoodStartX + NEIGHBORHOOD_SIZE] = TILE_TYPES.SIDEWALK;
                }
                for (let x = -1; x <= NEIGHBORHOOD_SIZE; x++) {
                    map[neighborhoodStartY - 1][neighborhoodStartX + x] = TILE_TYPES.SIDEWALK;
                    map[neighborhoodStartY + NEIGHBORHOOD_SIZE][neighborhoodStartX + x] = TILE_TYPES.SIDEWALK;
                }

                for (let roadRow = 0; roadRow < ROAD_SIZE; roadRow++) {
                    const shift = SIDEWALK_SIZE + roadRow;

                    for (let y = -1 - shift; y <= NEIGHBORHOOD_SIZE + shift; y++) {
                        map[neighborhoodStartY + y][neighborhoodStartX - 1 - shift] = TILE_TYPES.ROAD;
                        map[neighborhoodStartY + y][neighborhoodStartX + NEIGHBORHOOD_SIZE + shift] = TILE_TYPES.ROAD;
                    }
                    for (let x = -1 - shift; x <= NEIGHBORHOOD_SIZE + shift; x++) {
                        map[neighborhoodStartY - 1 - shift][neighborhoodStartX + x] = TILE_TYPES.ROAD;
                        map[neighborhoodStartY + NEIGHBORHOOD_SIZE + shift][neighborhoodStartX + x] = TILE_TYPES.ROAD;
                    }
                }
            }
        }

        return map;
    }

    function matchPattern(map, x, y) {
        for (const rule of PATTERN_RULES) {
            const { pattern, image } = rule;
            let match = true;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const tileX = x + dx;
                    const tileY = y + dy;
                    const patternTile = pattern[dy + 1][dx + 1];
                    const mapTile = (map[tileY] && map[tileY][tileX]) || undefined;

                    if (patternTile !== undefined && patternTile !== mapTile) {
                        match = false;
                        break;
                    }
                }
                if (!match) break;
            }

            if (match) return image;
        }

        return `assets/tiles/${map[y][x]}.png`;
    }

    function drawMap(ctx, map) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = TILE_SIZE.width / 2;
        const halfTileHeight = TILE_SIZE.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const imgSrc = matchPattern(map, x, y);
                const img = IMAGE_STORAGE[imgSrc];

                if (img) {
                    const isoX = (x - y) * (halfTileWidth + 1) + (ctx.canvas.width / 2) - halfTileWidth;
                    const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
                    ctx.drawImage(img, isoX, isoY, TILE_SIZE.width, TILE_SIZE.height);
                } else {
                    console.error(`Missing image for source: ${imgSrc}`);
                }
            }
        }
    }

    function drawObjects(ctx, map) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = TILE_SIZE.width / 2;
        const halfTileHeight = TILE_SIZE.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === TILE_TYPES.NEIGHBORHOOD) {
                    const imgSrc = `assets/objects/${OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)]}`;
                    const img = IMAGE_STORAGE[imgSrc];

                    if (img) {
                        const isoX = (x - y) * (halfTileWidth + 1) + (ctx.canvas.width / 2) - halfTileWidth;
                        const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
                        ctx.drawImage(img, isoX - 32, isoY - 137, 126, 200);
                    } else {
                        console.error(`Missing image for source: ${imgSrc}`);
                    }
                }
            }
        }
    }

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const neighborhoodCount = 4;
    const map = generateMap(neighborhoodCount);

    const filenames = collectFilenames();

    preloadImages(filenames, () => {
        canvas.width = map[0].length * TILE_SIZE.width + 100;
        canvas.height = map.length * TILE_SIZE.height + 100;

        drawMap(ctx, map);
        drawObjects(ctx, map);
    });
});
