SELECT
items.*,
array_agg(item_tags.tag_name) as tags
FROM list_items
left JOIN items ON list_items.item_id = items.id
LEFT JOIN item_tags ON items.id = item_tags.item_id
WHERE list_id = $(id)
Group by items.id