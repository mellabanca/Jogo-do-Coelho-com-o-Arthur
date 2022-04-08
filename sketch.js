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
var corda2;
var corda3;
var ovc;
var chave;
var chave2;
var chave3;

var cena;
var chocolate;
var tobi;
var coelho;

var botal;
var botal2;
var botal3;


var piscando;
var comendo;
var triste;

var thau, tek, mimi, nhenhe, suuu;
var balu;
var muty;



function preload(){
  cena = loadImage("background.png");
  chocolate = loadImage("Ovo.png");
  tobi = loadImage("Rabbit-01.png");
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  triste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  thau = loadSound("sound1.mp3");
  tek = loadSound("rope_cut.mp3");
  mimi = loadSound("sad.wav");
  nhenhe = loadSound("eating_sound.mp3");
  suuu = loadSound("air.wav");

  piscando.playing = true;
  comendo.playing = true;
  triste.playing = true;

  comendo.looping = false;
  triste.looping = false;
}

function setup() 
{
  var estanocelular = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(estanocelular){
    telaW = displayWidth;
    telaH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  } else {
    telaW = windowWidth;
    telaH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
 
  thau.play();
  thau.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;

  piscando.frameDelay = 20;
  comendo.frameDelay = 20;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  piso = new Piso(200,telaH,600,20);
  corda = new Rope(8,{x:40,y:30});
  corda2 = new Rope(7,{x:370,y:40});
  corda3 = new Rope(4,{x:400,y:225});
  ovc = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,ovc);
  chave = new Chave(corda,ovc);
  chave2 = new Chave(corda2,ovc);
  chave3 = new Chave(corda3,ovc);
  coelho = createSprite(420,telaH-80,100,100);
  coelho.addImage(tobi);
  coelho.scale = 0.2
  coelho.addAnimation("piscando", piscando);
  coelho.addAnimation("comendo", comendo);
  coelho.addAnimation("chorando", triste);
  coelho.changeAnimation("piscando");
  botal = createImg("cut_btn.png");
  botal.position(20,30);
  botal.size(50,50);
  botal.mouseClicked(cai);
  botal2 = createImg("cut_btn.png");
  botal2.position(330,35);
  botal2.size(50,50);
  botal2.mouseClicked(cai2);
  botal3 = createImg("cut_btn.png");
  botal3.position(360,200);
  botal3.size(50,50);
  botal3.mouseClicked(cai3);
  //balu = createImg("balloon.png");
  //balu.position(10,210);
  //balu.size(150,100);
  //balu.mouseClicked(vento);
  muty = createImg("mute.png");
  muty.position(450,20);
  muty.size(50,50);
  muty.mouseClicked(mut);
}

function draw() 
{
  background(51);
  image(cena, width/2, height/2, displayWidth+80, displayHeight);

  Engine.update(engine);

  piso.exibir();
  corda.show();
  corda2.show();
  corda3.show();
  if(colid(ovc,coelho)===true){
    coelho.changeAnimation("comendo");
    nhenhe.play();
  }
  if(ovc !==null && ovc.position.y >= 650){
    coelho.changeAnimation("chorando");
    ovc = null;
    thau.stop();
    mimi.play();
  }
  if(ovc!==null){
  image(chocolate, ovc.position.x,ovc.position.y,60,75);
  }
  
  drawSprites();
}

function cai(){
  corda.break();
  chave.cortar();
  chave = null;
  tek.play();
  
}
function cai2(){
  corda2.break();
  chave2.cortar();
  chave2 = null;
  tek.play();
  
}
function cai3(){
  corda3.break();
  chave3.cortar();
  chave3 = null;
  tek.play();
  
}

function colid(corpo,Sprite){
if(corpo!==null){
  var longe=dist(corpo.position.x,corpo.position.y,Sprite.position.x,Sprite.position.y);
  if(longe<=80){
    World.remove(engine.world,ovc);
    ovc = null;
    return true;
  }else{
    return false;
  }
}
}
function vento(){
  Matter.Body.applyForce(ovc,{x:0,y:0},{x:0.01,y:0});
  suuu.play();

}
function mut(){
  if(thau.isPlaying()){
    thau.stop();
  }else{
    thau.play();
  }
}