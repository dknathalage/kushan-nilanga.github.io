dev:
	@npx nx run-many --target=dev --parallel

build:
	@npx nx run-many --target=build --parallel

graph:
	@npx nx graph

build-a:
	@npx nx affected:build --parallel --base=master

graph-a:
	@npx nx affected:graph --base=master