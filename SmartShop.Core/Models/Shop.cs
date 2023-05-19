namespace SmartShop.Core.Models
{
    public class Shop
    {
        public Guid Id { get; set; }

        public string ShortName { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public byte[]? Logo { get; set; }
    }
}
