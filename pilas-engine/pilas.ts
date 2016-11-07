

class Pilas {
  game: Phaser.Game;
  entidades: Entidades;
  actores: Actores;

  sistemas: Sistemas;
  contador_de_actualizaciones: number = 0;
  pausado: boolean = false;
  componentes: Componentes;
  eventos: Eventos;
  validadores: Validadores;

  grupo_actores: Phaser.Group;
  grupo_gui: Phaser.Group;

  constructor(idCanvas) {
    let ancho = 500;
    let alto = 300;

    let opciones = this.obtener_opciones();

    this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, idCanvas, opciones);
    this.eventos = new Eventos(this);
    this.validadores = new Validadores(this);
  }

  obtener_entidades() {
    return this.entidades.obtener_entidades();
  }

  obtener_entidades_como_string() {
    return JSON.stringify(this.obtener_entidades(), null, 2);
  }

  obtener_cantidad_de_entidades() {
    return this.obtener_entidades().length;
  }

  /**
   * Agrega un componente con valores iniciales a una entidad.
   *
   * El componente se puede agregar especificando un string y conjunto de datos
   * o desde una función. Por ejemplo:
   *
   *    >> pilas.agregar_component(id_entidad, pilas.componentes.apariencia, {imagen: 'pilas.png'})
   */
  agregar_componente(id, componente, opciones = {}) {
    let entidad = this.obtener_entidad_por_id(id);
    let nombre = null;

    if (componente instanceof Function) {
      let instancia = componente();
      nombre = instancia.nombre;
      entidad.componentes[instancia.nombre] = (<any>Object).assign(instancia.datos, opciones);
    } else {
      nombre = componente;
      entidad.componentes[componente] = opciones;
    }

    this.eventos.cuando_agrega_componente.emitir({id, nombre, datos_iniciales: entidad.componentes[nombre]});
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

      /*
      render: () => {
        this.game.debug.text('sky layer:', 5, 15);
        this.game.debug.text('sky 123 layer:', 5, 35);
      }
      */

    };

    return opciones;
  }

  create() {
    this.grupo_actores = this.game.add.group();
    this.grupo_gui = this.game.add.group();

    this.sistemas = new Sistemas(this);
    this.entidades = new Entidades(this);
    this.componentes = new Componentes(this);
    this.actores = new Actores(this);
    this.eventos.cuando_carga.emitir();
  }

  update() {

    if (!this.pausado) {
      this.contador_de_actualizaciones += 1;
      this.sistemas.procesar_sobre_entidades(this.entidades);
      this.eventos.cuando_actualiza.emitir(this.contador_de_actualizaciones);
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

  /**
   * Retorna un número al azar entre a y b.
   */
  azar(a: number, b: number) {
    return this.game.rnd.integerInRange(a, b);
  }

  crear_actor_desde_entidad(identificador) {
    return new ActorProxy(this, identificador);
  }

}

var pilasengine = {
  iniciar: function(idCanvas) {
    return new Pilas(idCanvas);
  }
};
