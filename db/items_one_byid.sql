SELECT
items.id,
items.name,
items.type,
items.location,
items.start_date,
items.end_date,
item_tags.tag_name
FROM
items
left JOiN item_tags ON items.id = item_tags.item_id
WHERE
items.id = $(id)