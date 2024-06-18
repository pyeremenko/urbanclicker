import { TILE_TYPES } from './PatternMatcher.js';

class ObjectRenderer {
    constructor(tileSize) {
        this.tileSize = tileSize;
    }

    drawObjects(ctx, map, imageStorage) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = this.tileSize.width / 2;
        const halfTileHeight = this.tileSize.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x].type === TILE_TYPES.NEIGHBORHOOD) {
                    const img = imageStorage[map[y][x].properties.imageSrc];

                    if (img) {
                        // TODO: extract this 200px shift
                        const isoX = 200 + (x - y) * (halfTileWidth + 1) + (ctx.canvas.width / 2) - halfTileWidth;
                        const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
                        ctx.drawImage(img, isoX - 32, isoY - 137, 126, 200);
                    } else {
                        console.error(`Missing image for source: ${imgSrc}`);
                    }
                }
            }
        }
    }
}

export default ObjectRenderer;
