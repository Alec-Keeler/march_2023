-- SELECT * FROM pokemon;

-- SELECT name, type FROM pokemon;

-- SELECT * FROM pokemon
-- WHERE popularity >= 90;

-- SELECT * FROM pokemon
-- WHERE popularity >= 90 AND type = 'fire';

-- SELECT * FROM pokemon
-- WHERE pokedex_num > 80 OR type = 'rock';

-- DELETE FROM pokemon;

-- DELETE FROM pokemon
-- WHERE popularity < 50;

-- SELECT * FROM pokemon
-- WHERE type = 'steel';

-- UPDATE pokemon
-- SET popularity = 78.88
-- WHERE name = 'Mudkip';

-- UPDATE trainers
-- SET num_badges = num_badges + 1
-- WHERE name = 'Dan';

-- SELECT/DELETE/UPDATE
-- FROM *
-- SET *
-- JOIN
-- WHERE
-- ORDER
-- LIMIT
-- OFFSET
-- GROUP BY
-- HAVING

-- SELECT * FROM pokemon
-- WHERE popularity >= 40 AND popularity < 60;

-- SELECT * FROM pokemon
-- WHERE popularity BETWEEN 40 AND 60 OR popularity BETWEEN 80 AND 100;

-- SELECT * FROM pokemon
-- WHERE type IN ('fire', 'water');

-- SELECT * FROM pokemon
-- WHERE name LIKE '%tenta%';

-- SELECT name FROM pokemon
-- ORDER BY name ASC;

-- SELECT name, popularity FROM pokemon
-- ORDER BY popularity DESC
-- LIMIT 5
-- OFFSET 5;

SELECT name, origin_id, poke_origins.id, region FROM pokemon
JOIN poke_origins ON (poke_origins.id = pokemon.origin_id)
WHERE region = 'Kanto';

SELECT trainers.name, trainers.id, poke_trainers.trainer_id, poke_trainers.pokemon_id, pokemon.id, pokemon.name
FROM trainers
JOIN poke_trainers ON (trainers.id = poke_trainers.trainer_id)
JOIN pokemon ON (poke_trainers.pokemon_id = pokemon.id)
WHERE trainers.name = 'Alec';

SELECT trainers.name, trainers.id, poke_trainers.trainer_id, poke_trainers.pokemon_id, pokemon.id, pokemon.name
FROM poke_trainers
JOIN pokemon ON (poke_trainers.pokemon_id = pokemon.id)
JOIN trainers ON (poke_trainers.trainer_id = trainers.id)
WHERE trainers.name = 'Alec';

SELECT COUNT(*) FROM pokemon;

SELECT AVG(popularity) FROM pokemon;

SELECT SUM(pokedex_num), name, type FROM pokemon;

SELECT AVG(popularity) FROM pokemon
WHERE origin_id = 1;

SELECT AVG(popularity) FROM pokemon
WHERE origin_id IN (1, 2);

SELECT AVG(popularity), name FROM pokemon
GROUP BY origin_id;

SELECT AVG(popularity), origin_id FROM pokemon
GROUP BY origin_id
HAVING origin_id IN (1, 2);

SELECT name, origin_id, poke_origins.id, region FROM pokemon
JOIN poke_origins ON (poke_origins.id = pokemon.origin_id)
WHERE region = 'Kanto';

SELECT id FROM poke_origins
WHERE region = 'Kanto'

SELECT name, type, origin_id FROM pokemon
WHERE origin_id IN (
    SELECT id FROM poke_origins
    WHERE region = 'Kanto'
);


SELECT trainers.name FROM trainers
WHERE id IN (
    SELECT trainer_id FROM poke_trainers
    WHERE pokemon_id IN (
        SELECT id FROM pokemon
        WHERE origin_id IN (
            SELECT id FROM poke_origins
            WHERE region = 'Hoenn'
        )
    )
);

INSERT INTO pokemon (name, type, pokedex_num, evolves, popularity, origin_id)
VALUES
('Rayquaza', 'dragon', 384, 0, 101, (
    SELECT id FROM poke_origins
    WHERE region = 'Hoenn'
));

DELETE FROM pokemon
WHERE origin_id = (
    SELECT id FROM poke_origins
    WHERE region = 'Sinnoh'
);
SELECT * FROM pokemon
WHERE origin_id IN (
    SELECT id FROM poke_origins
    WHERE region = 'Sinnoh'
);


CREATE UNIQUE INDEX idx_u_pokemon_name ON pokemon(name);

EXPLAIN QUERY PLAN
SELECT * FROM pokemon
WHERE name = 'Mudkip';