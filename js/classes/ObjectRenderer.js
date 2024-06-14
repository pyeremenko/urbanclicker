class ObjectRenderer {
    constructor(tileSize, objectTypes) {
        this.tileSize = tileSize;
        this.objectTypes = objectTypes;
    }

    drawObjects(ctx, map, imageStorage) {
        ctx.imageSmoothingEnabled = false;
        const halfTileWidth = this.tileSize.width / 2;
        const halfTileHeight = this.tileSize.height / 2;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === 'neighborhood') { // assuming TILE_TYPES.NEIGHBORHOOD is 'neighborhood'
                    const imgSrc = `assets/objects/${this.objectTypes[Math.floor(Math.random() * this.objectTypes.length)]}`;
                    const img = imageStorage[imgSrc];

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
}

export default ObjectRenderer;
