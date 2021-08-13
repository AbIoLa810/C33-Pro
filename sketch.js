const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var engine;
var world;
var plank;
var ground;
var higherGround;
var con, con2;
var bubble, bubbleImg;

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg=loadImage('bubble.jpg');
  
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  starImg=loadImage('star.jpg');
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}
function setup(){
  createCanvas(500,800);
  frameRate(80);


  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);

  btn2 = createImg('cut_btn.png');
  btn2.position(30,420);
  btn2.size(60,60);
  btn2.mouseClicked(drop);


  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con=new Link(rope,fruit);
  con2= new Link(rope2,fruit);
  ground = new Ground(250,height-10,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(270,100,100,100);
  bunny.scale = 0.2;
  bunny.addImage(rabbit);
  var fruit_options={
    restitution:0.8
  }
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);

  bubble=createSprite(290,460,20,20);
  bubble.addImage(bubbleImg);
  bubble.scale=0.1;
  higherGround=new Ground(300,170,100,10);
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  ellipseMode(RADIUS);
}
function draw(){
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  Engine.update(engine);
  ground.show();
  higherGround.show();
  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    remove_rope();
    bubble.visible=false
    bunny.changeAnimation('eating');
    fruit=null;
  }
  if(collide(fruit,bunny,40)==true)
  {
    engine.world.gravity.y=-1
    bubble.position.x=fruit.position.x
    bubble.position.y=fruit.position.y
  }

  
   
}

function drop(){
  rope2.break();
  con2.detach();
  con2 = null; 
}
function remove_rope(){
  rope.break();
  con.detach();
  con = null; 
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}