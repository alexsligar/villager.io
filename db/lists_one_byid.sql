SELECT
lists.id,
lists.name,
lists.description,
users.username AS owner
FROM lists
LEFT JOIN users ON users.id = lists.owner
WHERE
lists.id = ${id}