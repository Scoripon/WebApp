using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication123.Model;

namespace WebApplication123.DAO
{
    public class ProductDAO : Program
    {
        private List<Product> products = new List<Product>();
        
        public int AddProduct(Product product)
        {
            try
            {
                using (con)
                {
                    SqlCommand cmd = new SqlCommand("spAddProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProductName", product.ProductName);
                    cmd.Parameters.AddWithValue("@Price", product.Price);
                    cmd.Parameters.AddWithValue("@Type", product.Type);
                    cmd.Parameters.AddWithValue("@Quantity", product.Quantity);
                    cmd.Parameters.AddWithValue("@Details", product.Details);
                    con.Open();
                    cmd.ExecuteNonQuery();
                }
                return 1;
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

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                using (con)
                {
                    SqlCommand cmd = new SqlCommand("select * from product", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Product product = new Product();
                        product.Id_product = Convert.ToInt32(rdr["id_product"]);
                        product.ProductName = rdr["product_name"].ToString();
                        product.Price = rdr["price"].ToString();
                        product.Details = rdr["details"].ToString();
                        product.Quantity = rdr["quantity"].ToString();
                        product.Type = rdr["type"].ToString();
                        products.Add(product);
                    }
                }
                return products;
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

        public int UpdateProduct(Product product)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id_product", product.Id_product);
                    cmd.Parameters.AddWithValue("@ProductName", product.ProductName);
                    cmd.Parameters.AddWithValue("@Price", product.Price);
                    cmd.Parameters.AddWithValue("@Type", product.Type);
                    cmd.Parameters.AddWithValue("@Quantity", product.Quantity);
                    cmd.Parameters.AddWithValue("@Details", product.Details);
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

        public Product GetProduct(int id_product)
        {
            try
            {
                Product product = new Product();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();

                    string sqlQuery = "SELECT * FROM Product WHERE id_product= " + id_product;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        product.Id_product = Convert.ToInt32(rdr["id_product"]);
                        product.ProductName = rdr["product_name"].ToString();
                        product.Price = rdr["price"].ToString();
                        product.Details = rdr["details"].ToString();
                        product.Quantity = rdr["quantity"].ToString();
                        product.Type = rdr["type"].ToString();

                    }
                        con.Close();
                }

                return product;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteProduct(int id_product)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteProduct", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id_product", id_product);
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