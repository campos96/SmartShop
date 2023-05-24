using System.ComponentModel.DataAnnotations;

namespace SmartShop.Core.Models
{
    public enum Role { Administrator, Supervisor, Sales, Inventory, Client }

    public class UserRole
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
