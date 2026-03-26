FROM php:8.2-apache


# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo_mysql zip

# Enable Apache mod_rewrite for routing
RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Adjust permissions for Apache
RUN chown -R www-data:www-data /var/www/html