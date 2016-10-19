class Entidades {
  entidades: Array<any> = [];

  crearEntidad(nombre: string) {
    let id = this.generarID();

    this.entidades.push({
      id: id,
      nombre: nombre,
      habilidades: {
      }
    });

    return id;
  }

  private generarID() {
    return this.entidades.length + 1;
  }

  /**
   * Dada una lista de requisitos, como ['posicion', 'apariencia'], retornará
   * una lista de todas las entidades que cumplan con esos requisitos.
   *
   * Esto nos permite asegurar que una habilidad diseñada para ciertas
   * entidades no trabaje sobre otro tipo de entidades.
   */
  obtener_entidades_con(requisitos: Array<string>) {

    return this.entidades.filter((e) => {

      /* Genera una lista con el cumplimiento de
       * requisitos.
       * Algo como [true, true, false] por ejemplo. */
      let tiene_requisito = requisitos.map(requisito => {
        return e.habilidades.hasOwnProperty(requisito);
      });

      if (tiene_requisito.indexOf(false) > -1) {
        return false;
      } else {
        return true;
      }

    });
  }
}
