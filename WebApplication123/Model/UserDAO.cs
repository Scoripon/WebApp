using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace WebApplication123.Model
{
    public class UserDAO
    {
        private const string defaultUser = "w";
        private List<User> users = new List<User>();
        //To View all users details
        public IEnumerable<User> GetAllUsers()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllUsers", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        User user = new User();
                        user.Id_user = Convert.ToInt32(rdr["id_user"]);
                        user.Firstname = rdr["firstname"].ToString();
                        user.Lastname = rdr["lastname"].ToString();
                        user.Username = rdr["username"].ToString();
                        user.Password = rdr["password"].ToString();
                        user.Type = rdr["type"].ToString();
                        users.Add(user);
                    }
                    con.Close();
                }
                return users;
            }
            catch
            {
                throw;
            }
        }

        // TO - DO 
        // zameniti GetAllUsers sa procedurom koja ce vratiti usera.
        // sada radi kao idiot.
        // u slucaju da ne postoji username i password, 
        // vraca usera sa null vrednostima, iliti praznog usera.

        internal User Login(string username, string password)
        {
            try
            {
                GetAllUsers();
               
                User user = new User();
                var selectedUser = users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
                if(selectedUser != null)
                {
                    user = selectedUser;
                }
                selectedUser = selectedUser != null ? selectedUser : null;

                return selectedUser;
                }
            catch
            {
                throw;
            }

        }

        //To Add new user record 
        public int AddUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Firstname", user.Firstname);
                    cmd.Parameters.AddWithValue("@Lastname", user.Lastname);
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@Type", defaultUser);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar user
        public int UpdateUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id_user", user.Id_user);
                    cmd.Parameters.AddWithValue("@Firstname", user.Firstname);
                    cmd.Parameters.AddWithValue("@Lastname", user.Lastname);
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@Type", user.Type);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular user
        public User GetUserData(int id_user)
        {
            try
            {
                User user = new User();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM Users WHERE id_user= " + id_user;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        user.Id_user = Convert.ToInt32(rdr["id_user"]);
                        user.Firstname = rdr["firstname"].ToString();
                        user.Lastname = rdr["lastname"].ToString();
                        user.Username = rdr["username"].ToString();
                        user.Password = rdr["password"].ToString();
                        user.Type = rdr["type"].ToString();
                    }
                }
                return user;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record on a particular user
        public int DeleteUser(int id_user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id_user", id_user);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
} 