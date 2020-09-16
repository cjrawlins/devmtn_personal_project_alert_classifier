SELECT  e.event_id, 
        e.source_id,
        e.event_cameraid,
        s.name,
        s.site,
        s.ip, 
        e.timestamp,
        e.epoch_time, 
        e.status, 
        e.analytics_type, 
        e.src_class, 
        e.src_notes, 
        e.user_id, 
        u.username, 
        e.user_class,
        e.user_cat,
        e.user_notes,
        e.rec_img_url,
        e.rec_img_data,
        e.live_img_url,
        e.vid_live_webm,
        e.vid_live_mpjpeg,
        e.vid_rec_webm,
        e.vid_rec_mpjpeg
FROM events e
JOIN sources s 
ON e.source_id = s.source_id
LEFT JOIN users u 
ON e.user_id = u.user_id
ORDER BY epoch_time DESC;