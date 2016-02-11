build: clean
	node --harmony index.js

clean:
	rm -rf build

test:
	jasmine

deploy:
	node scripts/deploy.js

serve:
	node --harmony serve.js

.PHONY: build serve clean
