using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication123.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication123.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        UserDAO objUser = new UserDAO();
        [HttpGet]
        [Route("api/User/Index")]
        public IEnumerable<User> Index()
        {
            return objUser.GetAllUsers();
        }
        [HttpPost]
        [Route("api/User/Create")]
        public int Create([FromBody] User user)
        {
            return objUser.AddUser(user);
        }
        [HttpGet]
        [Route("api/User/Details/{id}")]
        public User Details(int id)
        {
            return objUser.GetUserData(id);
        }
        [HttpPut]
        [Route("api/User/Edit")]
        public int Edit([FromBody]User user)
        {
            return objUser.UpdateUser(user);
        }
        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        public int Delete(int id)
        {
            return objUser.DeleteUser(id);
        }
    }
}
