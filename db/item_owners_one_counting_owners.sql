SELECT count(item_owners.item_id)
FROM item_owners 
WHERE
item_owners.item_id = $(id)