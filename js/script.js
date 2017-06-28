/**
 * Created by nhatnk on 6/26/17.
 */

const DEFAULT_SNAKE_SPEED = 10;
const DEFAULT_SNAKE_X_POSITION = 0;
const DEFAULT_SNAKE_Y_POSITION = 500;
const DEFAULT_SNAKE_RADIUS = 20;

const ORIENTATION_LEFT = 1;
const ORIENTATION_RIGHT = 2;
const ORIENTATION_UP = 3;
const ORIENTATION_DOWN = 4;

const SNAKE_STATUS_ALIVE = 1;
const SNAKE_STATUS_DEAD = 2;

const BAIT_TYPE_BOM = 1;
const BAIT_TYPE_FOOD = 2;

function Snake(color, name, size){
    this.color = color;
    this.name = name;
    this.size = size;
    this.speed = DEFAULT_SNAKE_SPEED;
    this.orientation = ORIENTATION_RIGHT;
    this.status = SNAKE_STATUS_ALIVE;
    this.xPosition = DEFAULT_SNAKE_X_POSITION;
    this.yPosition = DEFAULT_SNAKE_Y_POSITION;
    this.body = [[]];
    /***
     * Neu an phai Bom thi chet. Neu an food thi song,
     * tang kich thuoc, tang diem. KHONG tang toc do.
     * @param bait: ......
     */
    this.eat = function(bait){
        if(bait.type === BAIT_TYPE_BOM){
            this.die();
        } else {
            this.increaseSize(1);
            this.score += bait.score
        }
    };

    /***
     *
     */
    this.move = function () {
        switch (this.orientation){
            case ORIENTATION_RIGHT:
                this.moveRight();
                break;
            case ORIENTATION_LEFT:
                this.moveLeft();
                break;
            case ORIENTATION_DOWN:
                this.moveDown();
                break;
            case ORIENTATION_UP:
                this.moveUp();
                break;
        }
    };

    this.moveLeft = function(){
        this.xPosition -= this.speed;
    };

    this.moveRight = function(){
        this.xPosition += this.speed;
    };

    this.moveUp = function(){
        this.yPosition -= this.speed;
    };

    this.moveDown = function(){
        this.yPosition += this.speed;
    };

    /***
     *
     */
    this.die = function(){
        this.status = SNAKE_STATUS_DEAD;
    };

    /***
     *
     * @param amount
     * @returns {*}
     */
    this.increaseSize = function (amount) {
        this.size += amount;
        return this.size;
    };

    this.show = function(){
        var ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.clearRect(0, 0, 800, 500);
        ctx.beginPath();
        ctx.arc(this.xPosition + DEFAULT_SNAKE_RADIUS, this.yPosition - DEFAULT_SNAKE_RADIUS, DEFAULT_SNAKE_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function Bait(type, score){
    this.type = BAIT_TYPE_FOOD;
    this.score = score;
}


var snake = new Snake('red', 'NgNg', 1);
snake.show();

function startMoving(){
    snake.move();
    snake.show();
    setTimeout(startMoving, 100);
}

startMoving();

function controlSnake(event){
    console.log(event);
    if(event.which === 38){
        snake.orientation = ORIENTATION_UP;
    }
    if(event.which === 39){
        snake.orientation = ORIENTATION_RIGHT;
    }
    if(event.which === 40){
        snake.orientation = ORIENTATION_DOWN;
    }
    if(event.which === 37){
        snake.orientation = ORIENTATION_LEFT;
    }

}