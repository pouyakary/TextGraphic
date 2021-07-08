
#
# ─── CONSTANTS ──────────────────────────────────────────────────────────────────
#

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

build: clean compile generate-dts pack-for-browser pack-for-node
	$(info )
	$(info )
	$(info $(Separation-Line))
	$(info ☑︎ Successfully built TextKit)
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
	$(Declaration-Generator) --sort --no-banner -o $(Distribution-Directory)/textkit-node.d.ts $(Compiled-Directory)/source/index.ts

#
# ─── PACKERS ────────────────────────────────────────────────────────────────────
#

define pack-with-parcel
    parcel build --out-dir=$(Distribution-Directory) --out-file=textkit-$(1).js --global=TextKit --target=$(1) $(Compiled-Directory)/source/index.js
endef

pack-for-browser:
	$(call build-title,Packing for the Browser)
	$(call pack-with-parcel,browser)

pack-for-node:
	$(call build-title,Packing for the Node)
	$(call pack-with-parcel,node)

# ────────────────────────────────────────────────────────────────────────────────
