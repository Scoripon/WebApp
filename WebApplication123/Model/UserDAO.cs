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
        string connectionString = @"Data Source=(local)\LAZARSQL;Initial Catalog=PaymenySystem;Integrated Security = True;";
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
                        user.id_korisnik = Convert.ToInt32(rdr["id_korisnik"]);
                        user.ime = rdr["ime"].ToString();
                        user.prezime = rdr["prezime"].ToString();
                        user.email = rdr["email"].ToString();
                        user.username = rdr["username"].ToString();
                        user.password = rdr["password"].ToString();
                        user.tip = rdr["tip"].ToString();
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
                    cmd.Parameters.AddWithValue("@Ime", user.ime);
                    cmd.Parameters.AddWithValue("@Prezime", user.prezime);
                    cmd.Parameters.AddWithValue("@Email", user.email);
                    cmd.Parameters.AddWithValue("@Username", user.username);
                    cmd.Parameters.AddWithValue("@Password", user.password);
                    cmd.Parameters.AddWithValue("@Tip", user.tip);
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
                    cmd.Parameters.AddWithValue("@Ime", user.ime);
                    cmd.Parameters.AddWithValue("@Prezime", user.prezime);
                    cmd.Parameters.AddWithValue("@Email", user.email);
                    cmd.Parameters.AddWithValue("@Username", user.username);
                    cmd.Parameters.AddWithValue("@Password", user.password);
                    cmd.Parameters.AddWithValue("@Tip", user.tip);
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
        public User GetUserData(int id_korisnik)
        {
            try
            {
                User user = new User();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM Korisnik WHERE id_korisnik= " + id_korisnik;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        user.id_korisnik = Convert.ToInt32(rdr["id_korisnik"]);
                        user.ime = rdr["ime"].ToString();
                        user.prezime = rdr["prezime"].ToString();
                        user.email = rdr["email"].ToString();
                        user.username = rdr["username"].ToString();
                        user.password = rdr["password"].ToString();
                        user.tip = rdr["tip"].ToString();
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
        public int DeleteUser(int id_korisnik)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteUser", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id_korisnik", id_korisnik);
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