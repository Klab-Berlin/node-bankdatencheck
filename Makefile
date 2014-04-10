test:
	./node_modules/.bin/mocha \
		--reporter spec \
		--require should \
		--ui bdd \
		--timeout 12000

.PHONY: test
