var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Entidades = (function () {
    function Entidades() {
        this.entidades = [];
    }
    Entidades.prototype.crearEntidad = function (nombre) {
        var id = this.generarID();
        this.entidades.push({
            id: id,
            nombre: nombre,
            habilidades: {}
        });
        return id;
    };
    Entidades.prototype.generarID = function () {
        return this.entidades.length + 1;
    };
    Entidades.prototype.obtener_entidades_con = function (requisitos) {
        return this.entidades.filter(function (e) {
            var tiene_requisito = requisitos.map(function (requisito) {
                return e.habilidades.hasOwnProperty(requisito);
            });
            if (tiene_requisito.indexOf(false) > -1) {
                return false;
            }
            else {
                return true;
            }
        });
    };
    return Entidades;
}());
var Habilidad = (function () {
    function Habilidad(pilas) {
        this.requisitos = [];
        this.pilas = pilas;
        this.iniciar();
    }
    Habilidad.prototype.iniciar = function () {
        this.requisitos = [];
    };
    Habilidad.prototype.procesar = function (entidades) {
    };
    return Habilidad;
}());
var Apariencia = (function (_super) {
    __extends(Apariencia, _super);
    function Apariencia() {
        _super.apply(this, arguments);
        this.cache = {};
    }
    Apariencia.prototype.iniciar = function () {
        this.requisitos = ['posicion', 'apariencia'];
    };
    Apariencia.prototype.procesar = function (entidades) {
        var _this = this;
        var entidades_filtradas = entidades.obtener_entidades_con(this.requisitos);
        var game = this.pilas.game;
        entidades_filtradas.map(function (entidad) {
            if (_this.cache[entidad.id]) {
                var sprite = _this.cache[entidad.id];
                sprite.position.x = game.world.centerX + entidad.habilidades.posicion.x;
                sprite.position.y = game.world.centerY - entidad.habilidades.posicion.y;
            }
            else {
                var sprite = void 0;
                sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ember');
                sprite.anchor.set(0.5);
                game.physics.arcade.enable(sprite);
                _this.cache[entidad.id] = sprite;
            }
        });
    };
    return Apariencia;
}(Habilidad));
var Depurable = (function (_super) {
    __extends(Depurable, _super);
    function Depurable() {
        _super.apply(this, arguments);
        this.cache = {};
    }
    Depurable.prototype.iniciar = function () {
        this.requisitos = ['depurable', 'posicion'];
        this.canvas = this.pilas.game.add.graphics(0, 0);
        this.canvas.beginFill(0xffffff);
    };
    Depurable.prototype.procesar = function (entidades) {
        var _this = this;
        var entidades_filtradas = entidades.obtener_entidades_con(this.requisitos);
        var game = this.pilas.game;
        entidades_filtradas.map(function (e) {
            var x = e.habilidades.posicion.x;
            var y = e.habilidades.posicion.y;
            _this.canvas.drawCircle(x + game.world.centerX, game.world.centerY - y, 100);
        });
    };
    return Depurable;
}(Habilidad));
var Habilidades = (function () {
    function Habilidades(pilas) {
        this.habilidades = [];
        this.pilas = pilas;
        this.inicializar_habilidad(Apariencia);
        this.inicializar_habilidad(Depurable);
    }
    Habilidades.prototype.inicializar_habilidad = function (clase) {
        try {
            this.habilidades.push(new clase(this.pilas));
        }
        catch (e) {
            var nombre = clase.name;
            console.warn("No se puede iniciar la habilidad " + nombre + " se evitar\u00E1 vincular al motor.");
            console.error(e);
        }
    };
    Habilidades.prototype.procesar_sobre_entidades = function (entidades) {
        this.habilidades.map(function (habilidad) {
            habilidad.procesar(entidades);
        });
    };
    return Habilidades;
}());
var Pilas = (function () {
    function Pilas(idCanvas) {
        this.contador_de_actualizaciones = 0;
        this.pausado = false;
        var ancho = 500;
        var alto = 300;
        var opciones = this.obtenerOpciones();
        this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, idCanvas, opciones);
        this.cuandoCarga = new Phaser.Signal();
        this.cuandoActualiza = new Phaser.Signal();
    }
    Pilas.prototype.obtener_entidades = function () {
        return this.entidades;
    };
    Pilas.prototype.obtener_entidades_como_string = function () {
        return JSON.stringify(this.entidades, null, 2);
    };
    Pilas.prototype.obtener_cantidad_de_entidades = function () {
        return this.entidades.entidades.length;
    };
    Pilas.prototype.agregar_habilidad = function (id, habilidad, opciones) {
        if (opciones === void 0) { opciones = {}; }
        var entidad = this.obtener_entidad_por_id(id);
        entidad.habilidades[habilidad] = opciones;
    };
    Pilas.prototype.obtener_entidad_por_id = function (id) {
        var entidades = this.entidades.entidades.filter(function (a) {
            return (a.id === id);
        });
        if (entidades) {
            return entidades[0];
        }
        else {
            throw new Error("No se encuentra la entidade con id=" + id);
        }
    };
    Pilas.prototype.preload = function () {
        this.game.stage.disableVisibilityChange = true;
        this.game.time.desiredFps = 1;
        this.game.load.image('ember', 'imagenes/ember.png');
    };
    Pilas.prototype.obtenerOpciones = function () {
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
        this.habilidades = new Habilidades(this);
        this.entidades = new Entidades();
        this.cuandoCarga.dispatch();
    };
    Pilas.prototype.update = function () {
        if (!this.pausado) {
            this.contador_de_actualizaciones += 1;
            this.habilidades.procesar_sobre_entidades(this.entidades);
            this.cuandoActualiza.dispatch(this.contador_de_actualizaciones);
        }
    };
    Pilas.prototype.pausar = function () {
        this.pausado = true;
    };
    Pilas.prototype.continuar = function () {
        this.pausado = false;
    };
    Pilas.prototype.crearEntidad = function (nombre) {
        return this.entidades.crearEntidad(nombre);
    };
    return Pilas;
}());
var pilasengine = {
    iniciar: function (idCanvas) {
        return new Pilas(idCanvas);
    }
};
