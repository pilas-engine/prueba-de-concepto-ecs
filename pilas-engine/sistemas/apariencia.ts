/// <reference path="../_references.ts" />

class Apariencia extends Sistema {
  cache: any = {};

  iniciar() {
    this.requisitos = ['posicion', 'apariencia'];
  }

  procesar(entidades: Entidades) {
    let entidades_filtradas = entidades.obtener_entidades_con(this.requisitos);
    let game = this.pilas.game;

    entidades_filtradas.map((entidad) => {

      if (this.cache[entidad.id]) {
        let sprite = this.cache[entidad.id];

        sprite.position.x = game.world.centerX + entidad.componentes.posicion.x;
        sprite.position.y = game.world.centerY - entidad.componentes.posicion.y;

      } else {
        let sprite;

        sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ember');
        sprite.anchor.set(0.5);

        //  And enable the Sprite to have a physics body:
        game.physics.arcade.enable(sprite);

        this.cache[entidad.id] = sprite;
      }

    });
  }

}
