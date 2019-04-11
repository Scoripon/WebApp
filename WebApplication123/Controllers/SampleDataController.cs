using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApplication123.DAO;
using WebApplication123.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication123.Controllers
{
    [Route("api/[controller]")]
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    public class UserController : Controller
    {
        UserDAO objUser = new UserDAO();
        [HttpGet]
        [Route("/User/Index")]
        public IEnumerable<User> Index()
        {
            return objUser.GetAllUsers();
        }
        [HttpPost]
        [Route("/User/Create")]
        public int Create([FromBody] User user)
        {
            return objUser.AddUser(user);
        }
        [HttpGet]
        [Route("/User/Details/{id}")]
        public User Details(int id)
        {
            return objUser.GetUserData(id);
        }
        [HttpPut]
        [Route("/User/Edit")]
        public int Edit([FromBody]User user)
        {
            return objUser.UpdateUser(user);
        }
        [HttpDelete]
        [Route("/User/Delete/{id}")]
        public int Delete(int id)
        {
            return objUser.DeleteUser(id);
        }
        [HttpPost]
        [Route("/User/Login/{username}/{password}")]
        public User Login(string username, string password)
        {
            return objUser.Login(username, password);
        }
    }
    public class ProductCotroller : Controller
    {
        ProductDAO objProduct = new ProductDAO();

        [HttpGet]
        [Route("/Product/Index")]
        public IEnumerable<Product> Index()
        {
            return objProduct.GetAllProducts();
        }

        [HttpGet]
        [Route("/Product/Details/{id}")]
        public Product Details(int id)
        {
            return objProduct.GetProduct(id);
        }


        [HttpDelete]
        [Route("/Product/Delete/{id}")]
        public int Delete(int id)
        {
            return objProduct.DeleteProduct(id);
        }

        [HttpPost]
        [Route("/Product/AddProduct")]
        public int AddProduct([FromBody] Product product)
        {
            return objProduct.AddProduct(product);
        }
        [HttpPut]
        [Route("/Product/Edit")]
        public int Edit([FromBody]Product product)
        {
            return objProduct.UpdateProduct(product);
        }
    }
}
