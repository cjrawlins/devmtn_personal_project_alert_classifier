UPDATE events
SET 
user_id = $2,
user_timestamp = $3,
user_class = $4,
user_cat = $5,
user_notes = $6,
status = $7
WHERE event_id = $1;