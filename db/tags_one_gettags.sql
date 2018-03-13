select array_agg(item_tags.tag_name) as tags
from item_tags
where item_tags.item_id = $(id)