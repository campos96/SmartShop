using System.ComponentModel.DataAnnotations;

namespace SmartShop.Core.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid AccountId { get; set; }

        [Required]
        public Guid ShopId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public bool IsLocked { get; set; }

        public IEnumerable<UserRole>? Roles { get; set; }

        public Shop? Shop { get; set; }
    }
}
