var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Sistema = (function () {
    function Sistema(pilas) {
        this.requisitos = [];
        this.pilas = pilas;
        this.iniciar();
    }
    Sistema.prototype.iniciar = function () {
        this.requisitos = [];
    };
    Sistema.prototype.procesar = function (entidades) {
    };
    return Sistema;
}());
var Evento = (function () {
    function Evento(pilas) {
        this.pilas = pilas;
        this.iniciar();
    }
    Evento.prototype.iniciar = function () {
        this.evento = new Phaser.Signal();
    };
    Evento.prototype.conectar = function (funcion, identificador) {
        this.evento.add(funcion);
    };
    Evento.prototype.emitir = function (datos) {
        if (datos === void 0) { datos = {}; }
        this.evento.dispatch(datos);
    };
    return Evento;
}());
var Componentes = (function () {
    function Componentes(pilas) {
        this.pilas = pilas;
    }
    Componentes.prototype.etiquetable = function () {
        var nombre = 'etiquetable';
        var datos = {
            etiquetas: ['actor']
        };
        return { nombre: nombre, datos: datos };
    };
    return Componentes;
}());
var Entidades = (function () {
    function Entidades(pilas) {
        this.entidades = [];
        this.pilas = pilas;
    }
    Entidades.prototype.crear_entidad = function (nombre) {
        var id = this.generarID();
        var datos = {
            id: id,
            nombre: nombre,
            componentes: {}
        };
        this.entidades.push(datos);
        this.pilas.eventos.cuando_agrega_entidad.emitir(datos);
        return id;
    };
    Entidades.prototype.obtener_entidades = function () {
        return this.entidades;
    };
    Entidades.prototype.generarID = function () {
        return this.entidades.length + 1;
    };
    Entidades.prototype.obtener_entidades_con = function (componentes) {
        return this.entidades.filter(function (e) {
            var lista_de_cumplimientos_de_requisito = componentes.map(function (requisito) {
                return e.componentes.hasOwnProperty(requisito);
            });
            return (lista_de_cumplimientos_de_requisito.indexOf(false) === -1);
        });
    };
    return Entidades;
}());
var Eventos = (function () {
    function Eventos(pilas) {
        this.pilas = pilas;
        this.cuando_agrega_entidad = new Evento(pilas);
        this.cuando_actualiza = new Evento(pilas);
        this.cuando_carga = new Evento(pilas);
        this.cuando_agrega_componente = new Evento(pilas);
    }
    return Eventos;
}());
var Pilas = (function () {
    function Pilas(idCanvas) {
        this.contador_de_actualizaciones = 0;
        this.pausado = false;
        var ancho = 500;
        var alto = 300;
        var opciones = this.obtener_opciones();
        this.game = new Phaser.Game(ancho, alto, Phaser.CANVAS, idCanvas, opciones);
        this.eventos = new Eventos(this);
    }
    Pilas.prototype.obtener_entidades = function () {
        return this.entidades.obtener_entidades();
    };
    Pilas.prototype.obtener_entidades_como_string = function () {
        return JSON.stringify(this.obtener_entidades(), null, 2);
    };
    Pilas.prototype.obtener_cantidad_de_entidades = function () {
        return this.obtener_entidades().length;
    };
    Pilas.prototype.agregar_componente = function (id, componente, opciones) {
        if (opciones === void 0) { opciones = {}; }
        var entidad = this.obtener_entidad_por_id(id);
        var nombre = null;
        if (componente instanceof Function) {
            var instancia = componente();
            nombre = instancia.nombre;
            entidad.componentes[instancia.nombre] = Object.assign(instancia.datos, opciones);
        }
        else {
            nombre = componente;
            entidad.componentes[componente] = opciones;
        }
        this.eventos.cuando_agrega_componente.emitir({ id: id, nombre: nombre, datos_iniciales: entidad.componentes[nombre] });
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
        this.sistemas = new Sistemas(this);
        this.entidades = new Entidades(this);
        this.componentes = new Componentes(this);
        this.eventos.cuando_carga.emitir();
    };
    Pilas.prototype.update = function () {
        if (!this.pausado) {
            this.contador_de_actualizaciones += 1;
            this.sistemas.procesar_sobre_entidades(this.entidades);
            this.eventos.cuando_actualiza.emitir(this.contador_de_actualizaciones);
        }
    };
    Pilas.prototype.pausar = function () {
        this.pausado = true;
    };
    Pilas.prototype.continuar = function () {
        this.pausado = false;
    };
    Pilas.prototype.crear_entidad = function (nombre) {
        return this.entidades.crear_entidad(nombre);
    };
    Pilas.prototype.azar = function (a, b) {
        return this.game.rnd.integerInRange(a, b);
    };
    return Pilas;
}());
var pilasengine = {
    iniciar: function (idCanvas) {
        return new Pilas(idCanvas);
    }
};
var Sistemas = (function () {
    function Sistemas(pilas) {
        this.sistemas = [];
        this.pilas = pilas;
        this.inicializar_sistema(Depurable);
        this.inicializar_sistema(Apariencia);
    }
    Sistemas.prototype.inicializar_sistema = function (clase) {
        try {
            this.sistemas.push(new clase(this.pilas));
        }
        catch (e) {
            var nombre = clase.name;
            console.warn("No se puede iniciar el sistema " + nombre + " a causa de un error, se evitar\u00E1 vincular al motor.");
            console.error(e);
        }
    };
    Sistemas.prototype.procesar_sobre_entidades = function (entidades) {
        this.sistemas.map(function (sistema) {
            sistema.procesar(entidades);
        });
    };
    return Sistemas;
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
                sprite.position.x = game.world.centerX + entidad.componentes.posicion.x;
                sprite.position.y = game.world.centerY - entidad.componentes.posicion.y;
            }
            else {
                var sprite = void 0;
                sprite = game.add.sprite(0, 0, 'ember');
                sprite.position.x = game.world.centerX + entidad.componentes.posicion.x;
                sprite.position.y = game.world.centerY - entidad.componentes.posicion.y;
                sprite.anchor.set(0.5);
                game.physics.arcade.enable(sprite);
                _this.cache[entidad.id] = sprite;
            }
        });
    };
    return Apariencia;
}(Sistema));
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
            var x = e.componentes.posicion.x;
            var y = e.componentes.posicion.y;
            _this.canvas.drawCircle(x + game.world.centerX, game.world.centerY - y, 50);
        });
    };
    return Depurable;
}(Sistema));
