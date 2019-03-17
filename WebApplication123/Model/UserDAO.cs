using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication123.Model
{
    public class UserDAO
    {
        private const string connectionString = @"Data Source=(local)\LAZARSQL;Initial Catalog=PayMeApp;Integrated Security = True;";
        private const string defaultUser = "w";
        //To View all users details
        public IEnumerable<User> GetAllUsers()
        {
            try
            {
                List<User> users = new List<User>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllUsers", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        User user = new User();
                        user.id_user = Convert.ToInt32(rdr["id_user"]);
                        user.firstname = rdr["firstname"].ToString();
                        user.lastname = rdr["lastname"].ToString();
                        user.username = rdr["username"].ToString();
                        user.password = rdr["password"].ToString();
                        user.type = rdr["type"].ToString();
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
        //To Add new user record 
        public int AddUser(User user)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Firstname", user.firstname);
                    cmd.Parameters.AddWithValue("@Lastname", user.lastname);
                    cmd.Parameters.AddWithValue("@Username", user.username);
                    cmd.Parameters.AddWithValue("@Password", user.password);
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
                    cmd.Parameters.AddWithValue("@Firstname", user.firstname);
                    cmd.Parameters.AddWithValue("@Lastname", user.lastname);
                    cmd.Parameters.AddWithValue("@Username", user.username);
                    cmd.Parameters.AddWithValue("@Password", user.password);
                    cmd.Parameters.AddWithValue("@Type", user.type);
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
                        user.id_user = Convert.ToInt32(rdr["id_user"]);
                        user.firstname = rdr["firstname"].ToString();
                        user.lastname = rdr["lastname"].ToString();
                        user.username = rdr["username"].ToString();
                        user.password = rdr["password"].ToString();
                        user.type = rdr["type"].ToString();
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