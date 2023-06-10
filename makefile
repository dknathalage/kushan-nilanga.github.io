dev:
	@npx nx run-many --target=dev --parallel

build:
	@npx nx run-many --target=build --parallel

graph:
	@npx nx graph

build-affected:
	@npx nx affected:build --parallel

graph-affected:
	@npx nx affected:dep-graph --base=origin/master