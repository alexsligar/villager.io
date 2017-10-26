SELECT
list_items.list_id,
list_items.item_id,
list_items.order
FROM
list_items
WHERE
list_items.list_id = $(listid)