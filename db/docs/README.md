# DB

DROP TABLE "Products";
CREATE TABLE "Products" (
 id serial primary key,
 ean char(128),
 name char(128),
 brand char(128),
 model char(128),
 "createdAt" timestamp default current_timestamp,
 "updatedAt" timestamp default current_timestamp
);

DROP TABLE "Users";
CREATE TABLE "Users" (
 id serial primary key,
 email char(128) unique NOT NULL,
 name char(128),
 password char(128) NOT NULL,
 "isAdmin" boolean,
 "createdAt" timestamp default current_timestamp,
 "updatedAt" timestamp default current_timestamp
);

INSERT INTO "Users"
("id","email","name","password","createdAt","updatedAt")
VALUES
(DEFAULT,'dev@dev.com','Dev','$2a$10$R38polRA2rc75rT/gVZcR.3wh72k6h0NjnJYaRtcDED84O5c5CD3W') RETURNING *

INSERT INTO "Users"
("id","email","name","password","createdAt","updatedAt")
VALUES
(DEFAULT,'user@dev.com','User','$2a$10$.O.Pzf3d5RwZPLAUO8aqZOlJNC.9nePaZihS/6FiGTWrgFGW2ILcG') RETURNING *
