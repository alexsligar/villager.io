SELECT
item_owners.user_id,
item_owners.item_id
FROM
item_owners
WHERE
item_owners.item_id = $(item_id)
AND
item_owners.user_id = $(user_id)