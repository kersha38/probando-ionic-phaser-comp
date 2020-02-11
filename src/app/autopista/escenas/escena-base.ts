import * as Phaser from 'phaser';

export class EscenaBase extends Phaser.Scene {
    jugador: Phaser.Physics.Arcade.Sprite;
    teclas: Phaser.Types.Input.Keyboard.CursorKeys;

    preload() {
        this.load.tilemapTiledJSON('pista-map', '../../../assets/imagenes/autopista4.json');
        this.load.image('spritesheet_tiles', '../../../assets/imagenes/spritesheet_tiles.png');
        this.load.image('player', '../../../assets/imagenes/motorcycle_yellow.png');
    }

    create() {
        this.add.text(0, 0, 'JUEGO CARROS');
        const mapAutopista = this.make.tilemap({key: 'pista-map'});
        console.log(mapAutopista);
        const objetoOrigenMoto: any = mapAutopista.findObject(
            'objetos',
            objeto => objeto.name === 'origenMoto');

        const tilesetAutopista = mapAutopista.addTilesetImage('tiles_autopista', 'spritesheet_tiles');
        const capaHierba = mapAutopista.createStaticLayer('Capa hierba', tilesetAutopista, 0, 0);
        const capaAutopista = mapAutopista.createStaticLayer('Capa pista', tilesetAutopista, 0, 0);
        // capaHierba.setScale(0.5);
        // capaAutopista.setScale(0.5);

        // capaAutopista.setCollisionByProperty({colision: true, cambioCarril: true});
        capaAutopista.setCollisionByProperty({colision: true});

        this.jugador = this.physics.add.sprite(objetoOrigenMoto.x, objetoOrigenMoto.y, 'player');
        // this.jugador.body.gravity.x = 20;
        // this.jugador.body.gravity.y = 100;
        // this.jugador.body.velocity.x = 100;

        this.physics.add.collider(this.jugador, capaAutopista);
        // this.cameras.main.startFollow(this.jugador);
        this.cameras.main.setBounds(0, 0, mapAutopista.widthInPixels, mapAutopista.heightInPixels);
        this.teclas = this.input.keyboard.createCursorKeys();
        this.jugador.setVelocityY(-100);
    }

    update(time: number, delta: number): void {
        const velocidad = 500;

        this.cameras.main.centerOn(1920 / 2, this.jugador.body.y - 300);
        if (this.teclas.right.isDown) {
            this.jugador.setVelocityX(velocidad);

        } else if (this.teclas.left.isDown) {
            this.jugador.setVelocityX(-velocidad);
        }
        // this.jugador.body.velocity.normalize().scale(velocidad);


    }

}
