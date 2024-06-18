import Pathfinding from "./classes/Pathfinding.js";
import Car from "./classes/Car.js";

function animateTrip(canvas, ctx, map, imageStorage, mapRenderer, objectRenderer, tileSize, from, to) {
    const pathfinding = new Pathfinding(map);
    const path = pathfinding.findShortestPath(from, to);
    const car = new Car(from);
    car.setPath(path);

    function animate() {
        if (!car.isAtDestination()) {
            car.move();
            mapRenderer.drawMap(ctx, map, imageStorage);

            const halfTileWidth = tileSize.width / 2;
            const halfTileHeight = tileSize.height / 2;
            // TODO: extract this 200px shift
            const isoX = 200 + (car.position.x - car.position.y) * (halfTileWidth + 1) + (canvas.width / 2) - halfTileWidth;
            const isoY = (car.position.x + car.position.y) * (halfTileHeight / 2 + 8) + 25;

            const carImage = imageStorage['assets/objects/car.png'];
            ctx.drawImage(carImage, isoX, isoY, tileSize.width, tileSize.height);
            objectRenderer.drawObjects(ctx, map, imageStorage);

            setTimeout(animate, 100);
        }
    }

    animate();
}

export default animateTrip;