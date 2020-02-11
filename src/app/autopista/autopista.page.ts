import {Component} from '@angular/core';
import {GameInterface} from '../interfaces/game-interface';
import {EscenaBase} from './escenas/escena-base';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-autopista',
  templateUrl: './autopista.page.html',
  styleUrls: ['./autopista.page.scss'],
})
export class AutopistaPage {
  inicializar: true;
  gameConfig: GameInterface = {
    type: Phaser.AUTO,
    scale: {
      width: 2048,
      height: 960,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    backgroundColor: 0x000000,
    scene: [EscenaBase],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    instance: null,
  };


}
