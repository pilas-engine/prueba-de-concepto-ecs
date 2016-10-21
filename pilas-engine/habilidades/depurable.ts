/// <reference path="habilidad.ts" />

class Depurable extends Habilidad {
  cache: any = {};
  canvas: any;

  iniciar() {
    this.requisitos = ['depurable', 'posicion'];
    this.canvas = this.pilas.game.add.graphics(0, 0);

    this.canvas.beginFill(0xffffff);
  }

  procesar(entidades: Entidades) {
    let entidades_filtradas = entidades.obtener_entidades_con(this.requisitos);
    let game = this.pilas.game;

    entidades_filtradas.map((e) => {
      let x = e.componentes.posicion.x;
      let y = e.componentes.posicion.y;
      this.canvas.drawCircle(x + game.world.centerX, game.world.centerY - y, 50);
    })
  }

}
