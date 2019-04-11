Create procedure spAddProduct
(        
	@Id_product INT,
    @ProductName VARCHAR(30),         
    @Price MONEY,        
    @Quantity INT,        
    @Type VARCHAR(50),
	@Details TEXT        
)        
as         
Begin         
             
	Insert into Product (product_name, price, quantity, type, details)         
    Values (@ProductName,@Price, @Quantity, @Type,@Details)    
End