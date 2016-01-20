build: clean
	node --harmony index.js

clean:
	rm -rf build

deploy:
	node scripts/deploy.js

.PHONY: build serve clean