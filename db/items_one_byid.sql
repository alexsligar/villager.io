Select items.*, array_agg(distinct item_tags.tag_name) as tags, array_agg(distinct item_owners.username) as owners
From items 
left join item_tags on items.id = item_tags.item_id
left join item_owners on items.id = item_owners.item_id
WHERE items.id = ${id}
Group by items.id