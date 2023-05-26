PRAGMA FOREIGN_KEYS = 1;
DROP TABLE IF EXISTS poke_trainers;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS poke_origins;

CREATE TABLE poke_origins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    region VARCHAR NOT NULL,
    generation VARCHAR NOT NULL,
    mentor VARCHAR NOT NULL,
    rival VARCHAR NOT NULL
);

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    pokedex_num INTEGER NOT NULL UNIQUE,
    evolves BOOLEAN NOT NULL,
    popularity NUMERIC(5,2),
    -- origin_id INTEGER,
    -- FOREIGN KEY (origin_id) REFERENCES poke_origins (id)
    origin_id INTEGER REFERENCES poke_origins (id) ON DELETE SET NULL
    -- (pokemon.orign_id = poke_origins.id)
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR,
    gym_leader BOOLEAN DEFAULT 0,
    num_badges INTEGER DEFAULT 0
);

CREATE TABLE poke_trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE
);