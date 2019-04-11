
Create procedure spDeleteProduct
(        
   @Id_product int        
)        
as         
begin        
   Delete from Product where id_product=@Id_product        
End