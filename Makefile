build: clean
	node --harmony index.js

clean:
	rm -rf build

deploy:
	node scripts/deploy.js

serve:
	node --harmony serve.js

.PHONY: build serve clean