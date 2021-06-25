function load_images(){
    //player,virus,gem
    enemy_image = new Image;
    enemy_image.src = "Assets/v3.png";
    
    player_img = new Image;
    player_img.src = "Assets/face.png";
    
    gem_image = new Image;
    gem_image.src = "Assets/gem.png";
    
    
}


function init(){
    //define the objects that we will have in the game
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 1000;
    H = 500;
    
    canvas.width = W;
    canvas.height = H;
    
    // create a context 
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over = false;
    
    e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 35,
	};
	e3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 60,
		speed : 50,
	};
	e4 = {
		x : 600,
		y : 300,
		w : 60,
		h : 60,
		speed : 60,
	};
	e5 = {
		x : 750,
		y : 400,
		w : 60,
		h : 60,
		speed : 80,
	};
    
    enemy = [e1,e2,e3, e4, e5];
    
    player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 70,
		speed : 20,
        moving  : false,
        health : 200,
        score : 0,
	};
    
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	};
    //listen to events on the canvas
    canvas.addEventListener('mousedown',function(){
        console.log("Mouse Pressed"); 
        player.moving = true;
    });
    document.addEventListener('keydown',function(e){
        console.log(e.key); 
        if(e.key == " "){
            player.moving = true;
        }
    }) ;
    document.addEventListener('keyup',function(e){
        console.log(e.key); 
        if(e.key == " "){
            player.moving = false;
        }
    }) ;

    canvas.addEventListener('mouseup',function(){
        console.log("Mouse Released"); 
        player.moving = false;
    });
    
}

function isOverlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    return true
    }
    
    return false;
    
}

function draw(){
    
    //clear the canvas area for the old frame
    pen.clearRect(0,0,W,H);
    
    // pen.fillStyle = "red";
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    //draw the player
    pen.shadowBlur = 20;
    pen.shadowColor = "black";
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    
    //draw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    
    for(let i=0; i<enemy.length; i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }

    pen.font = "20px Verdana";
    pen.fillStyle = "black";
    pen.fillText("Score : "+ player.score,30,30);
    pen.fillText("Health : "+ player.health,30,60);
    
}

function update(){
    
    if(game_over) return;
    //if the player is moving 
    if(player.moving==true){
        player.x += player.speed;
        player.score += 20;
    }
    
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            player.health -= 50;
            if(player.health <=0){
                console.log(player.health);
                game_over = true;
               
            }
        }
    }
    
   
    
    //overlap overlap
    if(isOverlap(player,gem)){
        console.log("You Won");
        game_over = true;
        return;
    }
    
    //move the box downwards
    //update each enemy by same logic
    for(let i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y <0){
            enemy[i].speed *= -1;
        }   
    }
    
}

function gameloop(){
    draw();
    if(game_over==true){
        clearInterval(f);
        if(player.health > 0 )alert("You Won!");
        else alert("Game Over! Health: " + player.health);
        return;
    }
    update();
    console.log("In gameloop");
}

load_images();
init();
var f = setInterval(gameloop,80);