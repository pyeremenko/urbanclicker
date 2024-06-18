class IsometricCanvas {
    CONTENT_SHIFT = 200;

    constructor(ctx, geometry) {
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;

        this.width = geometry.width;
        this.height = geometry.height;

        this.tileSize = geometry.tileSize;
    }

    draw(x, y, image) {
        const halfTileWidth = this.tileSize.width / 2;
        const halfTileHeight = this.tileSize.height / 2;

        if (image) {
            const isoX = this.CONTENT_SHIFT + (x - y) * (halfTileWidth + 1) + (this.width / 2) - halfTileWidth;
            const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
            this.ctx.drawImage(image, isoX, isoY, this.tileSize.width, this.tileSize.height);
        } else {
            console.error(`Missing image for source: ${image}`);
        }
    }

    drawObject(x, y, image) {
        const halfTileWidth = this.tileSize.width / 2;
        const halfTileHeight = this.tileSize.height / 2;

        if (image) {
            const isoX = this.CONTENT_SHIFT + (x - y) * (halfTileWidth + 1) + (this.width / 2) - halfTileWidth;
            const isoY = (x + y) * (halfTileHeight / 2 + 8) + 25;
            this.ctx.drawImage(image, Math.floor(isoX - image.width / 4), isoY - 137, image.width, image.height);
        } else {
            console.error(`Missing image for source: ${image}`);
        }
    }
}

export default IsometricCanvas;