export class Escena2 extends Phaser.Scene {

    constructor() {
        super({key: 'empezarJuego'});
    }
    pezRojo;
    pezCafe;
    pezAmarillo;
    background;
    burbuja;
    explosionBurbuja;
    burbujasGrupo;
    scoreTitulo;
    score;

    create() {
        const anchoJuego = (this.game.config.width) as number;
        const altoJUego = (this.game.config.height) as number;
        this.background = this.add.tileSprite(0, 0, anchoJuego, altoJUego, 'fondo-oceano');
        this.background.setOrigin(0, 0);
        this.background.alpha = 0.75;

        this.score = 0;
        this.scoreTitulo = this.add.bitmapText(anchoJuego - 200, 25, 'font', 'PUNTAJE', 25);

        this.add.text(300, 0, 'Inicio - escena 2', {
            font: '25px Arial',
            fill: 'yellow'
        });

        this.pezRojo = this.add.sprite(500, 500, 'pez-rojo')
            .setScale(1.5)
            .play('animPezRojo');

        this.pezCafe = this.add.sprite(anchoJuego, altoJUego / 2, 'pez-cafe')
            .setScale(2)
            .play('animPezCafe');

        this.pezAmarillo = this.add.sprite(anchoJuego, altoJUego - 50, 'pez-amarillo')
            .setScale(2.5)
            .play('animPezAmarillo');

        this.burbujasGrupo = this.physics.add.group();

        for (let i = 0; i < 6; i++) {
            const burbuja = this.physics.add.sprite(50, 50, 'burbuja')
                .setScale(3)
                .setInteractive();
            this.burbujasGrupo.add(burbuja);
            burbuja.setRandomPosition(500, 500, anchoJuego, altoJUego);
            burbuja.setVelocity(150, 100);
            burbuja.setCollideWorldBounds(true);
            burbuja.setBounce(1);

            burbuja.on('pointerdown', (pointer) => {
                console.log('hi bubble' + i);
                burbuja.setTexture('burbuja-x');
                burbuja.play('explosionBurbuja');
                this.score += 55;
                this.scoreTitulo.text = 'PUNTAJE ' + this.score;
            });
        }

        this.physics.add.collider(this.burbujasGrupo, this.burbujasGrupo);

        // this.burbuja.on('clicked', this.explotarBurbuja, this);

        /*this.input.on('gameobjectup', (pointer, gameObject) => {
            console.log('click-1');
            gameObject.emit('clicked', gameObject);
        }, this);*/


    }

    update(time: number, delta: number): void {
        this.background.tilePositionX -= 0.3;
        this.moverPez(this.pezRojo, 1, 'derecha');
        this.moverPez(this.pezCafe, 0.5, 'izquierda');
        this.moverPez(this.pezAmarillo, 0.8, 'izquierda');
    }

    moverPez(pez, velocidad, direccion) {
        direccion === 'derecha' ? pez.x += velocidad : pez.x -= velocidad;
        if (pez.x > this.game.config.width || pez.x < 0) {
            this.reiniciarMovimientoPez(pez, direccion);
        }
    }

    reiniciarMovimientoPez(pez, direccion: string) {
        direccion === 'derecha' ? pez.x = 0 : pez.x = this.game.config.width;
        const posicionY = Phaser.Math.Between(0, (this.game.config.height) as number);
        pez.y = posicionY;
    }

    // callback
    explotarBurbuja(burbuja) {
        console.log('click-click');
        burbuja.off('clicked', this.explotarBurbuja);
        burbuja.input.enabled = false;
        burbuja.setVisible(false);
        // burbuja.setTexture('burbuja-x');
        // burbuja.play('explosionBurbuja');
    }
}
