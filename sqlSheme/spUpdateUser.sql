
Create procedure spUpdateUser        
(        
	@Id_user INT,
    @Firstname VARCHAR(30),         
    @Lastname VARCHAR(30),        
    @Username VARCHAR(30),        
    @Password VARCHAR(50),        
    @Type VARCHAR(1)       
)        
as        
begin        
   Update Users         
   set firstname=@Firstname,        
   lastname=@Lastname,        
   username=@Username,    
   password = @Password,
   type	= @Type        
   where id_user= @Id_user
End