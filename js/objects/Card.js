export default class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, frontKey, isBack=false, scaleX = 1, scaleY = 1) {
        super(scene, x, y, frontKey);

        this.setScale(scaleX, scaleY)

        this.frontKey = frontKey;
        this.backKey = "back";
        this.isFlipped = isBack;
        this.isFlipping = false;
        this.setTexture(this.isFlipped ? this.backKey : this.frontKey);
        this.setInteractive();

        this.on('pointerdown', () => {
            this.onClick();
        });

        scene.add.existing(this);
    }

    getHeight(){
        return this.scaleY *  this.height;
    }
    getWidth(){
        return this.scaleX * this.width;
    }

    onClick(){
        if(!this.isFlipping){
            this.flip();
        }
    }

    move(x,y){
        this.x += x;
        this.y += y;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    flip() {

        this.isFlipping = true;
        const originalScaleX = this.scaleX;
        
        this.scene.tweens.add({
        targets: this,
        scaleX: 0,
        duration: 100,
        ease: 'Linear',
        onComplete: () => {
            this.isFlipped = !this.isFlipped;
            this.setTexture(this.isFlipped ? this.backKey : this.frontKey);

            this.scene.tweens.add({
            targets: this,
            scaleX: originalScaleX,
            duration: 100,
            ease: 'Linear',
            onComplete: () => {
                this.isFlipping = false;
            },
            });
        },
        });
    }
}