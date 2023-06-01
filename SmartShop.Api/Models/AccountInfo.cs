using SmartShop.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartShop.Api.Models
{
    public class AccountInfo
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
