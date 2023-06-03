using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }

        [ForeignKey(nameof(ShopId))]
        public Shop? Shop { get; set; }

        public virtual IEnumerable<UserRole>? Roles { get; set; }
    }
}
