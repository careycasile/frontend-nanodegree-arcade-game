// Carey Casile 9/26/16 - This app.js file controls the player and enemy sprites as well as game score keeping

// creates main class that enemies and player inherit from 
var Sprite = function(xAxis, yAxis) {
    'use strict';
    this.x = xAxis;
    this.y = yAxis;
    this.originalX = xAxis;
};

// Enemies our player must avoid
var Enemy = function(xAxis, yAxis) {
    "use strict";
    Sprite.call(this, xAxis, yAxis);
    this.sprite = 'images/enemy-bug.png';
};

//creating a constructor to start adding methods to the Enemy class
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

//sets enemy speed
Enemy.prototype.speed = function(speed) {
    'use strict';
    this.speed = speed;
};

// player class is created, the player's initial x and y coordinates are set. score is set at 0
var Player = function(xAxis, yAxis) {
    "use strict";
    Sprite.call(this, xAxis, yAxis);
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.highScore = 0;
};

//creating a constructor to start adding methods to the player class
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

//checks for player/enemy collision
Enemy.prototype.collision = function(player){
    "use strict";
    if ((player.y + 30) > this.y && (player.y + 30) < (this.y + 50) && (player.x + 30) > this.x && (player.x + 30) < (this.x + 50)) {
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

// Updates the enemies position on the screen
// Parameter: dt, a time delta between ticks to smooth out gameplay between computers. then calls the Enemy.collision function
Enemy.prototype.update = function(dt) {
    "use strict";
    this.x = this.x + (this.speed*dt);
    if (this.x > 605) {
        this.x = this.originalX;
    }
    this.collision(player);
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//draws the player on the screen
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Switch statement is used to move player around the screen
Player.prototype.handleInput = function(keys) {
    "use strict";
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
var enemy1 = new Enemy(-9000, 230);
enemy1.speed = 800;
var enemy2 = new Enemy(-200, 120);
enemy2.speed = 200;
var enemy3 = new Enemy(-600, 230);
enemy3.speed = 100;
var enemy4 = new Enemy(-800, 120);
enemy4.speed = 400;
var enemy5 = new Enemy(-400, 230);
enemy5.speed = 500;
var enemy6 = new Enemy(-350, 50);
enemy6.speed = 600;
var enemy7 = new Enemy(-400, 50);
enemy7.speed = 70;
var enemy8 = new Enemy(-350, 50);
enemy8.speed = 80;
var enemy9 = new Enemy(-800, 50);
enemy9.speed = 500;
var enemy10 = new Enemy(-800, 50);
enemy10.speed = 100;

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
var player = new Player(205, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//variables and functions to append the score to the dom
var para;
var scoreKeeper = function () {
    "use strict";
    var displayScore;
    var divTag;
    var nodeScore;
    displayScore = "Player Score: " + player.score + " High Score: " + player.highScore;
    divTag = document.getElementById("div");
    para = document.createElement("p");
    divTag.appendChild(para);
    nodeScore = document.createTextNode(displayScore);
    para.appendChild(nodeScore);
};
scoreKeeper();