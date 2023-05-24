SELECT * FROM pokemon;

SELECT name, type FROM pokemon;

SELECT * FROM pokemon
WHERE popularity >= 90;

SELECT * FROM pokemon
WHERE popularity >= 90 AND type = 'fire';

SELECT * FROM pokemon
WHERE pokedex_num > 80 OR type = 'rock';

DELETE FROM pokemon;

DELETE FROM pokemon
WHERE popularity < 50;

SELECT * FROM pokemon
WHERE type = 'steel';

UPDATE pokemon
SET popularity = 78.88
WHERE name = 'Mudkip';

UPDATE trainers
SET num_badges = num_badges + 1
WHERE name = 'Dan';

-- SELECT/DELETE/UPDATE
-- FROM *
-- SET *
-- JOIN
-- WHERE
--     ORDER
--     LIMIT
-- OFFSET
-- GROUP BY
-- HAVING