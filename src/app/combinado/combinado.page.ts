import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

enum CHICO_ANIMACION {
  ARRIBA = 'CHICO-ARRIBA',
  ABAJO = 'CHICO-ABAJO',
  IZQUIERDA = 'CHICO-IZQUIERDA',
  DERECHA = 'CHICO-DERECHA'
}

class MapaIsometrico extends Phaser.Scene {

  chico: Phaser.Physics.Arcade.Sprite;
  punteroPosicion= {x:0, y:0};

  constructor() {
    super({key: 'MapaIsometrico'});
  }

  preload() {
    this.load.image('fondo', '../../assets/mapa-isometrico/prueba-isometrico2.png');
    this.load.spritesheet('chico', '../../assets/mapa-isometrico/chico.png', {frameWidth: 32, frameHeight: 48});
  }

  create() {

    this.add.image(750, 403 , 'fondo');
    this.chico = this.physics.add.sprite(750, 403, 'chico', 0);

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
      this.physics.moveToObject(this.chico, puntero, 100);
      this.punteroPosicion.x = puntero.x;
      this.punteroPosicion.y = puntero.y;
    });
  }

  update() {
    const distance = Phaser.Math.Distance.Between(this.chico.x, this.chico.y, this.punteroPosicion.x, this.punteroPosicion.y);

    if (this.chico.body.velocity.x !== 0 || this.chico.body.velocity.y !== 0) {
      if (distance < 4) {
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

  }


}

@Component({
  selector: 'app-combinado',
  templateUrl: './combinado.page.html',
  styleUrls: ['./combinado.page.scss'],
})
export class CombinadoPage implements OnInit {

  gameConfig: Phaser.Types.Core.GameConfig = {
    scale: {
      width: 1550,
      height: 803,
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
    this.initialize = true;
  }

}
