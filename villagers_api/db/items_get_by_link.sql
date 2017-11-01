SELECT 
items.id,
items.name,
items.location,
items.type,
items.linked_group,
items.linked_place
FROM 
items
WHERE
items.linked_group = $(id)
OR
items.linked_place = $(id)