

# FROM php:8.2.0-apache
# WORKDIR /var/www/html

# # Mod Rewrite
# RUN a2enmod rewrite

# # Linux Library
# RUN apt-get update -y && apt-get install -y \
#     libicu-dev \
#     libmariadb-dev \
#     unzip zip \
#     zlib1g-dev \
#     libpng-dev \
#     libjpeg-dev \
#     libfreetype6-dev \
#     libjpeg62-turbo-dev \
#     libpng-dev

# # Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# # PHP Extension
# RUN docker-php-ext-install gettext intl pdo_mysql gd

# RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg \
#     && docker-php-ext-install -j$(nproc) gd

# # nodejs install
# #RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
# RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get install -y nodejs

FROM php:8.2-fpm
WORKDIR /var/www/html

# RUN apt-get update \
#   && apt-get install -y zlib1g-dev libzip-dev zip mariadb-client libpng-dev libjpeg-dev curl wget

RUN apt-get update -y && apt-get install -y \
    libicu-dev \
    libmariadb-dev \
    mariadb-client \
    unzip zip \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
         && docker-php-ext-install zip

# PHP Extension
RUN docker-php-ext-install gettext intl pdo_mysql gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# nodejs install
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs


