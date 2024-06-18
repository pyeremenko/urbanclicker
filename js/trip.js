import Pathfinding from "./classes/Pathfinding.js";
import Car from "./classes/Car.js";

function animateTrip(canvas, ctx, map, imageStorage, mapRenderer, objectRenderer, isoCanvas, from, to) {
    const pathfinding = new Pathfinding(map);
    const path = pathfinding.findShortestPath(from, to);
    const car = new Car(from);
    car.setPath(path);

    function animate() {
        if (!car.isAtDestination()) {
            car.move();

            mapRenderer.drawMap(map, imageStorage);
            const carImage = imageStorage['assets/objects/car.png'];
            isoCanvas.draw(car.position.x, car.position.y, carImage);
            objectRenderer.drawObjects(map, isoCanvas, imageStorage);

            setTimeout(animate, 100);
        }
    }

    animate();
}

export default animateTrip;