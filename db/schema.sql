### Schema

CREATE DATABASE pizza_db;
USE pizza_db;

CREATE TABLE slices
(
	id int NOT NULL AUTO_INCREMENT,
	piz_name varchar(255) NOT NULL,
	eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
