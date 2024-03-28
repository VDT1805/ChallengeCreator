setup:
	@make build
	@make up
	@make composer-update
build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
up:
	docker-compose up -d
composer-update:
	docker exec ChallengeCreator_php bash -c "composer update"
data:
	docker exec ChallengeCreator_php bash -c "php artisan migrate"
	docker exec ChallengeCreator_php bash -c "php artisan db:seed"
