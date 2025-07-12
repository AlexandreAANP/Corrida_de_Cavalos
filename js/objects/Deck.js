import Card from './Card.js'
import ACard from './ACard.js';
const nipes = ["clubs","diamonds","hearts","spades"];
const cardValues = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
export default class Deck {
    constructor(scene, scale= 0.6){
        this.scene = scene;
        this.scale = scale;
        this.scene.load.image('back', 'cards/back.png');
        this.load();
        this.x = 0;
        this.y = 0;
        this.cards = []
        
    }

    resize(scale){
        this.scale = scale;
        this.cards.forEach((card) => card.setScale(this.scale))
    }
    create(){
        for(let nipe of nipes){
            for(let value of cardValues){
                if(value == "A"){
                    this.cards.push(new ACard(this.scene, this.x, this.y, `${nipe}_${value}`, false, this.scale, this.scale));
                }else{
                    this.cards.push(new Card(this.scene, this.x, this.y, `${nipe}_${value}`, true, this.scale, this.scale));
                }
            
            }
        }
        this.hideAllCards();
        this.shuffle();
    }

    shuffle(){
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    hideAllCards(){
        this.cards.forEach((card) => card.setVisible(false));
    }

    moveDeck(x,y){
        this.cards.forEach((card) => {card.setPosition(x,y)})
    }

    load(){
            for(const nipe of nipes){
            for(const value of cardValues){
                this.scene.load.image(`${nipe}_${value}`, `cards/${nipe}_${value}.png`);
            }
        }
    }
    
    show(){
        let mappingCards = {}
        this.cards.forEach((card) => {
            const key = `${card.x}-${card.y}`;
            if (Object.keys(mappingCards).includes(key)){
                if(mappingCards[key].length == 2){
                    mappingCards[key].shift();
                    mappingCards[key].push(card)
                }else{
                    mappingCards[key].push(card)
                }
            }else{
                mappingCards[key] = [card];
            }
        });
        this.hideAllCards();
        for(const listCard of Object.values(mappingCards)){
            listCard.forEach((card) => card.setVisible(true))
        }
    }

    moveSpecificCard(key, x, y){
        this.getCard(key)?.setPosition(x,y);
    }
    getCard = (key) => this.cards.find((card) => card.frontKey == key);


}