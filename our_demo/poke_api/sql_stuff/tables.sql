DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS trainers;

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    pokedex_num INTEGER NOT NULL UNIQUE,
    evolves BOOLEAN NOT NULL,
    region VARCHAR(50) DEFAULT 'unknown',
    generation VARCHAR NOT NULL,
    popularity NUMERIC(5,2)
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR,
    gym_leader BOOLEAN DEFAULT 0,
    num_badges INTEGER DEFAULT 0,
    num_pokemon INTEGER DEFAULT 0
);