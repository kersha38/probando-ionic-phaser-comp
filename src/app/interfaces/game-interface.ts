import * as Phaser from 'phaser';

export interface GameInterface extends Phaser.Types.Core.GameConfig {
    instance: Phaser.Game;
}
