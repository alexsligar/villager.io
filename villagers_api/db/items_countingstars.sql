SELECT 
listitems.id 
FROM listitems JOIN lists 
ON listitems.listid = lists.id
WHERE 
lists.id = listitems.listid
AND
listitems.itemid = ${id}