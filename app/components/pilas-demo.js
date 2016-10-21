import Ember from 'ember';


export default Ember.Component.extend({
  entidades: null,                    // se actualiza en el método cuandoActualiza
  cantidad_de_entidades: null,        // se actualiza en el método cuandoActualiza
  contador_de_actualizaciones: null,  // se actualiza en el método cuandoActualiza
  habilidades: [],

  pilas: null,

  didInsertElement() {
    let idCanvas = "canvas";
    let pilas = pilasengine.iniciar(idCanvas);

    pilas.cuandoCarga.add(() => {
      this.cuandoCarga();
    });

    pilas.cuandoActualiza.add((contador_de_actualizaciones) => {
      this.cuandoActualiza(contador_de_actualizaciones);
    });

    this.set('pilas', pilas);

    window['pilas'] = pilas;
  },

  cuandoCarga() {
    let pilas = this.get('pilas');
    let id = pilas.crear_entidad('MiActor');

    pilas.agregar_componente(id, 'apariencia', {imagen: 'ember'});
    pilas.agregar_componente(id, 'posicion', {x: 0, y: 0});
    pilas.agregar_componente(id, 'depurable');
  },

  cuandoActualiza(contador_de_actualizaciones) {
    let pilas = this.get('pilas');
    let entidades = pilas.obtener_entidades_como_string();
    let cantidad_de_entidades = pilas.obtener_cantidad_de_entidades();

    this.set('contador_de_actualizaciones', contador_de_actualizaciones);
    this.set('entidades', entidades);
    this.set('cantidad_de_entidades', cantidad_de_entidades);
  },

});
