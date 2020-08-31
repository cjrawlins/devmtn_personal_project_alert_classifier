INSERT INTO users
(username, pass_hash, userlevel, enabled)
VALUES
($1, $2, $3, $4)
RETURNING *;