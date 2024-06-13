document.addEventListener('DOMContentLoaded', () => {
    const TILE_TYPES = {
        GRASS: 'grass',
        SIDEWALK: 'sidewalk',
        ROAD: 'road',
        NEIGHBORHOOD: 'neighborhood',
        NOTHING: 'nothing',
    };

    const NEIGHBORHOOD_SIZE = 4;
    const SIDEWALK_SIZE = 1;
    const ROAD_SIZE = 2;
    const BORDER_SIZE = 1;

    const TILE_SIZE = { width: 62, height: 32 }; // Dimensions of the tile images
    const TILE_IMAGES = {};

    const PATTERN_RULES = [
        {
            pattern: [
                [undefined, undefined, undefined],
                [undefined, TILE_TYPES.GRASS, undefined],
                [undefined, undefined, undefined],
            ],
            image: 'assets/tiles/grass.png'
        },
        {
            pattern: [
                [undefined, undefined, undefined],
                [undefined, TILE_TYPES.NOTHING, undefined],
                [undefined, undefined, undefined],
            ],
            image: 'assets/tiles/grass.png'
        },
        {
            pattern: [
                [undefined, undefined, undefined],
                [TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK],
                [undefined, undefined, undefined],
            ],
            image: 'assets/tiles/sidewalk-horizontal.png'
        },
        {
            pattern: [
                [undefined, TILE_TYPES.SIDEWALK, undefined],
                [undefined, TILE_TYPES.SIDEWALK, undefined],
                [undefined, TILE_TYPES.SIDEWALK, undefined],
            ],
            image: 'assets/tiles/sidewalk-vertical.png'
        },
        {
            pattern: [
                [undefined, TILE_TYPES.SIDEWALK, undefined],
                [undefined, TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK],
                [undefined, undefined, undefined],
            ],
            image: 'assets/tiles/sidewalk-corner-0.png'
        },
        {
            pattern: [
                [undefined, undefined, undefined],
                [TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK, undefined],
                [undefined, TILE_TYPES.SIDEWALK, undefined],
            ],
            image: 'assets/tiles/sidewalk-corner-180.png'
        },
        {
            pattern: [
                [undefined, TILE_TYPES.ROAD, undefined],
                [undefined, TILE_TYPES.ROAD, TILE_TYPES.SIDEWALK],
                [undefined, TILE_TYPES.ROAD, undefined],
            ],
            image: 'assets/tiles/road-vertical-b.png'
        },
        {
            pattern: [
                [undefined, TILE_TYPES.ROAD, undefined],
                [TILE_TYPES.SIDEWALK, TILE_TYPES.ROAD, undefined],
                [undefined, TILE_TYPES.ROAD, undefined],
            ],
            image: 'assets/tiles/road-vertical-a.png'
        },
        {
            pattern: [
                [undefined, undefined, undefined],
                [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
                [undefined, TILE_TYPES.SIDEWALK, undefined],
            ],
            image: 'assets/tiles/road-horizontal-a.png'
        },
        {
            pattern: [
                [undefined, TILE_TYPES.SIDEWALK, undefined],
                [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
                [undefined, undefined, undefined],
            ],
            image: 'assets/tiles/road-horizontal-b.png'
        },
    ];

    function loadImages(tileTypes, callback) {
        let loadedImages = 0;
        const totalImages = Object.keys(tileTypes).length;
        Object.keys(tileTypes).forEach(type => {
            const img = new Image();
            img.src = `assets/tiles/${tileTypes[type]}.png`;
            img.onload = () => {
                if (++loadedImages >= totalImages) {
                    callback();
                }
            };
            TILE_IMAGES[tileTypes[type]] = img;
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

                map[neighborhoodStartY][neighborhoodStartX] = TILE_TYPES.NEIGHBORHOOD;

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

        return `assets/tiles/default.png`;
    }


    function drawMap(ctx, map) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = TILE_SIZE.width / 2;
        const halfTileHeight = TILE_SIZE.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const imgSrc = matchPattern(map, x, y);
                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                    const isoX = (x - y) * (halfTileWidth + 1) + (ctx.canvas.width / 2) - halfTileWidth;
                    const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;

                    ctx.drawImage(img, isoX, isoY, TILE_SIZE.width, TILE_SIZE.height);
                };
            }
        }
    }

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const neighborhoodCount = 4;
    const map = generateMap(neighborhoodCount);

    loadImages(TILE_TYPES, () => {
        // Resize canvas based on the map size
        canvas.width = map[0].length * TILE_SIZE.width + 100;
        canvas.height = map.length * TILE_SIZE.height + 100;

        drawMap(ctx, map);
    });
});
