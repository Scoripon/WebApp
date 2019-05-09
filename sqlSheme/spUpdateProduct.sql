Create procedure spUpdateProduct        
(        
	@Id_product INT,
    @ProductName VARCHAR(30),         
    @Price MONEY,        
    @Quantity INT,        
    @Category VARCHAR(50),
    @Subcategory VARCHAR(50),
	@Details TEXT
)        
as        
begin        
   Update Product         
   set product_name=@ProductName,        
   price=@Price,        
   quantity=@Quantity,    
   category = @Category,
   subcategory = @Subcategory,
   details	= @Details        
   where id_product = @Id_product
End