import * as Phaser from 'phaser';

interface GameConfig extends Phaser.Types.Core.GameConfig {
    instance: Phaser.Game;
}

interface Sprite extends Phaser.Physics.Arcade.Factory {}

interface Tilemap extends Phaser.Tilemaps.Tilemap {}

interface Tileset extends Phaser.Tilemaps.Tileset{}