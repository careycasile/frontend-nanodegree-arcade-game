//function that checks if two sprites occupy the same space
var collisionDetection = function (playerX, playerY, enemyX, enemyY) {
    if ((playerY + 30) > enemyY && (playerY + 30) < (enemyY + 50) && (playerX + 30) > enemyX && (playerX + 30) < (enemyX + 50)) {
        player.x = 205;
        player.y = 380;
        //checks players score for a high score and rights over the high score variable
        if (player.score >= player.highScore) {
            player.highScore = player.score;
        }
        //resets the players score after they get hit by an enemy
        player.score = 0;
        //removes previous score from the dom and updates new one with scoreKeeper function
        para.remove();
        scoreKeeper();
    }
};

// Enemies our player must avoid
var Enemy = function(xAxis, yAxis, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = xAxis;
    this.y = yAxis;
    this.originalX = xAxis;
    this.speed = speed;
};

// player class is created, the player's initial x and y coordinates are set. score is set at 0
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 205;
    this.y = 380;
    this.score = 0;
    this.highScore = 0;
};


// Updates the enemies position on the screen
// Parameter: dt, a time delta between ticks to smooth out gameplay between computers
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed*dt);
    if (this.x > 605) {
        this.x = this.originalX;
    }
    collisionDetection(player.x, player.y, this.x, this.y);
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//draws the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Switch statement is used to move player around the screen
Player.prototype.handleInput = function(keys) {
    switch(keys){
        case "left":
        if (this.x > 10) {
            this.x = this.x - 100;
        }
        break;

        case "up":
        this.y = this.y - 85;
        //checks to see if the player touches the water, resets their location and adds 1 to their score
        if (this.y < 30) {
            this.score = this.score + 1;
            //removes previous score from the dom and updates new one with scoreKeeper function
            para.remove();
            scoreKeeper();
            //resets players location
            this.x = 205;
            this.y = 380;
        }
        break;

        case "right":
        if (this.x < 335) {
        this.x = this.x + 100;
        }
        break;

        case "down":
        if (this.y < 350) {
        this.y = this.y + 85;
        }
        break;
    }
};

// Enemy instances are created
var enemy1 = new Enemy(-9000, 230, 800);
var enemy2 = new Enemy(-200, 120, 200);
var enemy3 = new Enemy(-600, 230, 100);
var enemy4 = new Enemy(-800, 120, 400);
var enemy5 = new Enemy(-400, 230, 500);
var enemy6 = new Enemy(-350, 50, 600);
var enemy7 = new Enemy(-400, 50, 70);
var enemy8 = new Enemy(-350, 50, 80);
var enemy9 = new Enemy(-800, 50, 500);
var enemy10 = new Enemy(-800, 50, 100);

// allEnemies array is created and enemies instances are pushed to it
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);
allEnemies.push(enemy7);
allEnemies.push(enemy8);
allEnemies.push(enemy9);
allEnemies.push(enemy10);

// player instance is created using the Player Class creater
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//variables and functions to append the score to the dom
var displayScore;
var divTag;
var para;
var scoreKeeper = function () {
    displayScore = "Player Score: " + player.score + " High Score: " + player.highScore;
    divTag = document.getElementById("div");
    para = document.createElement("p");
    divTag.appendChild(para);
    nodeScore = document.createTextNode(displayScore);
    para.appendChild(nodeScore);
};
scoreKeeper();