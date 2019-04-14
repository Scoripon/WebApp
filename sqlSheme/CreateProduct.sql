
CREATE TABLE Product (
	
	id_product int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	product_name varchar(30),
	price money,
	category varchar(50),
	quantity int,
	details text
);
/*
select * from Product

INSERT INTO Product(product_name,price,type,quantity, details)
	VALUES('Kinezi',50.32,'Hrana',40,'osic mmmmrk')
	
INSERT INTO Product(product_name,price,type,quantity,details)
	VALUES('Palacinkice',224.00,'Hrana',121,'')
klkjml/m
	*/