SELECT 
items.id,
items.name,
items.location,
items.type,
items.linked_group,
items.linked_place,
items.start_date,
items.end_date
FROM 
items
WHERE
items.linked_group = $(id)
OR
items.linked_place = $(id)