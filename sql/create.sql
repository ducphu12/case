use demo_database;
create table product(
   id int not null primary key auto_increment,
   name varchar(100),
   price int not null ,
   description varchar(250)
)