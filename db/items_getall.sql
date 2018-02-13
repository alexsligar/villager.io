Select items.*, array_agg(item_tags.tag_name) as tags
From items left join item_tags on items.id = item_tags.item_id
Group by items.id