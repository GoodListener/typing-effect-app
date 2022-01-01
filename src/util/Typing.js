export default class Typing {
    text = '';
    x = 0;
    y = 0;
    direction = false; // true : right, false : left
    timeStamp = 0;

    constructor(text, canvas) {
        this.text = text;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.x = getRandomPosition(this.canvas.width);
        this.direction = (this.x / this.canvas.width) > 0.5;
        this.y = this.canvas.height;
        this.timeStamp = new Date().getTime();
    }
    
    draw() {
        const currentTimeStamp = new Date().getTime();
        if (currentTimeStamp - this.timeStamp > 1000) {
            delete this;
            return;
        }
        this.context.font = '70px serif';
        this.context.fillText(this.text, this.getX(currentTimeStamp), this.getY(currentTimeStamp));
    }

    getX(currentTimeStamp) {
        const vx = (currentTimeStamp - this.timeStamp) * 0.3;
        return this.direction ? this.x + vx : this.x - vx;
    }

    getY(currentTimeStamp) {
        let vy = (currentTimeStamp - this.timeStamp) * 0.8;
        if (vy < 200) {
            this.y = this.y * 0.95;
        } else if (vy < 250) {
            this.y = this.y * 0.98;
        } else if (vy < 300) {
            this.y = this.y * 1.02;
        } else {
            this.y = this.y * 1.05;
        }
        return this.y;
    }
}

function getRandomPosition(size) {
    return Math.random() * size;
}