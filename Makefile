build: clean
	node index.js

clean:
	rm -rf build

test:
	jasmine

deploy:
	node scripts/deploy.js

serve:
	node serve.js

.PHONY: build serve clean
