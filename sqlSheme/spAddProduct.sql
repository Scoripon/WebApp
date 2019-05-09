Create procedure spAddProduct
(        
    @ProductName VARCHAR(30),         
    @Price MONEY,        
    @Quantity INT,        
    @Category VARCHAR(50),
    @Subcategory VARCHAR(50),
	@Details TEXT        
)        
as         
Begin         
             
	Insert into Product (product_name, price, quantity, category, subcategory, details)         
    Values (@ProductName,@Price, @Quantity, @Category,@Subcategory,@Details)    
End