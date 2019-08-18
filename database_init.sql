drop table if exists players; 

create table players (
	id serial primary key, 
	name varchar(100) not null,
	turned_pro varchar(4) not null,
	plays varchar(100) not null,
	country varchar(100) not null,
	racquet varchar(100) not null,
	grand_slams bigint default 0,
	career_high bigint not null
);