const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var piso;
var corda;
var ovc;
var chave;

var cena;
var chocolate;
var tobi;
var coelho;

var botal;

var piscando;
var comendo;


function preload(){
  cena = loadImage("background.png");
  chocolate = loadImage("Ovo.png");
  tobi = loadImage("Rabbit-01.png");
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");

  piscando.playing = true;
  comendo.playing = true;

  comendo.loop = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  piscando.frameDelay = 20;
  comendo.frameDelay = 20;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  piso = new Piso(200,690,600,20);
  corda = new Rope(6,{x:245,y:30});
  ovc = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,ovc);
  chave = new Chave(corda,ovc);
  coelho = createSprite(250,620,100,100);
  coelho.addImage(tobi);
  coelho.scale = 0.2
  coelho.addAnimation("piscando", piscando);
  coelho.addAnimation("comendo", comendo);
  coelho.changeAnimation("piscando");
  botal = createImg("cut_btn.png");
  botal.position(220,30);
  botal.size(50,50);
  botal.mouseClicked(cai);
}

function draw() 
{
  background(51);
  image(cena, width/2, height/2, 500, 700);

  Engine.update(engine);

  piso.exibir();
  corda.show();

  image(chocolate, ovc.position.x,ovc.position.y,60,75);
  drawSprites();
}

function cai(){
  corda.break();
  chave.cortar();
  chave = null;
}


