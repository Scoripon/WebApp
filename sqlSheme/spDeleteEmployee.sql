
Create procedure spDeleteUser       
(        
   @Id_user int        
)        
as         
begin        
   Delete from Users where id_user=@Id_user        
End