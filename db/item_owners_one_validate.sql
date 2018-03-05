SELECT
item_owners.username,
item_owners.item_id
FROM
item_owners
WHERE
item_owners.item_id = $(item_id)
AND
item_owners.username = $(username)