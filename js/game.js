import Deck from './objects/Deck.js'
const marging = 0.05;
const widthCard = 243;
const heightCard = 340;
const spaceBetweenCards = 10;
class MainScene extends Phaser.Scene
{
    deck;

    preload ()
    {
    this.deck = new Deck(this,1);        
    }

    create ()
    {
        this.deck.create();
        this.updateLayout()
        
        
        this.scale.on('resize', this.updateLayout, this);
        // setInterval(()=> {deck.shuffle(); deck.show();}, 3000)
    }

    isFlipped(){
        return this.scale.width> this.scale.height;
    }

    contentWidthSpace(){
        return this.isFlipped() ? this.scale.height - 2 * this.scale.height * marging :  this.scale.width - 2 * this.scale.width * marging;
    }

    rescale(){
        const freeWidthSpace = this.contentWidthSpace();
        const idealWidth = (spaceBetweenCards *4 - freeWidthSpace) / -5
        const idealScale = idealWidth/widthCard;
        this.deck.resize(idealScale)
    }

    spaceBetweenCards(numberOfCards = 5){
        return (this.contentWidthSpace() - (this.getCardWidth() * numberOfCards) ) / numberOfCards - 1
    }

    getCardWidth(){
        return this.deck.cards[0].getWidth();
    }

    getCardHeight(){
        return this.deck.cards[0].getHeight();
    }
    getHeightMarging(){
        return this.scale.height * marging / 2
    }

    updateLayout(){
        this.rescale();
        const isPhoneFlipped = this.isFlipped();
        const cardWidth = this.getCardWidth();
        const cardHeight = this.getCardHeight();
        const yPosition = isPhoneFlipped ? this.scale.width - this.getHeightMarging() - cardHeight/2 : this.scale.height - this.getHeightMarging() - cardHeight/2;
        let xPosition = isPhoneFlipped ? (this.scale.height - this.contentWidthSpace()) / 2 : (this.scale.width - this.contentWidthSpace()) / 2;
         for (const A_card of ["deck","clubs_A","hearts_A","spades_A", "diamonds_A"]){
            if(A_card === "deck"){
                if(isPhoneFlipped){
                    this.deck.setRotation(Phaser.Math.DegToRad(-90));
                    this.deck.moveDeck(yPosition, this.scale.height - xPosition - cardWidth/2);
                    
                }else{
                    this.deck.setRotation(Phaser.Math.DegToRad(0));
                    this.deck.moveDeck(xPosition + cardWidth/2, yPosition);
                    
                }
                
            }else{
                if(isPhoneFlipped){
                    this.deck.moveACard(A_card, yPosition, this.scale.height - xPosition - cardWidth/2);
                    this.deck.getACard(A_card).setRotation(Phaser.Math.DegToRad(-90))
                }else{
                    this.deck.moveACard(A_card, xPosition + cardWidth/2, yPosition);
                    this.deck.getACard(A_card).setRotation(Phaser.Math.DegToRad(0));
                }
                
            }
            xPosition += cardWidth + spaceBetweenCards;
        }
        this.deck.show();
    }

    update ()
    {
         
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#0d5e00', // canvas background color
    scene: MainScene,
    // width: window.innerWidth,
    // height: window.innerHeight,
    scale: {
        width: '100%',                       // optional placeholder
        height: '100%',
        mode: Phaser.Scale.RESIZE,  // Respond to window resizing
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    game.scale.resize(window.innerWidth, window.innerHeight);
  }, 100);
});