using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Core.Models
{
    public enum NetworkStatus { Locked, Unlocked }

    public class ProductDetails
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        public string? Description { get; set; }

        public string? Color { get; set; }

        public string? NetworkStatus { get; set; }

        public string? NetworkCompany { get; set; }

        public string? StorageCapacity { get; set; }

        [Range(0, 100)]
        public int? BatteryLife { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }
    }
}
