class Eventos {
  pilas: Pilas;

  cuando_agrega_entidad: Evento;
  cuando_actualiza: Evento;

    /**
     * El evento `cuando_carga` se dispara cuando se termina de realizar
     * la carga inicial de pilas. Se dispara una sola vez, y solo a partir
     * de ese momento se puede comenzar a usar la biblioteca.
     *
     * Ejemplo:
     *
     * ```
     *  pilas.eventos.cuando_carga.conectar(function() {
     *    alert("Terminó de cargar pilas!");
     * });
     * ```
     *
     */
  cuando_carga: Evento;
  cuando_agrega_componente: Evento;

  /**
   * Inicializa el sistema de eventos.
   * @param pilas  Una referencia a la instancia de pilas-engine.
   */
  constructor(pilas: Pilas) {
    this.pilas = pilas;

    this.cuando_agrega_entidad = new Evento(pilas);
    this.cuando_actualiza = new Evento(pilas);

    this.cuando_carga = new Evento(pilas);

    this.cuando_agrega_componente = new Evento(pilas);
  }

}
