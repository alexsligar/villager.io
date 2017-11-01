SELECT
lists.id,
lists.name,
lists.owner,
lists.description
FROM
lists
WHERE
lists.id = ${id}