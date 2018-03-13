select array_agg(linked_items.linked_item_id) as linked_items
from linked_items
where linked_items.item_id = $(id)