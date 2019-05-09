
CREATE TABLE Product (
	
	id_product int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	product_name varchar(30),
	price money,
	category varchar(50),
	subcategory varchar(50),
	quantity int,
	details text
);

/*
select * from Product
drop table Product
INSERT INTO Product(product_name,price,category,subcategory,quantity, details)
	VALUES('Kinezi',50.32,'Hrana','Riblji specijaliteti miki',40,'osic mmmmrk')
	
INSERT INTO Product(product_name,price,category,subcategory,quantity,details)
	VALUES('Palacinkice',224.00,'Hrana','SVINJA',121,'')
klkjml/m
	*/