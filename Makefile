
#
# ─── CONSTANTS ──────────────────────────────────────────────────────────────────
#

PRODUCT_NAME="TextGraphic"

PACKAGE_NAME=textgraphic

SOURCE_DIR = ./textgraphic

Declaration-Generator = ./node_modules/.bin/dts-bundle-generator

Distribution-Directory = ./out/dist

Compiled-Directory = ./out/compiled

Separation-Line=----------------------------------------------------------------------

#
# ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
#

define build-title
	$(info )
	$(info )
	$(info ✤ Building Step: $(1))
	$(info $(Separation-Line))
endef

#
# ─── MASTER COMMAND ─────────────────────────────────────────────────────────────
#

build: clean compile generate-dts pack
	$(info )
	$(info )
	$(info $(Separation-Line))
	$(info ☑︎ Successfully built TextGraphic)
	$(info )

#
# ─── CLEANING THE ENIVORNMENT ───────────────────────────────────────────────────
#

clean:
	$(call build-title,Cleaning)
	rm -rf out

#
# ─── TYPESCRIPT COMPILATION ─────────────────────────────────────────────────────
#

compile:
	$(call build-title,Compiling TypeScript)
	tsc

generate-dts:
	$(call build-title,Generating Single TypeScript .d.ts file.)
	rm -f ./out/dist/textgraphic.node.js
	tsc ./textgraphic/source/index.ts   --declaration   --target ES2016   --module amd   --moduleResolution node   --out ./out/dist/textgraphic.node.js
	rm -f ./out/dist/textgraphic.node.js

generate-docs:
	npx typedoc --out ./out/docs --name "$(PRODUCT_NAME)" --hideGenerator ./$(SOURCE_DIR)/source/index.ts

#
# ─── PACKERS ────────────────────────────────────────────────────────────────────
#

pack:
	$(call build-title,Packing code for the Node and Web.mak)
	webpack

# ────────────────────────────────────────────────────────────────────────────────
