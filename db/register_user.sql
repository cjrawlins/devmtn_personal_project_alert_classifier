INSERT INTO users
(username, password, userlevel, enabled)
VALUES
($1, $2, $3, $4)
RETURNING *;