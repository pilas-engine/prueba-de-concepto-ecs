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

    pilas.log.habilitar();

    pilas.eventos.cuando_agrega_entidad.conectar((/*entidad*/) => {
      // console.log("Se agregó esta entidad", entidad);
    });

    pilas.eventos.cuando_carga.conectar(() => {
      this.cuando_carga();
    });

    pilas.eventos.cuando_hace_click.conectar((datos_del_mouse) => {
      console.log(datos_del_mouse);
    });

    pilas.eventos.cuando_actualiza.conectar((contador_de_actualizaciones) => {
      this.cuando_actualiza(contador_de_actualizaciones);
    });

    this.set('pilas', pilas);
    window['pilas'] = pilas;
  },

  cuando_carga() {
    let pilas = this.get('pilas');

    let habilidad = {
      velocidad: 1,

      actualizar: function() {
        this.actor.x += this.velocidad;
      }

    };

    pilas.habilidades.vincular('girar todo el tiempo', habilidad);


    let volver_al_centro = {

      actualizar: function() {
        if (this.actor.x  > 300) {
          this.actor.x = 0;
        }
      }

    };

    pilas.habilidades.vincular('volver al centro', volver_al_centro);


    let ir_a_donde_hacen_click = {

      cuando_hace_click(mouse) {
        this.actor.x = mouse.x;
        this.actor.y = mouse.y;
      }

    };

    pilas.habilidades.vincular('ir a donde hacen click', ir_a_donde_hacen_click);

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
      pilas.agregar_componente(id, pilas.componentes.habilidades);

      let actor = pilas.crear_actor_desde_entidad(id);

      pilas.agregar_habilidad(id, 'girar todo el tiempo');
      pilas.agregar_habilidad(id, 'volver al centro');
      pilas.agregar_habilidad(id, 'ir a donde hacen click');

      window['mi_actor'] = actor;

    }
  }

});
