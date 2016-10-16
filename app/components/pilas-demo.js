import Ember from 'ember';


function log() {
  let nombre = 'log';

  this.actualizar = function(entidades) {
  }

};


function mover() {
  let nombre =  'mover';
  let contador = 0;

  this.actualizar = function(entidades) {
    contador += 0.1;

    entidades.map((entidad) => {
      entidad.habilidades.posicion.x = Math.sin(contador) * 5;
    });
  }
};


function apariencia(game) {
  let nombre = 'apariencia';
  let cache = {};

  this.actualizar = function(entidades) {
    entidades.map((entidad) => {
      if (cache[entidad.id]) {
        let sprite = cache[entidad.id];

        sprite.position.x = game.world.centerX + entidad.habilidades.posicion.x;
        sprite.position.y = game.world.centerY - entidad.habilidades.posicion.y;

      } else {
        let sprite;

        sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ember');
        sprite.anchor.set(0.5);

        //  And enable the Sprite to have a physics body:
        game.physics.arcade.enable(sprite);

        cache[entidad.id] = sprite;
      }
      entidad.habilidades.posicion.x += 1;
    });
  }
};


export default Ember.Component.extend({
  entidades: [],
  entidadesEmber: [],
  habilidades: [],

  entidadesComoJSON: Ember.computed('entidadesEmber', function() {
    return JSON.stringify(this.get('entidadesEmber'), null, 2);
  }),

  pilas: null,

  didInsertElement() {
    let idCanvas = "canvas";

    let pilas = pilasengine.iniciar(idCanvas);

    pilas.cuandoInicia.add(() => {
      cuandoInicia();
    });

    this.set('pilas', pilas);
  },

  cuandoInicia() {
    console.log("Ha iniciado pilas!");

    let entidad = this.get('pilas').crearEntidad('MiActor');
  },

  cuandoActualiza() {
    console.log("Actualiza");
  },

  create() {
    let game = this.get('game');

    this.habilidades.push(new log());
    this.habilidades.push(new mover());
    this.habilidades.push(new apariencia(game));

    window['entidades'] = this.entidades;
  },

  update() {
    /*
    let entidades = Ember.copy(this.entidades);

    this.procesarHabilidades();

    this.set('entidadesEmber', entidades);
    */
  },

  iniciar() {
    let id = this.crearEntidad();

    this.agregarHabilidad(id, 'apariencia', {imagen: 'ember'});
    this.agregarHabilidad(id, 'posicion', {x: 0, y: 0});
  },

  agregarHabilidad(id, habilidad, opciones) {
    let entidad = this.obtenerEntidadPorId(id);

    entidad.habilidades[habilidad] = opciones;
  },

  obtenerEntidadPorId(id) {
    let entidades = this.entidades.filter((a) => {
      return (a.id === id);
    });

    if (entidades) {
      return entidades[0];
    } else {
      throw new Error(`No se encuentra la entidade con id=${id}`);
    }

  },

  procesarHabilidades() {

    this.habilidades.map((habilidad) => {
      habilidad.actualizar(this.entidades);
    });

  }

});
