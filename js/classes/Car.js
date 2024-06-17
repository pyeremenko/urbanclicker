class Car {
    constructor(initialPosition) {
        this.position = initialPosition;
        this.path = [];
        this.currentStep = 0;
    }

    setPath(path) {
        this.path = path;
        this.currentStep = 0;
    }

    move() {
        if (this.currentStep < this.path.length - 1) {
            this.position = this.path[this.currentStep];
            this.currentStep++;
        }
    }

    isAtDestination() {
        return this.currentStep >= this.path.length - 1;
    }
}

export default Car;