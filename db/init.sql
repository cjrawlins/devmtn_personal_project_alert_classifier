CREATE TABLE users (
    user_id   SERIAL PRIMARY KEY,
    username  VARCHAR(64) NOT NULL,
    pass_hash VARCHAR(64) NOT NULL,
    userlevel VARCHAR(64) NOT NULL,
    enabled   BOOLEAN
);

CREATE TABLE sources (
    source_id   SERIAL PRIMARY KEY,
    enabled     BOOLEAN,
    nx_cameraId VARCHAR(64),
    name        VARCHAR(64) NOT NULL,
    ip          INET NOT NULL,
    site        VARCHAR(64),
    make        VARCHAR(64),
    model       VARCHAR(64),
    notes       TEXT
);

CREATE TABLE events (
    event_id       SERIAL PRIMARY KEY,
    source_id      INT REFERENCES sources(source_id),
    timestamp      TIMESTAMP NOT NULL, 
    status         VARCHAR(64) NOT NULL,
    analytics_type VARCHAR(64) NOT NULL,
    src_class      VARCHAR(64) NOT NULL,
    src_notes      TEXT,
    user_timestamp TIMESTAMP,
    user_id        INT REFERENCES users(user_id),
    user_class     VARCHAR(64),
    user_cat       VARCHAR(64),
    user_notes     TEXT,
    img_thumb      TEXT,
    img_url        TEXT,
    img            TEXT
);


