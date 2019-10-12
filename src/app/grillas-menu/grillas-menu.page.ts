import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';


class JuegoRecolectandoPerlas extends Phaser.Scene {
  animales;
  burbuja;
  burbuja2;
  width;
  height;
  opciones: any[] = [];

  constructor() {
    super({
      key: 'grilla-scene'
    });
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../assets/Recolectando perlas/prueba-perlas.json');
    this.load.spritesheet('tile-peces', '../../assets/Recolectando perlas/fishTilesheet.png', { frameHeight: 64, frameWidth: 64 });
    this.load.spritesheet('ostra', '../../assets/Recolectando perlas/ostra.png', { frameHeight: 48, frameWidth: 50 });
    // this.load.bitmapFont('font', '../../assets/Recolectando perlas/Drift.ttf');
    this.width = this.game.config.width;
    this.height = this.game.config.height;
  }

  create() {

    const mapa = this.make.tilemap({ key: 'map' });
    const tileset = mapa.addTilesetImage('fishTilesheet', 'tile-peces');

    const fondo = mapa.createStaticLayer('fondo', tileset);
    const tierra = mapa.createStaticLayer('tierra', tileset);
    this.animales = mapa.createStaticLayer('animales', tileset).setAlpha(0.5);

    const pez1 = this.add.sprite(0, 0, 'tile-peces', 75).setAlpha(0.5);
    const pez2 = this.add.sprite(0, 200, 'tile-peces', 77).setAlpha(0.5);
    const pez3 = this.add.sprite(200, 400, 'tile-peces', 79).setAlpha(0.5);
    this.burbuja = this.add.sprite(250, 576, 'tile-peces', 123).setAlpha(0.5);
    this.burbuja2 = this.add.sprite(650, 200, 'tile-peces', 123).setAlpha(0.5);

    // opciones provicionales
    const opcionesBD: {opcion: string, esCorrecta: boolean}[] = [
      {opcion: 'aceite de oliva insaturado', esCorrecta: false},
      {opcion: 'beta-carotenas de tomates', esCorrecta: true},
      {opcion: 'papas transgenicas que soportan heladas', esCorrecta: false},
      {opcion: 'remolacha rica en fructuosa', esCorrecta: false},
    ];

    opcionesBD.forEach((respuesta, i) => {
      const grupo = this.add.group();
      const posX = (this.width / 3) * (i);
      const posY = (this.height / 5);
      const ostra = this.add.sprite(posX, posY, 'ostra', 0);
      ostra.on('pointerdown', () => {
        ostra.anims.play('abrir-ostra-correcta');
      });
      // grupo.create(posX, posY, 'ostra', 0);
      grupo.add(ostra);
      const texto = this.add.text(posX , posY + 30, respuesta.opcion, { color: '#190D2D' });
      // texto.setShadow(2, 2, "#333333", 2, false, true);
      texto.setData({esCorrecta: respuesta.esCorrecta});
      texto.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, texto.width, texto.height),
        () => { ostra.anims.play('abrir-ostra-correcta');}
        );
      grupo.add(texto);
      grupo.getChildren
      this.opciones.push(grupo);
    });



    this.tweens.add({
      targets: this.animales,
      props: {
        x: { value: 20, flipX: true },
        y: { value: 70 },
      },
      duration: 20000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,

    });

    this.tweens.add({
      targets: pez1,
      props: {
        x: { value: 1000, flipX: true },
        y: { value: 70 },
      },
      duration: 3000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,

    });

    this.tweens.add({
      targets: pez2,
      props: {
        x: { flipX: true, value: 1000 },
        y: { value: 400 },
      },
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,

    });

    this.tweens.add({
      targets: pez3,
      props: {
        x: { value: 600, flipX: true },
        y: { value: 400 },
      },
      duration: 4000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,

    });

    this.anims.create({
      delay: 1000,
      key: 'burbujear',
      frames: this.anims.generateFrameNumbers('tile-peces', { start: 123, end: 125 }),
      frameRate: 1,
      repeat: -1
    });

    const pregunta = this.add.text(
      100,
      25,
      '1) ¿Cuál es una buena fuente de vitamina A?',
      { fontFamily: 'Drift', fontSize: 40, color: '#c51b7d'});
    console.log('estas son las simensiones: ' + this.width + ' y ' + this.height);

    pregunta.setShadow(2, 2, "#333333", 2, false, true);

    this.anims.create({
      key: 'abrir-ostra-correcta',
      frames: this.anims.generateFrameNumbers('ostra', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    // ostra.anims.play('abrir-ostra-correcta');

  }

  update() {
    this.burbuja.y -= 1;
    this.burbuja2.y -= 1;
    this.burbuja.anims.play('burbujear', true);
    this.burbuja2.anims.play('burbujear', true);

    if (this.burbuja.y < 0) {
      this.burbuja.y = 576;
    }

    if (this.burbuja2.y < 0) {
      this.burbuja2.y = 576;
    }
  }


}

@Component({
  selector: 'app-grillas-menu',
  templateUrl: './grillas-menu.page.html',
  styleUrls: ['./grillas-menu.page.scss'],
})
export class GrillasMenuPage implements OnInit {

  initialize: boolean;

  gameConfig: Phaser.Types.Core.GameConfig = {
    scale: {
      mode: Phaser.Scale.FIT,
      width: 1024,
      height: 576
    },
    type: Phaser.AUTO,
    scene: JuegoRecolectandoPerlas,
    physics: {
      arcade: {
        gravity: {
          y: 0
        },
        debug: false,
      }
    },


  };

  ngOnInit() {
    this.initialize = true;
  }

}
