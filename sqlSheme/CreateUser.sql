--drop table Users;
CREATE TABLE Users (
	
	id_user int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	firstname varchar(30),
	lastname varchar(30),
	username varchar(30),
	password varchar(50),
	type varchar(1)
);
/*
--select * from Users
INSERT INTO Korisnik(ime,prezime,username,password,tip)
	VALUES('Admir','Kashikar','admin','admin','w')
	
INSERT INTO Korisnik(ime,prezime,username,password,tip)
	VALUES('Shljaker','Sljkerko','worker','worker','w')
*/

