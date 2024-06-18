import {TILE_TYPES} from "./PatternMatcher.js";

class MapRenderer {
    constructor(tileSize, patternMatcher) {
        this.tileSize = tileSize;
        this.patternMatcher = patternMatcher;
    }

    drawMap(ctx, map, imageStorage) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = this.tileSize.width / 2;
        const halfTileHeight = this.tileSize.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const imgSrc = (map[y][x].type === TILE_TYPES.GRASS || map[y][x].type === TILE_TYPES.NOTHING) ?
                    ((x + y) % 2 === 0 ? `assets/tiles/grass.png` : `assets/tiles/grass-alt.png`) :
                    this.patternMatcher.matchPattern(map, x, y) ?? `assets/tiles/${map[y][x].type}.png`;
                const img = imageStorage[imgSrc];

                if (img) {
                    // TODO: extract this 200px shift
                    const isoX = 200 + (x - y) * (halfTileWidth + 1) + (ctx.canvas.width / 2) - halfTileWidth;
                    const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
                    ctx.drawImage(img, isoX, isoY, this.tileSize.width, this.tileSize.height);
                } else {
                    console.error(`Missing image for source: ${imgSrc}`);
                }
            }
        }
    }
}

export default MapRenderer;
