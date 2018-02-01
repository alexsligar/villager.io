SELECT
items.id,
items.name,
items.type,
items.start_date,
items.end_date,
item_tags.tag_name
FROM list_items
left JOIN items ON list_items.item_id = items.id
left JOiN item_tags ON items.id = item_tags.item_id
WHERE list_id = $(id)

