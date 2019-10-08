import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { CommonScene } from '../home/home.page';

interface GameConfig extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game;
}

class JuegoPrincipal extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {

    this.load.tilemapTiledJSON('tile', '../../assets/historia.json');

    this.load.image('tileSetPrincipal', '../../assets/tiles (1).png');
    this.load.image('tileSetSecondary', '../../assets/things.png');

    this.load.spritesheet('sprite', '../../assets/Adventurer Sprite Sheet v1.1.png', {frameWidth: 32, frameHeight: 32});
  }

  create() {
    const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'tile'});

    const tileSetPrincipal: Phaser.Tilemaps.Tileset = map.addTilesetImage('tilseset', 'tileSetPrincipal');
    const tileSetSecondary: Phaser.Tilemaps.Tileset = map.addTilesetImage('things', 'tileSetSecondary');

    const suelo: Phaser.Tilemaps.StaticTilemapLayer  = map.createStaticLayer('Suelo', [tileSetPrincipal, tileSetSecondary], 0, 0);
    const casas: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer('Casas', tileSetPrincipal, 0, 0);
    const cerradruas: Phaser.Tilemaps.StaticTilemapLayer  = map.createStaticLayer('cerraduras', [tileSetSecondary], 0, 0);

    casas.setCollisionByProperty({ colision: true });
    cerradruas.setCollisionByProperty({ colision: true});

    const inicio: Phaser.GameObjects.GameObject = map.findObject('lugares', obj => obj.name === 'inicio');

    this.player = this.physics.add.sprite(
      40,
      40,
      'sprite'
    );


    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('sprite', { start: 0, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sprite', { start: 117, end: 124 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('sprite', { start: 13, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'top',
      frames: this.anims.generateFrameNumbers('sprite', { start: 13, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'bot',
      frames: this.anims.generateFrameNumbers('sprite', { start: 117, end: 124 }),
      frameRate: 10,
      repeat: -1
    });



    this.physics.add.collider(this.player, casas);

    this.physics.add.collider(this.player, cerradruas, () => {
      this.scene.add('another', CommonScene, true);
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 175;

    // Stop any previous movement from the last frame
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('top', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('bot', true);
    } else {
      this.player.anims.play('turn', true);
    }

  }
}


@Component({
  selector: 'app-movimiento-animacion',
  templateUrl: './movimiento-animacion.page.html',
  styleUrls: ['./movimiento-animacion.page.scss'],
})
export class MovimientoAnimacionPage implements OnInit {

  initialize: boolean;

  game: GameConfig = {
    width: '100%',
    height: '100%',
    type: Phaser.AUTO,
    scene: JuegoPrincipal,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0
        },
        debug: false,
      }
    },
    instance: null,
  };



  constructor() { }

  ngOnInit() {
    this.initialize = true;
  }

}
