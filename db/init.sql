CREATE TABLE users (
    user_id   SERIAL PRIMARY KEY,
    username  VARCHAR(64) NOT NULL,
    pass_hash VARCHAR(64) NOT NULL,
    userlevel VARCHAR(64) NOT NULL,
    enabled   BOOLEAN
);

CREATE TABLE sources (
    source_id    SERIAL PRIMARY KEY,
    enabled      BOOLEAN,
    nx_cameraId VARCHAR(64) NOT NULL,
    name         VARCHAR(64) NOT NULL,
    ip           INET NOT NULL,
    site         VARCHAR(64),
    make         VARCHAR(64),
    model        VARCHAR(64),
    gps          VARCHAR(64),
    notes        TEXT
);

CREATE TABLE events (
    event_id       SERIAL PRIMARY KEY,
    source_id      INT REFERENCES sources(source_id),
    event_cameraId VARCHAR(64),
    timestamp      BIGINT NOT NULL,
    date_time      VARCHAR(64) NOT NULL,
    status         VARCHAR(64) NOT NULL,
    analytics_type VARCHAR(64) NOT NULL,
    src_class      VARCHAR(64) NOT NULL,
    src_notes      TEXT,
    user_timestamp TIMESTAMP,
    user_id        INT REFERENCES users(user_id),
    user_class     VARCHAR(64),
    user_cat       VARCHAR(64),
    user_notes     TEXT,
    img_url        TEXT,
    img_data       TEXT,
    vid_live_webm   TEXT,
    vid_live_mpjpeg TEXT,
    vid_rec_webm   TEXT,
    vid_rec_mpjpeg TEXT
);


