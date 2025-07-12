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
    }

    onClick(){
        console.log("TO DO BET")
        this.moveFront()
    }

    setPosition(x,y){
        this.x = x;
        this.y = y - this.moveFrontTimes * (this.getHeight() +  this.freeHeightSpace);

    }

    moveFront(){
        if(this.moveFrontTimes == maxMoveFrontTimes) return;
        this.y -= this.getHeight() + this.freeHeightSpace;
        this.moveFrontTimes++;
    }
}