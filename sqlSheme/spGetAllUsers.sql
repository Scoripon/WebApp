
Create procedure spGetAllUsers      
as      
Begin      
    select *      
    from Users   
    order by id_user      
End