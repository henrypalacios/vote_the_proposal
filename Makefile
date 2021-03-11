all: deploy

deploy: install start

install:
	@echo "Installing..."
	npm install

.PHONY: test
test:
	@echo "🏃 Running contract tests"
	npm run test-contract

start:
	@echo "👨‍💻 Running hot loading..."
	npm run start
