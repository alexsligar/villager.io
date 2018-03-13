select array_agg(links.linked_item_id) as linked_item
from links
where links.item_id = $(id)