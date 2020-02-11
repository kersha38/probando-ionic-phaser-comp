import { Component, OnInit } from '@angular/core';
import {GameInterface} from '../interfaces/game-interface';
import * as Phaser from 'phaser';
import {EscenaInicio} from './escenas/escena-inicio';

@Component({
  selector: 'app-prueba-pista',
  templateUrl: './prueba-pista.page.html',
  styleUrls: ['./prueba-pista.page.scss'],
})
export class PruebaPistaPage {
  inicializar: true;
  gameConfig: GameInterface = {
    type: Phaser.AUTO,
    scale: {
      width: 2048,
      height: 960,
      mode: Phaser.Scale.FIT
    },
    backgroundColor: 0x000000,
    scene: [EscenaInicio],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
    instance: null,
  };

}
