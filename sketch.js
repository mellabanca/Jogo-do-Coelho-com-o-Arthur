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

function preload(){
  cena = loadImage("background.png");
  chocolate = loadImage("Ovo.png");
  tobi = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  piso = new Piso(200,690,600,20);
  corda = new Rope(6,{x:245,y:30});
  ovc = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,ovc);
  chave = new Chave(corda,ovc); 
}

function draw() 
{
  background(51);
  image(cena, width/2, height/2, 500, 700);

  Engine.update(engine);

  piso.exibir();
  corda.show();

  image(chocolate, ovc.position.x,ovc.position.y,60,75);
}




