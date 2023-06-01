INSERT INTO poke_origins (region, generation, mentor, rival)
VALUES
('Kanto', 'G1', 'Professor Oak', 'Gary'),
('Hoenn', 'G3', 'Professor Birch', 'Leon'),
('Sinnoh', 'G4', 'Professor Roann', 'Barry');

INSERT INTO pokemons (name, type, pokedexNum, evolves, popularity, originId)
VALUES
('Charmander', 'fire', 4, 1, 90.6, 1),
('Ditto', 'normal', 132, 0, 100, 1),
('Rapidash', 'fire', 78, 0, 94.89, 1),
('Tentacool', 'water', 72, 0, 30.75, 1),
('Geodude', 'rock', 74, 0, 42.42, 1),
('Mudkip', 'water', 258, 1, 88.88, 2),
('Snorlax', 'normal', 143, 1, 86, 1),
('Garchomp', 'dragon', 445, 0, 90.0, 3),
('Jirachi', 'steel', 385, 0, 94.2, 2),
('Mewtwo', 'Psy''chic', 150, 0, 99.9, 1);

INSERT INTO trainers (name, age, gender, gym_leader, num_badges)
VALUES
('Alec', 57, 'male', 1, 9001),
('Dan', 102, 'male', 0, 6),
('Olivia', 85, 'female', 0, 16),
('Franco', 12, 'male', 0, 3),
('Jojo', 62, 'male', 0, 7);

INSERT INTO poke_trainers (trainer_id, pokemon_id)
VALUES
(1, 2),
(1, 4),
(1, 7),
(1, 10),
(1, 9),
(1, 1),
(2, 3),
(2, 5),
(2, 7),
(2, 4),
(3, 1),
(3, 10),
(3, 8),
(3, 6),
(4, 5),
(4, 6),
(4, 7),
(5, 8),
(5, 9),
(5, 10);