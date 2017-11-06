SELECT
items.id,
items.name,
items.type,
items.start_date,
items.end_date,
items.linked_group,
items.linked_place
FROM list_items
JOIN items
ON list_items.item_id = items.id
WHERE list_id = $(id)

