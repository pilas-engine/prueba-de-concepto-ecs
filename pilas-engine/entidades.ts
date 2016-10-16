class Entidades {
  entidades: Array<any> = [];

  crearEntidad(nombre: string) {
    let id = this.generarID();

    this.entidades.push({
      id: id,
      habilidades: {
      }
    });

    return id;
  }

  private generarID() {
    return this.entidades.length + 1;
  }
}
