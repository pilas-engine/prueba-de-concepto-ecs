VERSION=1 #$(shell scripts/obtenerVersion.sh)
NOMBRE="prueba-de-concepto-ecs"

N=[0m
G=[01;32m
Y=[01;33m
B=[01;34m
L=[01;30m

npm_config_loglevel="warn"

comandos:
	@echo ""
	@echo "${B}Comandos disponibles para ${G}${NOMBRE}${N} - ${Y} versión ${VERSION}${N}"
	@echo ""
	@echo "  ${Y}Para desarrolladores de la aplicación ember${N}"
	@echo ""
	@echo "    ${G}iniciar${N}         Instala dependencias."
	@echo "    ${G}compilar${N}        Genera los archivos compilados."
	@echo "    ${G}compilar_live${N}   Compila de forma contínua."
	@echo "    ${G}test_travis${N}     Ejecuta las mismas pruebas que travis."
	@echo ""
	@echo "  ${Y}Para desarrolladores de pilasweb${N}"
	@echo ""
	@echo "    ${G}compilar_pilas${N}      Compila la extensión de pilasweb en public/libs."
	@echo "    ${G}compilar_pilas_live${N} Compila de forma contínua la extensión de pilasweb."
	@echo "    ${G}api_docs${N}                Genera la documentación de la api."
	@echo ""
	@echo "  ${Y}Para distribuir${N}"
	@echo ""
	@echo "    ${G}version_patch${N}     Genera una versión (0.0.PATCH)."
	@echo "    ${G}version_minor${N}     Genera una versión (0.MINOR.0)."
	@echo "    ${G}version_major${N}     Genera una versión (MAJOR.0.0)."
	@echo ""
	@echo "    ${G}actualizar_web${N}    Sube a surge la versión online actual."
	@echo "    ${G}${N}                  Nota: no se suele usar, lo invoca travis."
	@echo ""
	@echo ""


iniciar:
	@echo "${G}instalando dependencias ...${N}"
	@npm install
	@bower install --allow-root

compilar:
	./node_modules/ember-cli/bin/ember build

compilar_live:
	./node_modules/ember-cli/bin/ember build --watch

version_patch:
	./node_modules/ember-cli/bin/ember release

version_minor:
	./node_modules/ember-cli/bin/ember release --minor

version_major:
	./node_modules/ember-cli/bin/ember release --major

actualizar_web:
	./node_modules/ember-cli/bin/ember surge --environment development

test_travis:
	./node_modules/ember-cli/bin/ember test

compilar_pilas:
	./node_modules/typescript/bin/tsc --pretty -d

compilar_pilas_live:
	./node_modules/typescript/bin/tsc --watch --pretty -d

test: test_travis


api_docs:
	./node_modules/.bin/typedoc --out api_docs pilas-engine --hideGenerator
