import Ember from 'ember';


export default Ember.Component.extend({
  entidades: "",
  cantidad_de_entidades: 0,
  contador_de_actualizaciones: 0,
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
    let id = this.get('pilas').crearEntidad('MiActor');

    this.get('pilas').agregar_habilidad(id, 'apariencia', {imagen: 'ember'});
    this.get('pilas').agregar_habilidad(id, 'posicion', {x: 0, y: 0});
    this.get('pilas').agregar_habilidad(id, 'depurable');
  },

  cuandoActualiza(contador_de_actualizaciones) {
    let entidades = this.get('pilas').obtener_entidades_como_string();
    let cantidad_de_entidades = this.get('pilas').obtener_cantidad_de_entidades();


    this.set('contador_de_actualizaciones', contador_de_actualizaciones);
    this.set('entidades', entidades);
    this.set('cantidad_de_entidades', cantidad_de_entidades);
  },

});
