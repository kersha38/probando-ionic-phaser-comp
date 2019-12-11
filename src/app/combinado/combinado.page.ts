import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { relative } from 'path';

enum CHICO_ANIMACION {
  ARRIBA = 'CHICO-ARRIBA',
  ABAJO = 'CHICO-ABAJO',
  IZQUIERDA = 'CHICO-IZQUIERDA',
  DERECHA = 'CHICO-DERECHA'
}

interface ConfiguracionGrillas {
  filas?: number;
  columnas?: number;
  altoJuego: number;
  anchoJuego: number;
}

interface Posicion {
  x: number;
  y: number;
}

class SistemaGrillas {

  anchoGrilla: number;
  altoGrilla: number;

  constructor(configuracion: ConfiguracionGrillas) {
    this.anchoGrilla = configuracion.anchoJuego / configuracion.columnas ? configuracion.columnas : 16;
    this.altoGrilla = configuracion.altoJuego / configuracion.filas ? configuracion.filas : 9;
  }

  colocarElementoPhaser() {}


  crearPosicionElementoExterno(columna: number, fila: number): Posicion {
    return {
      x: this.anchoGrilla * columna,
      y: this.altoGrilla * fila
    };
  }
}

class MapaIsometrico extends Phaser.Scene {

  chico: Phaser.Physics.Arcade.Sprite;
  punteroPosicion = {x: 0, y: 0};

  constructor() {
    super({key: 'MapaIsometrico'});
  }

  preload() {
    this.load.image('fondo', '../../assets/mapa-isometrico/prueba-isometrico3.png');
    this.load.spritesheet('chico', '../../assets/mapa-isometrico/chico.png', {frameWidth: 32, frameHeight: 48});
  }

  create() {
    // const botonIon = document.getElementById('boton');
    // botonIon.style.position = 'absolute';
    // botonIon.style.top = '100px';
    // botonIon.style.left = '500px';


    this.add.image(750, 403 , 'fondo');
    this.chico = this.physics.add.sprite(750, 200, 'chico', 0);
    // this.cameras.main.startFollow(this.chico, true);
    // this.cameras.main.setBounds(0, 0, 2000, 1600);

    this.anims.create({
      key: CHICO_ANIMACION.ABAJO,
      frames: this.anims.generateFrameNumbers('chico', {start: 0, end: 3}),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: CHICO_ANIMACION.ARRIBA,
      frames: this.anims.generateFrameNumbers('chico', {start: 12, end: 15}),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: CHICO_ANIMACION.DERECHA,
      frames: this.anims.generateFrameNumbers('chico', {start: 8, end: 11}),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: CHICO_ANIMACION.IZQUIERDA,
      frames: this.anims.generateFrameNumbers('chico', {start: 4, end: 7}),
      frameRate: 4,
      repeat: -1,
    });

    this.input.on('pointerdown', (puntero) => {
      this.physics.moveTo(this.chico, puntero.x, puntero.y, 300);
      // this.physics.moveToObject(this.chico, puntero, 100);
      this.punteroPosicion.x = puntero.x;
      this.punteroPosicion.y = puntero.y;
    });

  }

  update() {
    const distance = Phaser.Math.Distance.Between(this.chico.x, this.chico.y, this.punteroPosicion.x, this.punteroPosicion.y);

    if (this.chico.body.velocity.x !== 0 || this.chico.body.velocity.y !== 0) {
      if (distance < 10) {
        this.chico.body.reset(this.punteroPosicion.x, this.punteroPosicion.y);
      }
    }

    if ( this.chico.body.velocity.y < 0) {
      this.chico.anims.play(CHICO_ANIMACION.ARRIBA, true);
    } else if ( this.chico.body.velocity.y > 0)  {
      this.chico.anims.play(CHICO_ANIMACION.ABAJO, true);
    } else {
      this.chico.anims.stop();
    }


    if (this.chico.y > 400) {
      this.cameras.main.setScroll(0, 400);
    }

  }

}

@Component({
  selector: 'app-combinado',
  templateUrl: './combinado.page.html',
  styleUrls: ['./combinado.page.scss'],
})
export class CombinadoPage implements OnInit {

  claseBoton = {
    '--background': '#ffce00',
    position: 'absolute',
    // top: '100px',
    // left: '300px'
  };


  gameConfig: Phaser.Types.Core.GameConfig = {
    scale: {
      width: 800,
      height: 450,
      mode: Phaser.Scale.FIT,
    },

    type: Phaser.AUTO,
    scene: MapaIsometrico,
    physics: {
      arcade: {
        gravity: {
          y: 0,
        },
        debug: false,
      },
      default: 'arcade'
    }
  };
  initialize: boolean;

  constructor() { }

  ngOnInit() {
    const sistemaGrillas = new SistemaGrillas({anchoJuego: 800, altoJuego: 450});
    const posicion = sistemaGrillas.crearPosicionElementoExterno(3, 3);
   
    this.initialize = true;
  }

}
