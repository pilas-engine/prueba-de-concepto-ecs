/// <reference path="declaraciones/phaser.d.ts" />
/// <reference path="declaraciones/pixi.d.ts" />
/// <reference path="declaraciones/p2.d.ts" />
/// <reference path="declaraciones/box2d.d.ts" />

class Pilas {
  game: Phaser.Game;
  entidades: Entidades;

  cuandoCarga: Phaser.Signal;
  cuandoActualiza: Phaser.Signal;

  constructor(idCanvas) {
    let ancho = 500;
    let alto = 300;

    let opciones = {
      preload: () => {
        this.preload();
      },

      create: () => {
        this.create();
      },

      update: () => {
        this.update();
      },
    };

    this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, idCanvas, opciones);


    this.entidades = new Entidades();
  }


  preload() {
    this.cuandoCarga = new Phaser.Signal();
    this.cuandoActualiza = new Phaser.Signal();

    // Evita que se active la pausa cuando se pierde el foco del navegador.
    this.game.stage.disableVisibilityChange = true;
    this.game.load.image('ember', 'imagenes/ember.png');

  }

  create() {
    console.log("demo ...");
    this.cuandoCarga.dispatch();
  }

  update() {
    this.cuandoActualiza.dispatch();
  }

  crearEntidad(nombre) {
    return this.entidades.crearEntidad(nombre);
  }
}

var pilasengine = {
  iniciar: function(idCanvas) {
    return new Pilas(idCanvas);
  }
};
