SELECT
owners.user_id,
owners.item_id
FROM
owners
WHERE
owners.item_id = $(item_id)
AND
owners.user_id = $(user_id)