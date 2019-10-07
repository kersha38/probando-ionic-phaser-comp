import { Component } from '@angular/core';

import * as Phaser from 'phaser';

const SCENES = {
  FIRST: 'FirstScene',
  SECOND: 'SecondScene'
};

class CommonScene extends Phaser.Scene {
  helloWorld: Phaser.GameObjects.Text;
  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  init() {
    this.cameras.main.setBackgroundColor('#24252A');
  }

  preload() {
    this.load.spritesheet('dude', '../../assets/Woman_Walk.png', { frameWidth: 22, frameHeight: 32 });
    this.load.spritesheet('dude-izq', '../../assets/Woman_Walk-izq.png', { frameWidth: 22, frameHeight: 32 });
    this.load.spritesheet('quieta', '../../assets/Woman_Idle.png', { frameWidth: 22, frameHeight: 32 });
  }

  create() {


    this.helloWorld = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Hello World', {
        font: '40px Arial',
        fill: '#ffffff'
      }
    );
    this.helloWorld.setOrigin(0.5);

    this.player = this.physics.add.sprite(0, 0, 'dude').setScale(2, 2);

    // this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude-izq', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      // frames: [{ key: 'quieta', frame: 4 }],
      frames: this.anims.generateFrameNumbers('quieta', { start: 0, end: 8 }),
      frameRate: 7,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keyup_C', function() {
      this.scene.start(
        SCENES.FIRST
      );
    }, this);

    this.input.keyboard.on('keyup_D', () => {
      console.log('ola k ase');
    }, this);
  }

  setAngle(angle: number) {
    this.helloWorld.angle = angle;
  }

  update() {
    this.helloWorld.angle += 3;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-80);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(80);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn', true);
      // TODO hacer: saltar
    }
  }
}


// class BootScene extends Phaser.Scene {
//   create() {
//     this.scene.add(SCENES.FIRST, CommonScene, true);
//     // this.scene.add(SCENES.SECOND, SecondScene, false);

//     this.scene.run(SCENES.FIRST);
//   }
// }

interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  initialize = false;
  game: GameInstance = {
    width: '100%',
    height: '100%',
    type: Phaser.AUTO,
    scene: CommonScene,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    instance: null
  };

  getInstance() {
    return this.game.instance;
  }

  initializeGame() {
    this.initialize = true;
  }

  changeAngle() {
    const instance = this.getInstance();
    instance.scene.scenes.forEach((scene: Phaser.Scene) => {
      if (scene.sys.isActive() && scene instanceof CommonScene) {
        scene.setAngle(0);
      }
    });
  }

  sendForm() {
    console.log('sendForm');
  }
}
