import Ember from 'ember';


export default Ember.Component.extend({
  entidades: null,                    // se actualiza en el método cuando_actualiza
  cantidad_de_entidades: null,        // se actualiza en el método cuandoActualiza
  contador_de_actualizaciones: null,  // se actualiza en el método cuandoActualiza
  habilidades: [],

  pilas: null,

  didInsertElement() {
    let idCanvas = "canvas";
    let pilas = pilasengine.iniciar(idCanvas);

    pilas.eventos.cuando_agrega_entidad.conectar((entidad) => {
      console.log("Se agregó esta entidad", entidad);
    });

    pilas.eventos.cuando_carga.conectar(() => {
      this.cuando_carga();
    });

    pilas.eventos.cuando_actualiza.conectar((contador_de_actualizaciones) => {
      this.cuando_actualiza(contador_de_actualizaciones);
    });

    this.set('pilas', pilas);
    window['pilas'] = pilas;
  },

  cuando_carga() {
    this.send("crearActorAleatorio");
  },

  cuando_actualiza(contador_de_actualizaciones) {
    let pilas = this.get('pilas');
    let entidades = pilas.obtener_entidades_como_string();
    let cantidad_de_entidades = pilas.obtener_cantidad_de_entidades();

    this.set('contador_de_actualizaciones', contador_de_actualizaciones);
    this.set('entidades', entidades);
    this.set('cantidad_de_entidades', cantidad_de_entidades);
  },


  actions: {
    crearActorAleatorio() {
      let pilas = this.get('pilas');
      let id = pilas.crear_entidad('MiActor');
      let x = pilas.azar(-100, 100);
      let y = pilas.azar(-100, 100);

      pilas.agregar_componente(id, 'posicion', {x, y});
      pilas.agregar_componente(id, 'apariencia', {imagen: 'ember'});
      //pilas.agregar_componente(id, 'depurable');

      pilas.agregar_componente(id, pilas.componentes.etiquetable);

      let actor = pilas.crear_actor_desde_entidad(id);

      window['mi_actor'] = actor;

    }
  }

});
