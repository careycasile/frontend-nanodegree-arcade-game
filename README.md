#Frontend NanoDegree Arcade Game

##Running The Program
This program consists of one HTML file and three javaScript files. The HTML file calls each javaScript file in order.

- The resources.js file loads and caches images.
- The app.js file is where the game player and enemy controls take place.
- The engine.js file powers the game functionality and mechanics.

The app.js file is where the game functionality takes place. Player and Enemy classes are created. New enemy instances are called with specific characteristics. Collision function detects if the player and enemy collide. The user's controls are binded to the onscreen player variable. Lastly, the player's score and high score are set and appended to the Dom.

##Playing The Game
The player starts at the bottom of the screen and the goal is to get the player to the top of the screen without getting hit by any bugs. See how many times you can get the player to the water in a row without getting hit to set a new high score. Use the arrow keys to control the player (up,down,left,right).