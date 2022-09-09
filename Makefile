#############################################################################
# Makefile for Prompt json schemas
#############################################################################

# Prefer bash shell
export SHELL=/bin/bash


ifneq (,$(VERBOSE))
    override VERBOSE:=
else
    override VERBOSE:=@
endif

.PHONY: install
install:
	$(VERBOSE) yarn install
.PHONY: publish
publish:
	$(VERBOSE) npm publish

