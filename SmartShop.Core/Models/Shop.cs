using System.ComponentModel.DataAnnotations;

namespace SmartShop.Core.Models
{
    public class Shop
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string ShortName { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }

        public byte[]? Logo { get; set; }
    }
}
