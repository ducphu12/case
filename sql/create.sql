use demo_database;
create table product(
   id int not null primary key auto_increment,
  nation varchar(100),
 area varchar(100),
 people int not null ,
 GDP int not null ,
   description varchar(250)
)