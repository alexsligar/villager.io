Select items.*, array_agg(item_tags.tag_name) as tags
From items inner join item_tags on items.id = item_tags.item_id
WHERE item_id = ${id}
Group by items.id