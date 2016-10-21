class Eventos {
  pilas: Pilas;

  cuando_agrega_entidad: Evento;
  cuando_actualiza: Evento;
  cuando_carga: Evento;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    
    this.cuando_agrega_entidad = new Evento(pilas);
    this.cuando_actualiza = new Evento(pilas);
    this.cuando_carga = new Evento(pilas);
  }

}