-- Q1
SELECT COUNT(*) FROM cats;

-- Q2
SELECT MAX(birth_year), name FROM cats;

-- Q3
SELECT cat_id, cats.name, COUNT(*) FROM cats
JOIN toys ON (cats.id = toys.cat_id)
GROUP BY cat_id;

-- Q4
SELECT cat_id, cats.name, COUNT(*) FROM cats
JOIN toys ON (cats.id = toys.cat_id)
WHERE birth_year > 2017
GROUP BY cat_id
HAVING COUNT(*) >= 2;