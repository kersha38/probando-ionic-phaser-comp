import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';


class JuegoRecolectandoPerlas extends Phaser.Scene {
  animales;
  burbuja;
  burbuja2;
  width;
  height;
  opciones: any[] = [];
  ostra;
  bolsa;
  perla;
  bolsaTexto: Phaser.GameObjects.Text;
  totalAciertos = 0;
  visto: Phaser.GameObjects.Image;
  equis: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: 'grilla-scene'
    });
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../assets/Recolectando perlas/prueba-perlas.json');
    this.load.spritesheet('tile-peces', '../../assets/Recolectando perlas/fishTilesheet.png', { frameHeight: 64, frameWidth: 64 });
    this.load.spritesheet('ostra', '../../assets/Recolectando perlas/ostra.png', { frameHeight: 48, frameWidth: 50 });
    this.load.image('bolsa', '../../assets/Recolectando perlas/bag.png');
    this.load.image('perla', '../../assets/Recolectando perlas/perla.png');
    this.load.image('check', '../../assets/Recolectando perlas/checkmark2.png');
    this.load.image('cross', '../../assets/Recolectando perlas/cross2.png');

    this.width = this.game.config.width;
    this.height = this.game.config.height;

    this.load.audio('acierto', '../../assets/Recolectando perlas/success.wav');
    this.load.audio('desacierto', '../../assets/Recolectando perlas/negative.wav');
    this.load.audio('musica-fondo', '../../assets/Recolectando perlas/TylerSong3_Normal.wav');
  }

  create() {
    this.sound.play('musica-fondo', {volume: 0.3, loop: true});

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

    this.ostra = this.add.sprite(this.width / 2, this.height / 2, 'ostra', 0)
      .setDepth(10)
      .setScale(3);

    this.bolsa = this.physics.add.image(950, 500, 'bolsa');
    this.bolsaTexto = this.add.text(950, 480, this.totalAciertos.toString(), { fontSize: 50, });

    this.perla = this.physics.add.image(this.width / 2, this.height / 2, 'perla')
      .setDepth(12)
      .setScale(0.25)
      .setVisible(false);


    this.visto = this.add.image(0, 0, 'check').setVisible(false);
    this.equis = this.add.image(0, 0, 'cross').setVisible(false);

    // opciones provicionales
    const opcionesBD: { opcion: string, esCorrecta: boolean }[] = [
      { opcion: 'aceite de oliva \ninsaturado', esCorrecta: false },
      { opcion: 'beta-carotenas de \ntomates', esCorrecta: true },
      { opcion: 'papas transgenicas \nque  soportan heladas', esCorrecta: false },
      { opcion: 'remolacha rica en \nfructuosa', esCorrecta: false },
    ];



    this.opciones.push(this.crearOpcion(200, 160, opcionesBD[0]));
    this.opciones.push(this.crearOpcion(600, 160, opcionesBD[1]));
    this.opciones.push(this.crearOpcion(200, 400, opcionesBD[2]));
    this.opciones.push(this.crearOpcion(600, 400, opcionesBD[3]));




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
      30,
      '1) ¿Cuál es una buena fuente de vitamina A?',
      { fontFamily: 'Drift', fontSize: 40, color: '#c51b7d' });
    console.log('estas son las simensiones: ' + this.width + ' y ' + this.height);

    pregunta.setShadow(2, 2, '#333333', 2, false, true);

    this.anims.create({
      key: 'abrir-ostra-correcta',
      frames: this.anims.generateFrameNumbers('ostra', { start: 0, end: 4 }),
      frameRate: 5,
      // repeat: -1,
    });

    this.ostra.on(
      'animationcomplete',
      () => {
        this.perla.setVisible(true);
        this.physics.moveToObject(this.perla, this.bolsa, 250);

      }
    );

    this.input.on('gameobjectup', (pointer, gameObject) => {
      gameObject.emit('clicked', gameObject);
    }, this);

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

    const distance = Phaser.Math.Distance.Between(this.perla.x, this.perla.y, this.bolsa.x, this.bolsa.y);

    if (this.perla.body.speed > 0) {

      //  4 is our distance tolerance, i.e. how close the source can get to the target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.
      if (distance < 4) {
        this.perla.body.reset(this.bolsa.x, this.bolsa.y);
        this.perla.setVisible(false);
        this.totalAciertos += 1;
        this.bolsaTexto.setText(this.totalAciertos.toString());
      }
    }
  }

  crearOpcion(posX, posY, respuesta) {
    const grupo = this.add.group();
    const rect = this.add.rectangle(posX + 120, posY + 30, 300, 100, 0xffffff);
    rect.setStrokeStyle(20, 0x43665a, 0.5);

    const texto = this.add.text(posX, posY, respuesta.opcion, { fontSize: 20, color: '#190D2D' }).setDepth(10);

    texto.setData({ esCorrecta: respuesta.esCorrecta });
    texto.setInteractive();

    texto.on(
      'pointerdown',
      () => {
        rect.setStrokeStyle(25, 0x6D4B9A, 1);
        if (respuesta.esCorrecta) {
          this.ostra.anims.play('abrir-ostra-correcta');
          this.sound.play('acierto', {volume: 1});
          this.visto.setPosition(posX + 250, posY)
          .setDepth(20)
          .setVisible(true);
        } else {
          this.equis.setPosition(posX + 250, posY)
          .setDepth(20)
          .setVisible(true);

          this.sound.play('desacierto');
        }
      },
      this
    );

    grupo.add(texto);
    return grupo;
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
      },
      default: 'arcade',
    },


  };

  ngOnInit() {
    this.initialize = true;
  }

}
