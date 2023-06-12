using SmartShop.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartShop.Api.Models
{
    public class Signup
    {
        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
