document.addEventListener('DOMContentLoaded', () => {
    const TILE_TYPES = {
        GRASS: '.',
        SIDEWALK: '-',
        ROAD: 'R',
        NEIGHBORHOOD: 'N',
        NOTHING: ' ',
    };

    const NEIGHBORHOOD_SIZE = 4;
    const SIDEWALK_SIZE = 1;
    const ROAD_SIZE = 2;
    const BORDER_SIZE = 1;

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

    const neighborhoodCount = 4;
    const map = generateMap(neighborhoodCount);

    console.table(map);
});
