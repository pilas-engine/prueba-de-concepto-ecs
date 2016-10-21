class Evento {
  pilas: Pilas;
  evento: Phaser.Signal;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.iniciar();
  }

  iniciar() {
    this.evento = new Phaser.Signal();
  }

  conectar(funcion, identificador) {
    this.evento.add(funcion);
  }

  emitir(datos = {}) {
    this.evento.dispatch(datos);
  }

}
