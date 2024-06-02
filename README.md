# datn-cnpm

Đây là thư mục chứa mã nguồn & các tài nguyên khác liên quan đến đồ án tốt nghiệp

Cần:
- NPM
- Docker
- XAMPP

## Cách chạy local
Cách 1: cd vào thư mục ChallengeCreator, chạy XAMPP (2 lựa chọn đầu) & chạy lệnh `npm run dev`
Cách 2: Chạy docker
Sau đó mở `localhost` trong trình duyệt web


## Docker Prod
1. docker compose up -d
2. docker-compose exec app bash
3. composer install
4. npm install
5. Laravel deployment commands - https://laravel.com/docs/10.x/deployment
6. npm run build
6. php artisan migrate:seed
7. Go to localhost:8989
- Done!
- CONNECTION_REFUSED error: just delete the public/hot file
