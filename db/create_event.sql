INSERT INTO events
(   source_id,
    event_cameraid,
    timestamp,
    date_time, 
    status, 
    analytics_type, 
    src_class,
    src_notes,
    img_url,
    vid_live_webm,
    vid_live_mpjpeg,
    vid_rec_webm,
    vid_rec_mpjpeg )
VALUES
( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);