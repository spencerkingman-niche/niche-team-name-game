.PHONY: build

COMMIT = $(shell git rev-parse --short HEAD)
USERNAME = $(shell whoami)
USER = $(shell basename $(USERNAME))

build:
	bash makeJSON.sh
	DOCKER_BUILDKIT=1 docker build --ssh=default --tag=$(USER)/namegame:$(COMMIT) --tag=$(USER)/namegame:latest .
up:
	docker-compose -f docker-compose.yml up -d

down:
	docker-compose -f docker-compose.yml down

logs:
	docker-compose -f docker-compose.yml logs
