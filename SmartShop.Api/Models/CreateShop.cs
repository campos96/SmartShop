using Microsoft.Build.Framework;

namespace SmartShop.Api.Models
{
    public class CreateShop
    {
        [Required]
        public Guid AccountId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string ShortName { get; set; }

        public string? Description { get; set; }
    }
}
