Create procedure spAddUser   
(        
    @Firstname VARCHAR(30),         
    @Lastname VARCHAR(30),        
    @Username VARCHAR(30),        
    @Password VARCHAR(50),        
    @Type VARCHAR(1)        
)        
as         
Begin         
             
	Insert into Users (firstname,lastname, username, password, type)         
    Values (@Firstname,@Lastname, @Username, @Password,@Type)    
End