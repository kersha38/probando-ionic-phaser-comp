import {Escena2} from './escena2';

export class Escena1 extends Phaser.Scene {
    constructor() {
        super('bootScene');
    }

    preload() {
        this.load.image('fondo-oceano', '../../../assets/imagenes/background-ocean.png');
        this.load.spritesheet('pez-rojo', '../../../assets/imagenes/pez-rojo.png', {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 12,
        });
        this.load.spritesheet('pez-cafe', '../../../assets/imagenes/pez-cafe.png', {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 12,
        });
        this.load.spritesheet('pez-amarillo', '../../../assets/imagenes/pez-amarillo.png', {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 12,
        });

        this.load.image('burbuja', '../../../assets/imagenes/bubble.png');

        this.load.spritesheet('burbuja-x', '../../../assets/imagenes/bubble-explosion.png', {
            frameWidth: 236,
            frameHeight: 259,
        });

        this.load.bitmapFont('font', '../../../assets/font/font.png', '../../../assets/font/font.fnt');
    }

    create() {
        this.add.text(0, 0, 'Cargando juego - escena 1');

        this.anims.create({
            key: 'animPezRojo',
            frames: this.anims.generateFrameNumbers('pez-rojo', { start: 6, end: 8 }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'animPezCafe',
            frames: this.anims.generateFrameNumbers('pez-cafe', { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'animPezAmarillo',
            frames: this.anims.generateFrameNumbers('pez-amarillo', {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'explosionBurbuja',
            frames: this.anims.generateFrameNumbers('burbuja-x', {start: 0, end: 3}),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });


        this.scene.add('empezarJuego', Escena2, true);
        // this.scene.start('empezarJuego');


    }

}