import * as Phaser from 'phaser';
import {CONFIG_TAMANIO} from '../../configuracion/config';

export class EscenaInicio extends Phaser.Scene {
    velocidadFondo = 7;
    background: Phaser.GameObjects.TileSprite;
    jugador: Phaser.Physics.Arcade.Sprite;
    textoBotonIzquierda;
    textoBotonDerecha;
    carrilIzquierdo = 640; // 128 * 5
    carrilCentral = CONFIG_TAMANIO.weight / 2;
    carrilDerecho = 1408; // 128 * 11
    velocidad = 650;
    objetivo = {
        x: this.carrilCentral,
        y: CONFIG_TAMANIO.height - 256,
    };

    preload() {
        this.load.image('background', '../../../assets/imagenes/autopista4.png');
        this.load.image('jugador', '../../../assets/imagenes/car_blue.png');
        this.load.image('caja', '../../../assets/imagenes/caja.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 2048, 960, 'background');
        this.background.setOrigin(0, 0);

        this.jugador = this.physics.add.sprite(this.carrilCentral, CONFIG_TAMANIO.height - 256, 'jugador');

        this.textoBotonIzquierda = this.add
            .text(CONFIG_TAMANIO.weight / 4, CONFIG_TAMANIO.height - 128, 'IZQUIERDA', {
                font: '75px Arial',
                fill: 'yellow'
            })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.jugador.body.velocity.x === 0) {
                    this.moverIzquierda(this.jugador.x);
                }
            });

        this.textoBotonDerecha = this.add
            .text(CONFIG_TAMANIO.weight / 2, CONFIG_TAMANIO.height - 128, 'DERECHA', {
                font: '75px Arial',
                fill: 'yellow'
            })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.jugador.body.velocity.x === 0) {
                    this.moverDerecha(this.jugador.x);
                }
            });

        const relojOpciones = this.time.addEvent(
            {
                delay: 10000,
                callback: this.crearOpciones,
                callbackScope: this,
                repeat: 3
            }
        );

        const relojPregunta = this.time.addEvent(
            {
                delay: 10000,
                callback: this.crearPregunta,
                callbackScope: this,
                repeat: 3,
                startAt: 7000,
            }
        );

        const relojFin = this.time.addEvent(
            {
                delay: 30000,
                callback: this.terminarJuego,
                callbackScope: this,
            }
        );
    }

    update(time: number, delta: number): void {
        this.background.tilePositionY -= this.velocidadFondo;
        const autoSeMueve = this.jugador.body.velocity;
        if ( autoSeMueve) {
            const distanciaAlObjetivo = Phaser.Math.Distance.Between(this.jugador.x, 0, this.objetivo.x, 0);
            const cercaAlObjetivo = distanciaAlObjetivo < 20;
            if (cercaAlObjetivo) {
                this.jugador.setVelocityX(0);
            }
        }

        // const salioCarretera = (this.jugador.x <= 4.5 * 128 || this.jugador.x >= 10.5 * 128);

        // if (salioCarretera) {
        //     this.jugador.setVelocityX(0);
        // }

    }

    moverIzquierda(posicionActualX) {

        const estaEnCarrilIzquierdo = (posicionActualX >= 4 * 128 && posicionActualX < 6.5 * 128);
        const estaEnCarrilCentral = (posicionActualX >= 6.5 * 128 && posicionActualX < 9.5 * 128);
        const estaEnCarrilDerecho = (posicionActualX >= 9.5 * 128 && posicionActualX <= 12 * 128);

        if (estaEnCarrilDerecho) {
            this.physics.moveTo(this.jugador, this.carrilCentral, this.jugador.y, this.velocidad);
            this.objetivo.x = this.carrilCentral;
        } else if (estaEnCarrilCentral) {
            this.physics.moveTo(this.jugador, this.carrilIzquierdo, this.jugador.y, this.velocidad);
            this.objetivo.x = this.carrilIzquierdo;
        }
    }

    moverDerecha(posicionActualX) {
        const estaEnCarrilIzquierdo = (posicionActualX >= 4 * 128 && posicionActualX < 6.5 * 128);
        const estaEnCarrilCentral = (posicionActualX >= 6.5 * 128 && posicionActualX < 9.5 * 128);
        const estaEnCarrilDerecho = (posicionActualX >= 9.5 * 128 && posicionActualX <= 12 * 128);

        if (estaEnCarrilIzquierdo) {
            this.physics.moveTo(this.jugador, this.carrilCentral, this.jugador.y, this.velocidad);
            this.objetivo.x = this.carrilCentral;
        } else if (estaEnCarrilCentral) {
            this.physics.moveTo(this.jugador, this.carrilDerecho, this.jugador.y, this.velocidad);
            this.objetivo.x = this.carrilDerecho;
        }
    }

    crearOpciones() {
        this.crearCaja(this.carrilCentral);
        this.crearCaja(this.carrilDerecho);
        this.crearCaja(this.carrilIzquierdo);
    }

    terminarJuego() {
        this.velocidadFondo = 0;
    }

    crearCaja(carril) {
        const caja = this.physics.add.sprite(carril, 0, 'caja');
        caja.setVelocityY(150);
        this.physics.add.overlap(this.jugador, caja, this.chocarCaja);
    }

    chocarCaja(jugador, caja) {
        console.log('la cja se ha chocado');
        caja.destroy();
    }

    crearPregunta() {
        const text = this.add.text(4.5 * 128, 50, 'Hola soy una pregunta', {
            font: '50px Arial',
            fill: 'black',
        });

        text.setDepth(25);

        this.add.rectangle(1024, 45, 1000, 100, 0xffffff);
    }

}
