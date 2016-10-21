var Entidades = (function () {
    function Entidades() {
        this.entidades = [];
    }
    Entidades.prototype.crear_entidad = function (nombre) {
        var id = this.generarID();
        this.entidades.push({
            id: id,
            habilidades: {}
        });
        return id;
    };
    Entidades.prototype.generarID = function () {
        return this.entidades.length + 1;
    };
    return Entidades;
}());
var Pilas = (function () {
    function Pilas(idCanvas) {
        var ancho = 500;
        var alto = 300;
        var opciones = this.obtener_opciones();
        this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, idCanvas, opciones);
        this.entidades = new Entidades();
    }
    Pilas.prototype.preload = function () {
        this.cuandoCarga = new Phaser.Signal();
        this.cuandoActualiza = new Phaser.Signal();
        this.game.stage.disableVisibilityChange = true;
        this.game.load.image('ember', 'imagenes/ember.png');
    };
    Pilas.prototype.obtener_opciones = function () {
        var _this = this;
        var opciones = {
            preload: function () {
                _this.preload();
            },
            create: function () {
                _this.create();
            },
            update: function () {
                _this.update();
            },
        };
        return opciones;
    };
    Pilas.prototype.create = function () {
    };
    Pilas.prototype.update = function () {
        this.cuandoActualiza.dispatch();
    };
    Pilas.prototype.crear_entidad = function (nombre) {
        return this.entidades.crear_entidad(nombre);
    };
    return Pilas;
}());
var pilasengine = {
    iniciar: function (idCanvas) {
        return new Pilas(idCanvas);
    }
};
