/// <reference path="habilidades/habilidad.ts" />
/// <reference path="habilidades/apariencia.ts" />
/// <reference path="habilidades/depurable.ts" />

class Habilidades {
  pilas: Pilas;
  habilidades: Array<Habilidad> = [];

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.inicializar_habilidad(Apariencia);
    this.inicializar_habilidad(Depurable);

  }

  inicializar_habilidad(clase) {
    try {
      this.habilidades.push(new clase(this.pilas));
    } catch(e) {
      let nombre = clase.name;
      console.warn(`No se puede iniciar la habilidad ${nombre} se evitará vincular al motor.`);
      console.error(e);
    }

  }

  procesar_sobre_entidades(entidades: Entidades) {
    this.habilidades.map((habilidad) => {
      habilidad.procesar(entidades);
    });
  }

}
