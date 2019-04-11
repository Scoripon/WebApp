using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using WebApplication123.Model;

namespace WebApplication123.DAO
{
    public class UserDAO : Program
    {
        private const string defaultUser = "w";
        private List<User> users = new List<User>();
        
        public IEnumerable<User> GetAllUsers()
        {
            try
            {
                using (con)
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
                }
                return users;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        internal User Login(string username, string password)
        {
            try
            {
                User user = new User();

                using (con)
                {
                    con.Open();
                    string sqlQuery = "SELECT * FROM Users WHERE username= '" + username + "' and password= '" + password + "';";
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    SqlDataReader rdr = cmd.ExecuteReader();

                    if (rdr.Read())
                    {
                        user.Id_user = Convert.ToInt32(rdr["id_user"]);
                        user.Firstname = rdr["firstname"].ToString();
                        user.Lastname = rdr["lastname"].ToString();
                        user.Username = rdr["username"].ToString();
                        user.Password = rdr["password"].ToString();
                        user.Type = rdr["type"].ToString();
                    }
                    else
                        user = null;

                    rdr.Close();
                }
                return user;
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

        public int AddUser(User user)
        {
            try
            {
                using (con)
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
                }
                return 1;
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
            }
        }

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
                    con.Open();

                    string sqlQuery = "SELECT * FROM Users WHERE id_user= " + id_user;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
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
                        con.Close();
                }
                return user;
            }
            catch
            {
                throw;
            }
        }

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