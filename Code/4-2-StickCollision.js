////// Define object types ////// 

// Beaver
var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
};

Beaver.prototype.draw = function() {
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    // Beaver checks if it grabs (collides with) a stick
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        // If grabbed, remove the stick
        stick.y = -400;
        // Add the grabbed stick to beaver
        this.sticks++;
    }
};

// Stick
var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

////// Create objects from object types //////

var beaver = new Beaver(200, 300);

var sticks = [];
for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}

// Create array for grass blocks
var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

////// Main drawing function //////
draw = function() {
    
    // Static sky background and ground
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    // Side scrolling grass blocks
    for (var i = 0; i < grassXs.length; i++) {
        // Draw the grass block
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        // Move it
        grassXs[i] -= 1;
        // Snake it
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }

    // Side scrolling sticks
    for (var i = 0; i < sticks.length; i++) {
        // Draw sticks
        sticks[i].draw();
        // Call the beaver's function to check it grabs a stick
        beaver.checkForStickGrab(sticks[i]);
        // Move the stick
        sticks[i].x -= 1;
    }
    
    // Controll for hopping
    // key.code for spacebar
    if (keyIsPressed && key.code === 32) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    // Draw the beaver
    beaver.draw();
};

