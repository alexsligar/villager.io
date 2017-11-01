SELECT
items.id,
items.name,
items.type,
items.start_date,
items.end_date,
items.linked_group,
items.linked_place
FROM
items
WHERE
items.id = $(id)