import Card from './Card.js'
export default class NormalCard extends Card{
    static lastPositionCard = 0;
    constructor(scene, x, y, frontKey, isBack=false, scaleX = 1, scaleY = 1){
        super(scene, x, y, frontKey, isBack, scaleX, scaleY);
        this.position = 0;
        this.rotationDeg = 0;
        this.freeHeightSpace = 3;
        this.rotationDeg = this.scene.isFlipped() ? -90 : 0
    }

    sameNipe(nipe){
        return this.frontKey.includes(nipe);
    }

    setPosition(x,y){
         if(this.rotationDeg == 0){
            this.x = x;
            this.y = y - this.position * (this.getHeight() +  this.freeHeightSpace);
         }else{
            this.y = y;
            this.x = x - this.position * (this.getHeight() + this.freeHeightSpace);
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

    onClick(){
        if(this.isFlipped){
            const lastCardInGame = this.scene.deck.cardsInGame[this.scene.deck.cardsInGame.length -1]
            if(!lastCardInGame.isFlipped && lastCardInGame != this){
                this.scene.deck.cardsInGame = []
                NormalCard.lastPositionCard = 0;
                for(let i = 0; i < 5; i++){
                //     // this.scene.deck.getLastCardVisibleInDeck()?.moveFront(); 
                //     // console.log(this.scene.deck.cardsInGame)
                //     // console.log(this.scene.deck.cardsInGame)
                //     // console.log(this.scene.deck.cardsInGame)
                    console.log(this.scene.deck.getLastCardVisibleInDeck())

                     setTimeout(()=>{this.scene.deck.getLastCardVisibleInDeck()?.moveFront(); this.scene.deck.show();}, 300* i);
                    // setInterval(()=>{this.scene.deck.getLastCardVisibleInDeck()?.moveFront(); this.scene.deck.show(); console.log(i)}, 300* i);
                }
                // this.scene.deck.cardsInGame = []
                // this.scene.deck.show();
                return;
            }else if(!this.scene.deck.cardsInGame.includes(this)){
                return;
            }

            if(this.position == 1 || !this.scene.deck.cardsInGame[this.position-1-1].isFlipped){
                this.scene.moveACard(`${this.frontKey.split("_")[0]}_A`)
                super.onClick();
            }
            
        }
    }


    moveFront(){
        console.log("moving front card:", this.frontKey, this.scene.deck.cardsInGame)
        this.setVisible(true);
        console.log(this.visible)
        let y = this.y;
        let x = this.x;
        if(NormalCard.lastPositionCard == 5 || this.position != 0) return;
        if(this.rotationDeg == 0){
            y -= this.getHeight() + this.freeHeightSpace + ( (this.getHeight() + this.freeHeightSpace ) * NormalCard.lastPositionCard);
        }else{
            x -= this.getHeight() + this.freeHeightSpace + ( (this.getHeight() + this.freeHeightSpace ) * NormalCard.lastPositionCard);
        }
        NormalCard.lastPositionCard++;
        this.position = NormalCard.lastPositionCard;
        // this.scene.deck.show()
        this.scene.tweens.add({
            targets: this,         // the object to move
            x: x,                   // new x position
            y: y,                   // new y position
            duration: 300,           // duration in ms
            ease: 'Linear',
            onComplete: () => console.log("completed animation of moving")
        });
        this.scene.deck.cardsInGame[this.position-1] = this;
        this.scene.deck.show()
        
    }

    flipped(){
        super.onClick();
    }
}