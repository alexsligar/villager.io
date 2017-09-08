DROP DATABASE IF EXISTS demo1;
CREATE DATABASE demo1;

\c demo1;

CREATE TABLE items (
  ID SERIAL PRIMARY KEY,
  Type INTEGER,
  Room VARCHAR,
  Name INTEGER
);

INSERT INTO pups (name, breed, age, sex)
  VALUES ('Tyler', 'Retrieved', 3, 'M');
