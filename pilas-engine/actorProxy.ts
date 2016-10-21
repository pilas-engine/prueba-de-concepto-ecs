class ActorProxy {
  pilas: Pilas;
  id;

  constructor(pilas: Pilas, id) {
    this.pilas = pilas;
    this.id = id;
  }

  get x() {
    return this.pilas.obtener_entidad_por_id(this.id).componentes.posicion.x;
  }

  set x(valor) {
    this.pilas.obtener_entidad_por_id(this.id).componentes.posicion.x = valor;
  }

}
