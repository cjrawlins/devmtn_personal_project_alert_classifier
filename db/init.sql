CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    pass_hash VARCHAR(64) NOT NULL,
    userlevel VARCHAR(64) NOT NULL
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    source_id INT REFERENCES sources(source_id),
    timestamp TIMESTAMP, 
    status VARCHAR(64),
    analytics_type VARCHAR(64),
    org_class VARCHAR(64),
    user_timestamp TIMESTAMP,
    user_class VARCHAR(64),
    user_cat VARCHAR(64),
    user_notes TEXT,
)