CREATE SCHEMA `fullstack_react_2022` NOT EXISTS; 

CREATE USER 'trayan'@'localhost' IDENTIFIED WITH mysql_native_password BY 'trayan';
GRANT ALL PRIVILEGES ON `fullstack_react_2022`.* TO 'trayan'@'localhost';

CREATE TABLE IF NOT EXISTS `fullstack_react_2022`.`posts` (
  `id` BIGINT(20) NOT NULL,
  `title` VARCHAR(80) NOT NULL,
  `content` VARCHAR(1024) NULL,
  `author_id` BIGINT(20) NULL,
  `image_url` VARCHAR(80) NULL,
  `tags` VARCHAR(80) NOT NULL,
  `categories` VARCHAR(80) NOT NULL,
  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));