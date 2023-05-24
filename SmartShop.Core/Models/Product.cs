using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Core.Models
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ShopId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public string? Brand { get; set; }

        [Required]
        public string SKU { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public Guid ProductConditionId { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        [ForeignKey(nameof(ShopId))]
        public Shop? Shop { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public ProductCategory? Category { get; set; }

        [ForeignKey(nameof(ProductConditionId))]
        public ProductCondition? Condition { get; set; }

        public virtual ICollection<Stock>? Stock { get; set; }
    }
}
