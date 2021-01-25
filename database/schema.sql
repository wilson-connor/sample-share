DROP DATABASE IF EXISTS sample_share;

CREATE DATABASE sample_share;
\c sample_share;

CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  email TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE tracks (
  id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  user_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE INDEX tracks_name ON tracks (name);
CREATE INDEX users_name ON users (name);