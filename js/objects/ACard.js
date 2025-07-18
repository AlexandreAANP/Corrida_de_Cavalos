import Card from './Card.js'

const allowedCards = ["spades_A", "clubs_A", "hearts_A", "diamonds_A"]
const maxMoveFrontTimes = 5
export default class ACard extends Card{

    constructor(scene, x, y, frontKey, isBack=false, scaleX = 1, scaleY = 1){
        if(!allowedCards.includes(frontKey)){
            throw new Error("frontKey"+frontKey+" doesn't not bellong to the A cards list only "+ allowedCards.join(", "))
        }
        super(scene, x, y, frontKey, isBack, scaleX, scaleY);
        this.moveFrontTimes = 0;
        this.freeHeightSpace = 3;
        this.rotationDeg = this.scene.isFlipped() ? -90 : 0
    }

    onClick(){
        console.log("TO DO BET")
        this.moveFront()
    }

    setPosition(x,y){
         if(this.rotationDeg == 0){
            this.x = x;
            this.y = y - this.moveFrontTimes * (this.getHeight() +  this.freeHeightSpace);
         }else{
            this.y = y;
            this.x = x - this.moveFrontTimes * (this.getHeight() + this.freeHeightSpace)
         }
       
    }
    setRotation(rotation){
        if(Phaser.Math.RadToDeg(rotation) == -90){
            this.rotationDeg = -90;
        } 
        else{
            this.rotationDeg = 0;
        }
        super.setRotation(rotation);
    }

    moveFront(){
        if(this.moveFrontTimes == maxMoveFrontTimes) return;
        let x = this.x;
        let y = this.y;
        if(this.rotationDeg == 0){
            y -= this.getHeight() + this.freeHeightSpace;
        }else{
            x -= this.getHeight() + this.freeHeightSpace;
        }

          this.scene.tweens.add({
            targets: this,         // the object to move
            x: x,                   // new x position
            y: y,                   // new y position
            duration: 300,           // duration in ms
            ease: 'Linear',
            onComplete: () => console.log("completed animation of moving")
        });
        this.moveFrontTimes++;
    }
}