/// <reference path="../pilas-engine/declaraciones/phaser.d.ts" />
/// <reference path="../pilas-engine/declaraciones/pixi.d.ts" />
/// <reference path="../pilas-engine/declaraciones/p2.d.ts" />
/// <reference path="../pilas-engine/declaraciones/box2d.d.ts" />
declare class Sistema {
    requisitos: Array<string>;
    pilas: Pilas;
    constructor(pilas: Pilas);
    iniciar(): void;
    procesar(entidades: Entidades): void;
}
declare class Evento {
    pilas: Pilas;
    evento: Phaser.Signal;
    constructor(pilas: Pilas);
    iniciar(): void;
    conectar(funcion: any, identificador: any): void;
    emitir(datos?: {}): void;
}
declare class Componentes {
    pilas: Pilas;
    constructor(pilas: any);
    etiquetable(): {
        nombre: string;
        datos: {
            etiquetas: string[];
        };
    };
}
declare class Entidades {
    entidades: Array<any>;
    pilas: Pilas;
    constructor(pilas: Pilas);
    crear_entidad(nombre: string): number;
    obtener_entidades(): any[];
    private generarID();
    obtener_entidades_con(componentes: Array<string>): any[];
}
declare class Eventos {
    pilas: Pilas;
    cuando_agrega_entidad: Evento;
    cuando_actualiza: Evento;
    cuando_carga: Evento;
    constructor(pilas: Pilas);
}
declare class Pilas {
    game: Phaser.Game;
    entidades: Entidades;
    sistemas: Sistemas;
    contador_de_actualizaciones: number;
    pausado: boolean;
    componentes: Componentes;
    eventos: Eventos;
    constructor(idCanvas: any);
    obtener_entidades(): any[];
    obtener_entidades_como_string(): string;
    obtener_cantidad_de_entidades(): number;
    agregar_componente(id: any, componente: any, opciones?: {}): void;
    obtener_entidad_por_id(id: any): any;
    preload(): void;
    private obtener_opciones();
    create(): void;
    update(): void;
    pausar(): void;
    continuar(): void;
    crear_entidad(nombre: any): number;
    azar(a: number, b: number): number;
}
declare var pilasengine: {
    iniciar: (idCanvas: any) => Pilas;
};
declare class Sistemas {
    pilas: Pilas;
    sistemas: Array<Sistema>;
    constructor(pilas: Pilas);
    inicializar_sistema(clase: any): void;
    procesar_sobre_entidades(entidades: Entidades): void;
}
declare class Apariencia extends Sistema {
    cache: any;
    iniciar(): void;
    procesar(entidades: Entidades): void;
}
declare class Depurable extends Sistema {
    cache: any;
    canvas: any;
    iniciar(): void;
    procesar(entidades: Entidades): void;
}
