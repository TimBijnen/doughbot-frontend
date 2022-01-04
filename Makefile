.DEFAULT_GOAL:=help
.PHONY: help clean test
FILE?=

#: list all targets
help:
	@grep -B1 -E "^[a-zA-Z0-9_-]+\:([^\=]|$$)" Makefile | grep -v -- -- | sed 'N;s/\n/###/' | sed -n 's/^#: \(.*\)###\(.*\):.*/\2###\1/p' | column -t  -s '###'


#: start app
start:
	yarn start

#: run app
run:
	yarn start


local:
	yarn start 

#: test app
test:
	yarn test
