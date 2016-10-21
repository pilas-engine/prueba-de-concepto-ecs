class Sistemas {
  pilas: Pilas;
  sistemas: Array<Sistema> = [];

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.inicializar_sistema(Depurable);
    this.inicializar_sistema(Apariencia);
  }

  inicializar_sistema(clase) {
    try {
      this.sistemas.push(new clase(this.pilas));
    } catch(e) {
      let nombre = clase.name;
      console.warn(`No se puede iniciar el sistema ${nombre} a causa de un error, se evitará vincular al motor.`);
      console.error(e);
    }
  }

  procesar_sobre_entidades(entidades: Entidades) {
    this.sistemas.map((sistema) => {
      sistema.procesar(entidades);
    });
  }

}
