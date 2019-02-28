SELECT items.*, 
array_agg(distinct item_tags.tag_name) AS tags, 
array_agg(distinct users.username) AS owners
FROM items 
LEFT JOIN item_tags ON items.id = item_tags.item_id
LEFT JOIN item_owners ON items.id = item_owners.item_id
LEFT JOIN users ON users.id = item_owners.user_id
WHERE items.id = ${id}
GROUP BY items.id