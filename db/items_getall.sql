SELECT 
items.id,
items.name,
items.location,
items.type,
item_tags.tag_name
FROM 
items
LEFT JOIN item_tags ON items.id = item_tags.item_id