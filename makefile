install:
	@npx nx run-many --target=install --parallel

dev:
	@npx nx run-many --target=dev --parallel

graph:
	@npx nx affected:graph --base=master --watch

build:
	@npx nx affected:build --parallel --base=master

deploy:
	@npx nx run-many --target=deploy --parallel