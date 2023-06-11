install:
	@npx nx run-many --target=install --parallel

dev:
	@npx nx run-many --target=dev --parallel

build:
	@npx nx run-many --target=build --parallel

graph:
	@npx nx affected:graph --base=master --watch

build-a:
	@npx nx affected:build --parallel --base=master

deploy:
	@npx nx run-many --target=deploy --parallel

infra-graph:
	@npx nx run-many --target=infra-graph --parallel