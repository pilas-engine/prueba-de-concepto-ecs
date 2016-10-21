/// <reference path="declaraciones/phaser.d.ts" />
/// <reference path="declaraciones/pixi.d.ts" />
/// <reference path="declaraciones/p2.d.ts" />
/// <reference path="declaraciones/box2d.d.ts" />
/// <reference path="habilidades.ts" />

class Pilas {
  game: Phaser.Game;
  entidades: Entidades;

  cuandoCarga: Phaser.Signal;
  cuandoActualiza: Phaser.Signal;

  habilidades: Habilidades;
  contador_de_actualizaciones: number = 0;
  pausado: boolean = false;
  componentes: Componentes;

  constructor(idCanvas) {
    let ancho = 500;
    let alto = 300;

    let opciones = this.obtener_opciones();

    this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, idCanvas, opciones);

    this.cuandoCarga = new Phaser.Signal();
    this.cuandoActualiza = new Phaser.Signal();
  }

  obtener_entidades() {
    return this.entidades;
  }

  obtener_entidades_como_string() {
    return JSON.stringify(this.entidades, null, 2);
  }

  obtener_cantidad_de_entidades() {
    return this.entidades.entidades.length;
  }

  agregar_componente(id, componente, opciones = {}) {
    let entidad = this.obtener_entidad_por_id(id);

    if (componente instanceof Function) {
      let instancia = componente();
      entidad.componentes[instancia.nombre] = (<any>Object).assign(instancia.datos, opciones);
    } else {
      entidad.componentes[componente] = opciones;
    }

  }

  obtener_entidad_por_id(id) {
    let entidades = this.entidades.entidades.filter((a) => {
      return (a.id === id);
    });

    if (entidades) {
      return entidades[0];
    } else {
      throw new Error(`No se encuentra la entidade con id=${id}`);
    }
  }

  preload() {
    // Evita que se active la pausa cuando se pierde el foco del navegador.
    this.game.stage.disableVisibilityChange = true;

    this.game.time.desiredFps = 1;

    // Precarga imágenes
    this.game.load.image('ember', 'imagenes/ember.png');
  }

  private obtener_opciones() {
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

    return opciones;
  }

  create() {
    this.habilidades = new Habilidades(this);
    this.entidades = new Entidades();
    this.componentes = new Componentes(this);
    this.cuandoCarga.dispatch();
  }

  update() {
    if (!this.pausado) {
      this.contador_de_actualizaciones += 1;
      this.habilidades.procesar_sobre_entidades(this.entidades);
      this.cuandoActualiza.dispatch(this.contador_de_actualizaciones);
    }
  }

  pausar() {
    this.pausado = true;
  }

  continuar() {
    this.pausado = false;
  }

  crear_entidad(nombre) {
    return this.entidades.crear_entidad(nombre);
  }

}

var pilasengine = {
  iniciar: function(idCanvas) {
    return new Pilas(idCanvas);
  }
};
