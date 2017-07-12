# Product API

 model:create --name Product --attributes name:string,ean:string,brand:string,model:string

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

CREATE TABLE "Users" (
  id serial primary key,
  email char(128) unique NOT NULL,
  name char(128),
  password char(128) NOT NULL,
  "isAdmin" boolean,
  "createdAt" timestamp default current_timestamp,
  "updatedAt" timestamp default current_timestamp
);
