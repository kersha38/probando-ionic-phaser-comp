import { Component, OnInit } from '@angular/core';
import {GameInterface} from '../interfaces/game-interface';
import {Escena1} from './escenas/escena1';

@Component({
  selector: 'app-regla-tres',
  templateUrl: './regla-tres.page.html',
  styleUrls: ['./regla-tres.page.scss'],
})
export class ReglaTresPage {

  inicializar = true;
  gameConfig: GameInterface = {
    type: Phaser.AUTO,
    width: 1020,
    height: 581,
    backgroundColor: 0x000000,
    scene: [Escena1],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    instance: null,
  };

  // game = new Phaser.Game(this.gameConfig);

}
