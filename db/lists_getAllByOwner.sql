SELECT 
lists.id,
lists.name,
lists.description
FROM lists
WHERE lists.owner = $(owner)
AND
lists.owner != lists.id