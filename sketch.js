//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var dogImage,dogImage1;

function preload()
{
	//load images here
  dogImage=loadImage("images/Dog.png");
  dogHappy=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);

  dog=createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale=0.1;

  database=firebase.database();
    console.log(database)

  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showerror);
    
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    foodS=foodS-1;
  }
  if(foodS<=0){
    dog.addImage(dogImage);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(7);
  text("Note:Press UP_ARROW Key To Feed The Dog!",50,200);
  text("Food Remaining:"+foodS,140,300);

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
function showerror(){
  console.log("error in writing to the database")
}



