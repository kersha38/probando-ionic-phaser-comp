import * as Phaser from 'phaser';

interface GameConfig extends Phaser.Types.Core.GameConfig {
    instance: Phaser.Game;
}

interface Sprite extends Phaser.Physics.Arcade.Factory {
    x: number|string;
}

interface Tilemap extends Phaser.Tilemaps.Tilemap {
    x: number|string;
}

interface Tileset extends Phaser.Tilemaps.Tileset {
    x: number|string;
}
