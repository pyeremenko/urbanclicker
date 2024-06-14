import { TILE_TYPES, PatternMatcher } from './PatternMatcher.js';

class TileMap {
    constructor(tileSize, neighborhoodSize, sidewalkSize, roadSize, borderSize, patternMatcher) {
        this.tileSize = tileSize;
        this.neighborhoodSize = neighborhoodSize;
        this.sidewalkSize = sidewalkSize;
        this.roadSize = roadSize;
        this.borderSize = borderSize;
        this.patternMatcher = patternMatcher;
    }

    generateMap(neighborhoodCount) {
        const mapSize = Math.ceil(Math.sqrt(neighborhoodCount));
        const totalNeighborhoodSize = mapSize * (this.neighborhoodSize + this.sidewalkSize * 2 + this.roadSize) + this.roadSize + this.borderSize * 2;

        const map = Array.from(
            { length: totalNeighborhoodSize },
            () => Array(totalNeighborhoodSize).fill(TILE_TYPES.GRASS)
        );

        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {
                const neighborhoodStartY = this.borderSize + i * (this.neighborhoodSize + this.sidewalkSize * 2 + this.roadSize) + this.roadSize + this.sidewalkSize;
                const neighborhoodStartX = this.borderSize + j * (this.neighborhoodSize + this.sidewalkSize * 2 + this.roadSize) + this.roadSize + this.sidewalkSize;

                for (let y = 0; y < this.neighborhoodSize; y++) {
                    for (let x = 0; x < this.neighborhoodSize; x++) {
                        map[neighborhoodStartY + y][neighborhoodStartX + x] = TILE_TYPES.NOTHING;
                    }
                }

                for (let k = 0; k < this.neighborhoodSize; k += 2) {
                    for (let l = 0; l < this.neighborhoodSize; l += 2) {
                        if (Math.random() > 0.04) {
                            map[neighborhoodStartY + k][neighborhoodStartX + l] = TILE_TYPES.NEIGHBORHOOD;
                        }
                    }
                }

                for (let y = -1; y <= this.neighborhoodSize; y++) {
                    map[neighborhoodStartY + y][neighborhoodStartX - 1] = TILE_TYPES.SIDEWALK;
                    map[neighborhoodStartY + y][neighborhoodStartX + this.neighborhoodSize] = TILE_TYPES.SIDEWALK;
                }
                for (let x = -1; x <= this.neighborhoodSize; x++) {
                    map[neighborhoodStartY - 1][neighborhoodStartX + x] = TILE_TYPES.SIDEWALK;
                    map[neighborhoodStartY + this.neighborhoodSize][neighborhoodStartX + x] = TILE_TYPES.SIDEWALK;
                }

                for (let roadRow = 0; roadRow < this.roadSize; roadRow++) {
                    const shift = this.sidewalkSize + roadRow;

                    for (let y = -1 - shift; y <= this.neighborhoodSize + shift; y++) {
                        map[neighborhoodStartY + y][neighborhoodStartX - 1 - shift] = TILE_TYPES.ROAD;
                        map[neighborhoodStartY + y][neighborhoodStartX + this.neighborhoodSize + shift] = TILE_TYPES.ROAD;
                    }
                    for (let x = -1 - shift; x <= this.neighborhoodSize + shift; x++) {
                        map[neighborhoodStartY - 1 - shift][neighborhoodStartX + x] = TILE_TYPES.ROAD;
                        map[neighborhoodStartY + this.neighborhoodSize + shift][neighborhoodStartX + x] = TILE_TYPES.ROAD;
                    }
                }
            }
        }

        return map;
    }

    drawMap(ctx, map, imageStorage) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = this.tileSize.width / 2;
        const halfTileHeight = this.tileSize.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const imgSrc = this.patternMatcher.matchPattern(map, x, y);
                const img = imageStorage[imgSrc];

                if (img) {
                    const isoX = (x - y) * (halfTileWidth + 1) + (ctx.canvas.width / 2) - halfTileWidth;
                    const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
                    ctx.drawImage(img, isoX, isoY, this.tileSize.width, this.tileSize.height);
                } else {
                    console.error(`Missing image for source: ${imgSrc}`);
                }
            }
        }
    }
}

export default TileMap;
