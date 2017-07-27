CREATE TABLE tweedrfeed(
    id SERIAL PRIMARY KEY, 
    tweed VARCHAR NOT NULL
);

INSERT INTO tweedrfeed (tweed) VALUES
('Welcome to the tweedr app!')