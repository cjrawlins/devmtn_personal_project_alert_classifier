SELECT  e.event_id, 
        e.source_id,
        e.event_cameraid,
        s.name,
        s.site, 
        e.timestamp, 
        e.status, 
        e.analytics_type, 
        e.src_class, 
        e.src_notes, 
        e.user_id, 
        u.username, 
        e.user_class,
        e.user_cat,
        e.user_notes,
        e.img_url,
        e.img_data
FROM events e
JOIN sources s 
ON e.source_id = s.source_id
LEFT JOIN users u 
ON e.user_id = u.user_id;