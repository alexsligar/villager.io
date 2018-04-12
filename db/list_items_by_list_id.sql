SELECT items.*
FROM list_items
left JOIN items ON list_items.item_id = items.id
WHERE list_id = $(id)
Group by items.id