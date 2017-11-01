SELECT count(list_items.id) 
FROM list_items JOIN lists 
ON list_items.list_id = lists.id
WHERE
list_items.item_id = ${id}
AND
lists.id != lists.owner