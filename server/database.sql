CREATE DATABASE perntodo;

CREATE TABLE todo(
    todoId SERIAL PRIMARY KEY, 
    -- serial primary key usput i inkrementira kada dodajemo u bazu da ide od 1 2 3 bal bal
    description VARCHAR(255)
);